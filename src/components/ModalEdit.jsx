import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, Input, Textarea, Button, ButtonGroup } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const ModalEdit = (props) => {
    const [data, setData] = useState({ userId: null, title: '', body: '' })
    const [btEdit, setBtEdit] = useState(true)
    const { userId, title, body, id } = props.detailData
    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.name === 'userId' ? Number(event.target.value) : event.target.value })
    }
    const enableBtEdit = () => {
        btEdit ? setBtEdit(false) : setBtEdit(true)
    }
    const closeModal = () => {
        props.onClose()
        setBtEdit(true)
    }
    const onBtSimpan = async () => {
        let temp = {
            userId: data.userId ? data.userId : userId,
            id,
            title: data.title ? data.title : title,
            body: data.body ? data.body : body,
        }
        try {
            let respon = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, temp)
            if (respon) {
                Swal.fire(
                    'Success!',
                    'Your data has been edited.',
                    'success'
                )
                closeModal()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal isOpen={props.onOpen} onClose={closeModal} size={{ base: 'xs', sm: 'sm', md: 'lg' }}>
            <ModalOverlay bg='blackAlpha.100' />
            <ModalContent>
                <ModalHeader textAlign='center'>Edit Data</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>User Id</FormLabel>
                        <Input placeholder='Input user id' name='userId' type='number' defaultValue={userId} onChange={(e) => handleInput(e)} disabled={btEdit} />
                    </FormControl>
                    <FormControl my='10px'>
                        <FormLabel>Title</FormLabel>
                        <Input placeholder='Title' name='title' defaultValue={title} onChange={(e) => handleInput(e)} disabled={btEdit} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Content</FormLabel>
                        <Textarea placeholder='write your content' defaultValue={body} name='body' onChange={(e) => handleInput(e)} disabled={btEdit} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    {
                        btEdit ?
                            <Button size='sm' colorScheme='yellow' onClick={enableBtEdit}>Edit</Button>
                            :
                            <>
                                <ButtonGroup>
                                    <Button size='sm' colorScheme='whatsapp' onClick={onBtSimpan}>Simpan</Button>
                                    <Button size='sm' colorScheme='blackAlpha' onClick={enableBtEdit}>Cancel</Button>
                                </ButtonGroup>
                            </>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalEdit