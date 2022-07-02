import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const ModalAdd = (props) => {
    const [data, setData] = useState({ userId: null, id: null, title: '', body: '' })
    const { dataList } = useSelector((state) => {
        return {
            dataList: state.dummyReducer.dataList
        }
    })

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.name === 'userId' ? Number(event.target.value) : event.target.value })
    }
    const onBtSimpan = async () => {
        let temp = { ...data, id: dataList.length + 1 }
        try {
            let respon = await axios.post(`https://jsonplaceholder.typicode.com/posts`, temp)
            if (respon) {
                Swal.fire(
                    'Success!',
                    'New data has been added.',
                    'success'
                  )
                props.onClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Modal isOpen={props.onOpen} onClose={props.onClose} size={{ base: 'xs', sm: 'sm', md: 'md' }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center'>Add New Data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>User Id</FormLabel>
                            <Input placeholder='Input user id' name='userId' type='number' onChange={(e) => handleInput(e)} />
                        </FormControl>
                        <FormControl my='10px'>
                            <FormLabel>Title</FormLabel>
                            <Input placeholder='Title' name='title' onChange={(e) => handleInput(e)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Content</FormLabel>
                            <Textarea placeholder='write your content' name='body' onChange={(e) => handleInput(e)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button size='sm' colorScheme='whatsapp' onClick={onBtSimpan}>Simpan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAdd