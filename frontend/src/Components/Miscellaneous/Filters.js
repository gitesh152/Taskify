import { Search2Icon } from '@chakra-ui/icons'
import { Box, Input, InputGroup, InputRightElement, Tab, TabList, Tabs } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { TaskState } from '../../Context/TaskProvider'

const Filters = () => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('');
    const { tasks, setFilterdTasks, user } = TaskState();

    useEffect(() => {
        // console.log(filter)
        switch (filter) {
            case 'ALL':
                setFilterdTasks(tasks)
                break;
            case 'ASSIGNED TO ME':
                setFilterdTasks(tasks.filter(task => task?.assignee?._id === user._id))
                break;
            case 'ASSIGNED BY ME':
                setFilterdTasks(tasks.filter(task => task?.admin?._id === user._id))
                break;
            case 'WORKING':
                setFilterdTasks(tasks.filter(task => task?.status === 'Working'))
                break;
            case 'COMPLETED':
                setFilterdTasks(tasks.filter(task => task?.status === 'Completed'))
                break;
            case 'SORT_BY_NAME':
                setFilterdTasks(selectionSort(tasks))
                break;
            default:
                setFilterdTasks(tasks)
                break;
        }
    }, [filter, setFilterdTasks, tasks, user._id])

    //using selection sort to sort tasks by name (since array.name is not working late)
    function selectionSort(arr) {
        const n = arr.length;
        const sortedArr = [...arr]; // Create a copy of the original array
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                // Compare titles using localeCompare for alphabetical order
                if (sortedArr[j].title.localeCompare(sortedArr[minIndex].title) < 0) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                // Swap elements in the copy
                [sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]];
            }
        }
        return sortedArr;
    }

    const customTabTheme = {
        fontSize: { base: '8px', lg: '12px' },
        _hover: { color: 'white', bg: 'blue.500', borderRadius: '5' },
        _selected: { color: 'white', bg: 'blue.500', borderRadius: '5' }
    }

    const handleSearch = (query) => {
        setSearch(query)
        setFilterdTasks(tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase())))
    }
    return (
        <Box display={'flex'} px={{ base: '5px', md: '0px' }} flexDirection={{ base: 'column', sm: 'row-reverse' }} justifyContent='space-between' alignItems='center' m='5px auto' >
            <InputGroup size='sm' w={{ base: '100%', sm: '230px' }} display='block' >
                <Input
                    placeholder='Search task by title'
                    colorScheme='blue'
                    color='tomato'
                    borderColor='blue.500'
                    focusBorderColor='tomato'
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    _placeholder={{ opacity: 0.5, color: 'red' }}
                    _hover={{ opacity: 1, color: 'red' }}
                />
                <InputRightElement pointerEvents='none'>
                    <Search2Icon color='blue.500' />
                </InputRightElement>
            </InputGroup>
            <Tabs size={{ base: 'sm' }} variant='unstyled' my='1'  >
                <TabList>
                    <Tab {...customTabTheme} onClick={() => setFilter('ALL')}>ALL</Tab>
                    <Tab {...customTabTheme} onClick={() => setFilter('ASSIGNED TO ME')}>ASSIGNED TO ME</Tab>
                    <Tab {...customTabTheme} onClick={() => setFilter('ASSIGNED BY ME')}>ASSIGNED BY ME</Tab>
                    <Tab {...customTabTheme} onClick={() => setFilter('WORKING')}>WORKING</Tab>
                    <Tab {...customTabTheme} onClick={() => setFilter('COMPLETED')}>COMPLETED</Tab>
                    <Tab {...customTabTheme} onClick={() => setFilter('SORT_BY_NAME')}>SORT BY NAME</Tab>
                </TabList>
            </Tabs>

        </Box>
    )
}

export default Filters