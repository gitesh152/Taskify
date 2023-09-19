import React from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'

const HomePage = () => {
    return (
        <Container maxW='xl' centerContent>
            <Box w='100%' p={3} m={"40px 0px 15px 0px"} color='white'
                borderRadius={'lg'}
                borderWidth={'1px'}
                background={'white'}
                display={'flex'}
                justifyContent={'center'}
                width={"100%"}
            >
                <Text color={'black'} fontFamily={'Poppins'} fontSize={'3xl'}>Taskify</Text>
            </Box>
            <Box bg={'white'} borderRadius={'lg'} p={3} w="100%">
                <Tabs variant={'solid-rounded'} colorScheme='blue'>
                    <TabList>
                        <Tab w={'50%'}>Login</Tab>
                        <Tab w={'50%'} >Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

        </Container >
    )
}

export default HomePage