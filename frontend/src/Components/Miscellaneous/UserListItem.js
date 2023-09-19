import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
    return (
        <Box
            boxSize={'base'}
            display='flex'
            alignItems='center'
            cursor='pointer'
            bg='#E8E8E8'
            borderRadius='lg'
            color='black'
            px='2'
            py='0.5'
            mb='2'
            onClick={handleFunction}
        >
            <Avatar name={user.name} src={user.pic} mr='2' size={'xs'} />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize='xs'><b>Email : </b>{user.email}</Text>
            </Box>
        </Box>
    )
}

export default UserListItem