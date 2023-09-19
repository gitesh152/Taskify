import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({ children, user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay bg='blackAlpha.300'
                    backdropFilter='blur(10px)' />
                <ModalContent>
                    <ModalHeader
                        display='flex'
                        justifyContent='center'
                        fontSize='40px'
                        fontFamily='poppins'
                    >{user.name}</ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody display='flex' flexDir='column' alignItems='center' justifyContent='space-between'>
                        <Image borderRadius='full' boxSize='150px' src={user.pic} alt={user.name} />
                        <Text fontSize={{ base: '25px', md: '30px' }}>{user.email}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal