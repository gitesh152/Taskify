import React, { useEffect, useRef, useCallback } from 'react'
import { Avatar, Badge, Box, Button, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { AddIcon, BellIcon, ChevronDownIcon, Icon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal';
import { TaskState } from '../../Context/TaskProvider';
import { useNavigate } from 'react-router-dom';
import TaskModal from './TaskModal';
import { FiRefreshCcw } from "react-icons/fi"

const Header = () => {
    const menuRef = useRef(null);
    const { settToggleTaskFetch, user, notification, setNotification } = TaskState();
    const Navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        Navigate('/');
    }

    // Event listener to clear notifications when clicking outside of the menu button
    const handleOutsideClick = useCallback((e) => {
        setTimeout(() => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setNotification([]);
                document.removeEventListener('click', handleOutsideClick);
            }
        }, 100)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [handleOutsideClick]);

    const handleClick = () => {
        document.addEventListener('click', handleOutsideClick);
    }

    return (
        <Box
            display='flex'
            background='white'
            width='100%'
            alignItems='center'
            justifyContent='space-between'
            borderColor='blackAlpha.50'
            borderWidth='5px'
            zIndex='2'
            position={'fixed'}
            padding={{ base: '5px 5px', sm: '5px 10px', md: '5px 15%' }}
        >
            <TaskModal>
                <Button
                    display={{ base: 'none', sm: 'flex' }}
                    rightIcon={<AddIcon />}
                >Create New Task</Button>
                <IconButton display={{ sm: 'none' }} icon={<AddIcon />} />
            </TaskModal>
            <Text fontFamily='poppins' fontSize={{ md: '2xl' }}>
                Taskify
            </Text>
            <Box ref={menuRef}
                display='flex'
                alignItems='center'
            >
                <Icon as={FiRefreshCcw} _hover={{ cursor: 'pointer' }} onClick={() => settToggleTaskFetch(prev => !prev)} fontSize={{ base: 'md', sm: 'xl' }} />
                <Menu>
                    <MenuButton p='1' mx='2' onClick={() => handleClick()} style={{ position: 'relative' }}>
                        <BellIcon boxSize={{ base: '18px', sm: '25px' }} mb={{ base: '4px', sm: 'auto' }} />
                        {notification.length > 0 &&
                            <Badge
                                position={'absolute'}
                                left={{ base: '13px', sm: '18px' }}
                                color={'white'}
                                borderWidth={'1px'}
                                borderColor={'white'}
                                borderRadius={'50%'}
                                top={{ sm: '0px' }}
                                backgroundColor={'#d4130d'}
                                fontSize={{ base: '9px', sm: '11px' }}
                                w={{ base: '15px', sm: '19px' }}
                            >{notification.length < 10 ? notification.length : '9+'}</Badge>
                        }
                    </MenuButton>
                    <MenuList textAlign={'center'}>
                        {notification.length > 0 ?
                            notification.map((n, i) => <MenuItem key={i}  >
                                {
                                    n.type === 'newtask'
                                        ?
                                        (
                                            <>
                                                A new task <Text p='1' color='tomato' textTransform='uppercase'>{n.task?.title}</Text> has been assigned to you.
                                            </>
                                        )
                                        :
                                        n.type === 'info' ?
                                            (
                                                <>
                                                    Task <Text p='1' color='tomato' textTransform='uppercase'>{n.task?.title}</Text> infomation has been updated, please check !
                                                </>
                                            )
                                            :
                                            //when notification about status change
                                            (
                                                <>
                                                    Task <Text p='1' color='tomato' textTransform='uppercase'>{n.task?.title}</Text> status changed to <Text p='1' color='tomato'>{n.task?.status}</Text>
                                                </>
                                            )
                                }
                            </MenuItem>)
                            : <MenuItem color='tomato'> No new notification ... </MenuItem>}
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar size='sm' cursor='pointer' src={user.pic} name={user.name} />
                    </MenuButton>
                    <MenuList border='none'>
                        <ProfileModal user={user} >
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider />
                        <MenuItem onClick={handleLogout} >Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Box >
    )
}

export default Header