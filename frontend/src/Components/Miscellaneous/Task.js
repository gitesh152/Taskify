import { CheckIcon, CloseIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, IconButton, ScaleFade, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Text, Tooltip, useSteps, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdBuild } from "react-icons/md"
import TaskModal from './TaskModal';
import { TaskState } from '../../Context/TaskProvider';
import axios from 'axios';
import ProfileModal from './ProfileModal';

const Task = ({ task }) => {
    const toast = useToast()
    const { notification, setNotification, socket, user, tasks, setTasks, setFilterdTasks, filterdTasks } = TaskState();
    const [completed, setCompleted] = useState(task.completed);
    const [status, setStatus] = useState(task.status);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        socket.emit('join room', user)
        socket.on('taskNotificationBroadcast', data => {
            setNotification([data, ...notification])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notification, socket])

    const steps = [
        { title: 'First', description: 'Assigned' },
        { title: 'Second', description: 'Working' },
        { title: 'Third', description: 'Completed' },
    ]

    const { activeStep, setActiveStep } = useSteps({
        // index: 1,
        index: steps.findIndex((step, i) => step.description === status),
        count: steps.length,
    })

    const handleDelete = async (taskId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                    "taskId": taskId
                }
            }
            const { data } = await axios.delete(`/tasks`,
                config
            );
            const updatedTasks = filterdTasks.filter(task => task._id !== data._id)
            setTasks(updatedTasks)
            setFilterdTasks(updatedTasks);
            toast({
                title: `Task ${data.title} deleted successfully !`,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        } catch (error) {
            toast({
                title: `Error deleting task`,
                description: `${error.response.data.error}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

    const handleComplete = async (taskId, bool) => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                }
            }
            const { data } = await axios.put(`/tasks/toggle-complete`, {
                taskId,
                completed: bool
            },
                config
            );
            const updatedTasks = filterdTasks.map(task => {
                if (task._id === data._id) {
                    task = data;
                }
                return task;
            })
            setCompleted(data.completed)
            setActiveStep(steps.findIndex((step, i) => step.description === data.status))
            setStatus(data.status)
            setTasks(updatedTasks)
            setFilterdTasks(updatedTasks);
            socket.emit('taskNotification', { type: 'status', task: data, user })
            toast({
                title: `Task ${data.title} marked as ${task.completed ? 'Incompleted (Re-Assigned)' : 'Completed'}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
        } catch (error) {
            toast({
                title: `Error marking task`,
                description: `${error.response.data.error}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
        }
    }

    const handleStatus = async (str) => {
        setStatus(str)
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                }
            }
            const { data } = await axios.put(`/tasks/status-update`, {
                taskId: task._id,
                status: str
            },
                config
            );
            const updatedTasks = tasks.map(task => {
                if (task._id === data._id) {
                    task = data;
                }
                return task;
            })
            setTasks(updatedTasks)
            setFilterdTasks(updatedTasks);
            socket.emit('taskNotification', { type: 'status', task: data, user })
            toast({
                title: `Task ${data.title} status updated to ${data.status}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        } catch (error) {
            toast({
                title: `Error task status updating`,
                description: `${error.response.data.error}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

    const handleDownload = () => {
        window.open(task.attachment, '_blank');
    }
    return (
        <>
            <ScaleFade initialScale={0.9} in={true}>
                <Box pb='2'>
                    <Card
                        borderColor='blackAlpha.50'
                        borderWidth='5px'
                    >
                        <CardHeader p='4' display='flex' flexDirection={{base:'column',sm:'row'}} alignItems='flex-start' gap='2' justifyContent='space-between'>
                            <Box display='flex' alignItems='center'>
                                <Button leftIcon={task.completed ? <CheckIcon /> : <CloseIcon />} colorScheme={task.completed ? 'whatsapp' : 'gray'} color={task.completed ? 'white' : 'gray'} cursor='default'
                                    _hover={{ backgroundColor: 'none', cursor: user._id === task.admin._id ? 'pointer' : 'default' }}
                                    fontSize='xs'
                                    size='xs'
                                    isLoading={loading}
                                    onClick={() => user._id === task.admin._id ? handleComplete(task._id, !completed) : ''}
                                >
                                    {user._id === task.admin._id
                                        ?
                                        <Tooltip hasArrow label={`Click to mark as ${task.completed ? 'incomplete' : 'complete'}`} bg='red.600'>
                                            Completed
                                        </Tooltip>
                                        : 'Completed'
                                    }
                                </Button>
                                <Heading size='md' fontFamily='poppins' ps='5' textTransform='uppercase' >{task.title.toString()}</Heading>
                            </Box>
                            <Box display='inline-flex' fontFamily='poppins' fontSize={{ base: 'xs',sm:'lg' }} textOverflow={'clip'}>
                                <Text>Assigned to </Text>
                                <ProfileModal user={task?.assignee}  >
                                    <Text px='1' color='orange.400' _hover={{ cursor: 'pointer' }}> {task?.assignee?.name}</Text>
                                </ProfileModal>
                                <Text> by</Text>
                                <ProfileModal user={task?.admin} >
                                    <Text px='1' color='orange.400' _hover={{ cursor: 'pointer' }}>{task?.admin?.name}</Text>
                                </ProfileModal>

                            </Box>
                        </CardHeader>
                        <Divider borderWidth='3px' borderColor='blackAlpha.50' />
                        <CardBody >
                            <Heading size={'sm'}>Description :- </Heading><Text> {task.description}</Text>
                        </CardBody>
                        <CardFooter p='1' display='flex' justifyContent='space-between' flexDirection={{ base: 'column', sm: 'row' }} >
                            <Box m='2'>
                                {/* Stepper for task status updated */}
                                <Stepper size='sm' w='sm' index={activeStep}>
                                    {steps.map((step, index) => (
                                        <Step key={index} onClick={() => {
                                            handleStatus(step.description)
                                            setActiveStep(index)
                                        }}>
                                            <StepIndicator>
                                                <StepStatus
                                                    complete={<StepIcon />}
                                                    incomplete={<StepNumber />}
                                                    active={<StepNumber />}
                                                />
                                            </StepIndicator>
                                            <Box flexShrink='0'>
                                                <StepTitle>{step.title}</StepTitle>
                                                <StepDescription>{step.description}</StepDescription>
                                            </Box>
                                            <StepSeparator />
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                            {
                                user._id === task.admin._id &&
                                <Box display={{ base: 'flex' }} ps='2' justifyContent={'space-between'} w='100%'>
                                    {task.attachment ?
                                        <Box display='flex' gap={'2'} alignItems={'center'} pe='1'>
                                            <Box borderWidth='2px' ps='1' pb='0px' lineHeight={'16px'} color={'blackAlpha.500'} borderColor={'#e2e8f0'} w='24px' h='24px' borderRadius={'40'} display='block'>
                                                <DownloadIcon onClick={handleDownload} fontSize={'12'} />
                                            </Box>
                                            <Box >
                                                <Text fontSize={'sm'} color='blackAlpha.700' fontWeight='medium'>Download</Text> <Text fontSize={'xs'}> Attachment</Text>
                                            </Box>
                                        </Box>
                                        :
                                        <Box visibility={'hidden'}></Box>
                                    }
                                    <Box me={{ base: '1', sm: '0px' }} display={'flex'} >
                                        <TaskModal task={task} setFilterdTasks={setFilterdTasks} completed={completed} setCompleted={setCompleted} >
                                            <Button display={{ base: 'none', lg: 'flex' }} leftIcon={<MdBuild />} px='3' colorScheme='blue' variant='solid'>
                                                Update
                                            </Button>
                                            <IconButton icon={<MdBuild />} px='3' colorScheme='blue' variant='solid' display={{ lg: 'none' }} />
                                        </TaskModal>
                                        <Button display={{ base: 'none', lg: 'flex' }} leftIcon={<DeleteIcon />} ms='1' px='3' colorScheme='red' variant='solid' onClick={() => handleDelete(task._id)}>
                                            Delete
                                        </Button>
                                        <IconButton icon={<DeleteIcon />} ms='1' px='3' colorScheme='red' variant='solid' display={{ lg: 'none' }} onClick={() => handleDelete(task._id)} />
                                    </Box>
                                </Box>
                            }
                        </CardFooter>
                    </Card>
                </Box >
            </ScaleFade >
        </>
    )
}

export default Task