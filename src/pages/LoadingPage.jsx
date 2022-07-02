import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import loading from '../assets/loading.gif'
const LoadingPage = () => {
    return (
        <>
            <Box w='30%' m={{ base: '40vh auto', lg: '20vh auto' }}>
                <Image src={loading} w='100%' objectPosition='center' objectFit='cover' />
            </Box>
        </>
    )
}

export default LoadingPage