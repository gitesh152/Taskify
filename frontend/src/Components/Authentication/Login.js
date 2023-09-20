import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import validator from 'validator';
import { TaskState } from '../../Context/TaskProvider'

const Login = () => {
    const [toggle, setToggle] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const { apiUrl } = TaskState();
    const Navigate = useNavigate();
    const handleSubmit = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: 'Please fill all the fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
            return;
        }

        // email validation
        if (!validator.isEmail(email)) {
            toast({
                title: 'Please enter valid email!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post(`${apiUrl}/users/login`, {
                email, password
            }, config)
            localStorage.setItem('userInfo', JSON.stringify(data.user))
            setLoading(false)
            Navigate('/task')
        }
        catch (error) {
            toast({
                title: `Error Occured!`,
                description: error.response.data.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return
        }

    }

    return (
        <VStack spacing={'5px'}>
            <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={toggle ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
                    <InputRightElement cursor='pointer'>
                        <Icon as={toggle ? ViewOffIcon : ViewIcon} onClick={() => setToggle(toggle => !toggle)} color='red.500' />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme='blue' mt='15px' w='100%' onClick={handleSubmit} isLoading={loading}>Login</Button>
            <Button colorScheme='red' mt='15px' w='100%' onClick={() => {
                //guest user credentials
                setEmail('guest@email.com')
                setPassword('123')
            }}>Get Guest User Credentials</Button>
        </VStack >
    )
}

export default Login