import { Box, Card, CardBody, CardHeader, Divider, Icon, ScaleFade, Skeleton, Spinner, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Task from './Task'
import { TaskState } from '../../Context/TaskProvider';
import axios from 'axios';
import { BiTaskX } from 'react-icons/bi'
import Filters from './Filters';

const TaskList = () => {
    const { toggleTaskFetch, setTasks, filterdTasks, setFilterdTasks, user } = TaskState();
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const { data } = await axios('/tasks', config);
                setTasks(data)
                setFilterdTasks(data);
                setLoading(false);
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
        fetchTasks();
    }, [setFilterdTasks, setTasks, toast, toggleTaskFetch, user.token])





    return (
        <Box w={{ base: '100%', md: '70%' }} m={'10px auto'} mt='66px' >
            <Filters />
            {
                loading ?
                    <ScaleFade initialScale={0.9} in={true} >
                        <Box pb='2'>
                            <Card
                                borderColor='blackAlpha.50'
                                borderWidth='5px'
                            >
                                <CardHeader >
                                </CardHeader>
                                <Divider borderWidth='3px' borderColor='blackAlpha.50' />
                                <CardBody color='blackAlpha.700'>

                                    <Box display='flex' justifyContent='space-between' gap='7' flexDirection='column' alignItems='center'>
                                        <Skeleton>
                                            <Icon fontSize={'6xl'} as={BiTaskX} />
                                        </Skeleton>

                                        <Box >Loading Tasks ... <Spinner /></Box>

                                        <Skeleton>
                                            <Box >Create a new task that you want to assign and easily find later.</Box>
                                        </Skeleton>
                                    </Box>

                                </CardBody>
                            </Card>
                        </Box >
                    </ScaleFade>
                    :
                    filterdTasks.length > 0
                        ?
                        filterdTasks.map(task => <Task key={task._id} task={task} />)
                        :
                        <ScaleFade initialScale={0.9} in={true} >
                            <Box pb='2'>
                                <Card
                                    borderColor='blackAlpha.50'
                                    borderWidth='5px'
                                >
                                    <CardHeader >
                                    </CardHeader>
                                    <Divider borderWidth='3px' borderColor='blackAlpha.50' />
                                    <CardBody color='blackAlpha.700'>
                                        <Box display='flex' justifyContent='space-between' gap='7' flexDirection='column' alignItems='center'>
                                            <Icon fontSize={'7xl'} as={BiTaskX} />
                                            <Box >No Tasks Found</Box>
                                            <Box >Create a new task that you want to assign and easily find later.</Box>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box >
                        </ScaleFade>
            }
        </Box >
    )
}

export default TaskList