import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    Input,
    Textarea,
    InputGroup,
    InputRightElement,
    Spinner,
    useToast,
    Box,
    InputLeftAddon,
    Icon,
} from '@chakra-ui/react'
import { AttachmentIcon, Search2Icon } from '@chakra-ui/icons'
import UserListItem from './UserListItem'
import { TaskState } from '../../Context/TaskProvider'
import axios from 'axios'

const TaskModal = ({ children, task }) => {
    const [title, setTitle] = useState(task?.title || '')
    const [description, setDescription] = useState(task?.description || '')
    const [attachment, setAttachment] = useState(task?.attachment || '')
    const [assignee, setAssignee] = useState(task?.assignee || {})
    const [assigneeName, setAssigneeName] = useState(task?.assignee?.name || '')
    const [search, setSearch] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const { apiUrl, socket, user, tasks, setTasks, setFilterdTasks } = TaskState();
    const toast = useToast();

    const postFile = async (file) => {
        setLoading(true);
        if (file === undefined) {
            toast({
                title: 'Please select an attachment!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }
        const fileSize = Math.round((file.size / 1024));
        if (fileSize >= 26214.4) {
            toast({
                title: 'Please select an attachment with size less than 25mb !',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }
        else {
            try {
                const data = new FormData();
                data.append('file', file);
                data.append('upload_preset', 'uploads')
                data.append('cloud_name', 'dm34wmjlm');
                //storing file to cloud
                const res = await fetch('https://api.cloudinary.com/v1_1/dm34wmjlm/auto/upload', {
                    method: 'post',
                    body: data
                })
                const result = await res.json()
                console.log(result)
                if (result.error)
                    throw new Error(`${result.error.message}`)
                else
                    setAttachment(result.url.toString());
                setLoading(false)
            }
            catch (error) {
                toast({
                    title: error.message,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
                setLoading(false)
                return
            }
        }
    }

    //handleSearch
    useEffect(() => {
        const timeOutID = setTimeout(async () => {
            if (!search || search === '') return setSearchResult([])
            try {
                setLoading(true)
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const { data } = await axios.get(`${apiUrl}/users?search=${search}`, config);
                setSearchResult(data.users);
                setLoading(false)
            }
            catch (error) {
                toast({
                    title: `Error fetching the users`,
                    description: `${error.message}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
                setLoading(false)
            }
        }, 500);
        return () => clearTimeout(timeOutID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])


    const handleAdd = (user) => {
        setAssignee(user)
        setAssigneeName(user.name)
        setSearchResult([])
        setSearch('')
    }

    const handleSubmit = async () => {
        if (!title || !description || !assignee) {
            toast({
                title: `Please fill all the fields`,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post(`${apiUrl}/tasks`,
                {
                    title,
                    description,
                    attachment,
                    admin: user._id,
                    assignee: assignee._id
                }, config);
            const updatedTasks = [data, ...tasks];
            setTasks(updatedTasks)
            setFilterdTasks(updatedTasks);
            setTitle('')
            setDescription('')
            setAssignee({})
            setAssigneeName('')
            setLoading(false)
            onClose();
            socket.emit('taskNotification', { type: 'newtask', task: data, user })
            toast({
                title: `Task ${data.title} created successfully !`,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        } catch (error) {
            setLoading(false)
            toast({
                title: `Error creating task`,
                description: `${error.response.data.error}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

    const handleUpdate = async (taskId) => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.put(`${apiUrl}/tasks`,
                {
                    taskId,
                    title,
                    description,
                    attachment,
                    admin: user._id,
                    assignee: assignee._id
                }, config);
            const updatedTasks = tasks.map(task => {
                if (task._id === data._id) {
                    task = data;
                }
                return task;
            })
            setTasks(updatedTasks)
            setFilterdTasks(updatedTasks)
            setLoading(false)
            onClose();
            socket.emit('taskNotification', { type: 'info', task: data, user })
            toast({
                title: `Task ${data.title} updated successfully !`,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        } catch (error) {
            setLoading(false)
            toast({
                title: `Error updating task`,
                description: `${error.response.data.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg='blackAlpha.300'
                    backdropFilter='blur(10px)' />
                <ModalContent pos="fixed" zIndex={2}>
                    <ModalHeader fontSize='25px' textAlign='center' fontFamily='poppins'>{task ? 'Update' : 'Create'} Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexDir='column' alignItems='center'>
                        <FormControl>
                            <Input
                                placeholder='Enter Task Title'
                                mb='3'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Textarea
                                placeholder='Enter Task Description'
                                mb='3'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <InputGroup mb='3'>
                                <Input type="file" className='custom__file__input' p={'4.5px 100px 1px 20px'} accept="*/*" onChange={(e) => postFile(e.target.files[0])} />
                                <InputRightElement cursor='pointer' pointerEvents="none">
                                    <Icon as={AttachmentIcon} color='red.500' />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        {assigneeName &&
                            <FormControl>
                                <InputGroup>
                                    <InputLeftAddon children='Assigning to : ' />
                                    <Input
                                        mb='3'
                                        value={assignee.name}
                                        onChange={(e) => setAssigneeName(e.target.value)}
                                        readOnly
                                    />
                                </InputGroup>
                            </FormControl>
                        }
                        <FormControl>
                            <InputGroup>
                                <Input
                                    placeholder='Search Assignee'
                                    mb='3'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <InputRightElement cursor='pointer'>
                                    <Search2Icon color={'blue.500'} />
                                </InputRightElement>
                            </InputGroup>
                            {loading
                                ? <Box textAlign='center'><Spinner color='blue.500' size='xl' /></Box>
                                : (<Box overflowY='auto' maxH='30vh'>
                                    {searchResult?.slice(0, 4).map(
                                        (user) => (<UserListItem key={user._id} user={user} handleFunction={() => handleAdd(user)} />)
                                    )}
                                </Box>)}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter pt='0' display='flex' justifyContent='space-between'>
                        <Button colorScheme='blue' onClick={() => task ? handleUpdate(task._id) : handleSubmit()} >
                            Submit
                        </Button>
                        <Button onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TaskModal