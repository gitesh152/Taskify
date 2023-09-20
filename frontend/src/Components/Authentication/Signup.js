import { AttachmentIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import validator from 'validator';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { TaskState } from '../../Context/TaskProvider';

const Signup = () => {
    const [toggle, setToggle] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pic, setPic] = useState('')
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const Navigate = useNavigate();
    const { apiUrl } = TaskState()

    const postPic = (pic) => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: 'Please select an Image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }
        if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'uploads');
            data.append('cloud_name', 'dm34wmjlm');
            //storing pic to cloud 
            fetch('https://api.cloudinary.com/v1_1/dm34wmjlm/image/upload', {
                method: 'post',
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Uploaded Pic', data);
                    setPic(data.url.toString());
                    setLoading(false)
                })
                .catch(error => {
                    toast({
                        title: error,
                        status: 'warning',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom'
                    })
                    setLoading(false)
                    return
                })

        }
        else {
            toast({
                title: 'Please select png/jpeg type image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return;
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please fill all the fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return;
        }
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
        if (password !== confirmPassword) {
            toast({
                title: 'Password does not match!',
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
            const { data } = await axios.post(`${apiUrl}/users/signup`, {
                name, email, password, pic
            }, config);
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
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
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
            <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input type={toggle ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm your password' />
                    <InputRightElement cursor='pointer' >
                        <Icon as={toggle ? ViewOffIcon : ViewIcon} onClick={() => setToggle(toggle => !toggle)} color='red.500' />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Upload Profile Picture</FormLabel>
                <InputGroup>
                    <Input type="file" className='custom__file__input' p={'4.5px 100px 1px 20px'} accept="image/*" onChange={(e) => postPic(e.target.files[0])} />
                    <InputRightElement cursor='pointer' pointerEvents="none">
                        <Icon as={AttachmentIcon} color='red.500' />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme='blue' mt='15px' w='100%' onClick={handleSubmit} isLoading={loading}>Sign Up</Button>
        </VStack >
    )
}

export default Signup