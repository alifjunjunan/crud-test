import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { getDataAction } from '../redux/action';
import { Box, Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td, ButtonGroup, Button } from '@chakra-ui/react';
import ModalAdd from '../components/ModalAdd';
import ModalEdit from '../components/ModalEdit';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingPage from './LoadingPage';
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const HomePage = (props) => {
    const [chartDataPie, setDataChartPie] = useState({})
    const [chartDataLine, setDataChartLine] = useState({})
    const [chartDataBar, setDataChartBar] = useState({})
    const [dataTable, setDataTable] = useState([])
    const [detailData, setDetailData] = useState({})
    const [page, setPage] = useState(1)
    const [limitData, setLimitData] = useState(10)
    const [modalAddOpen, setModalAddOpen] = useState(false)
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [sizePagination, setSizePagination] = useState('default')
    const dispatch = useDispatch()
    useEffect(() => {
        getTotalDataUserId()
    }, [])

    const getTotalDataUserId = async () => {
        try {
            let respon = await dispatch(getDataAction())
            if (respon.success) {
                let temp = []
                setDataTable(respon.data)
                setIsLoading(false)
                respon.data.forEach((value, index) => {
                    if (temp.length === 0) {
                        temp.push({ [value.userId]: 1 })
                    }
                    else if (temp[temp.length - 1].hasOwnProperty(`${value.userId}`)) {
                        temp[temp.length - 1][value.userId] = temp[temp.length - 1][value.userId] += 1
                    } else {
                        temp.push({ [value.userId]: 1 })
                    }

                })

                if (temp.length > 0) {
                    setDataChartPie({
                        labels: ['userId 1', 'userId 2', 'userId 3', 'userId 4', 'userId 5', 'userId 6', 'userId 7', 'userId 8', 'userId 9', 'userId 10'],
                        datasets: [
                            {
                                label: '# of Votes',
                                data: temp.map((value, index) => value[index + 1]),
                                backgroundColor: [
                                    'rgba(26, 188, 156,0.8)',
                                    'rgba(46, 204, 113,0.8)',
                                    'rgba(52, 152, 219,0.8)',
                                    'rgba(253, 167, 223,0.8)',
                                    'rgba(52, 73, 94,0.8)',
                                    'rgba(243, 156, 18,0.8)',
                                    'rgba(192, 57, 43,0.8)',
                                    'rgba(75, 192, 192, 0.8)',
                                    'rgba(153, 102, 255, 0.8)',
                                    'rgba(247, 215, 148,0.8)',
                                ],
                                borderColor: [
                                    'rgba(26, 188, 156,1)',
                                    'rgba(46, 204, 113,1)',
                                    'rgba(52, 152, 219,1)',
                                    'rgba(253, 167, 223,1.0)',
                                    'rgba(52, 73, 94,1)',
                                    'rgba(243, 156, 18,1)',
                                    'rgba(192, 57, 43,1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(247, 215, 148,1.0)',
                                ],
                                borderWidth: 1,
                            }
                        ]

                    })
                    setDataChartLine({
                        labels: ['userId 1', 'userId 2', 'userId 3', 'userId 4', 'userId 5', 'userId 6', 'userId 7', 'userId 8', 'userId 9', 'userId 10'],
                        datasets: [
                            {
                                label: 'total data',
                                data: temp.map((value, index) => value[index + 1]),
                                borderColor: 'rgba(59, 59, 152)',
                                backgroundColor: 'rgba(59, 59, 152,0.8)'
                            }
                        ]
                    })
                    setDataChartBar({
                        labels: ['userId 1', 'userId 2', 'userId 3', 'userId 4', 'userId 5', 'userId 6', 'userId 7', 'userId 8', 'userId 9', 'userId 10'],
                        datasets: [
                            {
                                label: 'total data',
                                data: temp.map((value, index) => value[index + 1]),
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)'
                            }
                        ]
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    const printPieChart = () => {
        if (chartDataPie.hasOwnProperty('datasets')) {
            return <Pie data={chartDataPie} />
        }
    }
    const printLineChart = () => {
        if (chartDataLine.hasOwnProperty('datasets')) {
            return <Line data={chartDataLine} />
        }
    }
    const printBarChart = () => {
        if (chartDataBar.hasOwnProperty('datasets')) {
            return <Bar data={chartDataBar} />
        }
    }
    const handleModalEdit = (value, open) => {
        setDetailData(value)
        setModalEditOpen(open)
    }
    const onBtDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }
    const printDataTable = () => {
        if (dataTable.length > 0) {
            return dataTable.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((value, index) => {
                return (
                    <Tr key={value.id}>
                        <Td textAlign='center'>{page > 1 ? (page - 1) * limitData + index + 1 : index + 1}</Td>
                        <Td textAlign='center'>{value.userId}</Td>
                        <Td textAlign='center'>{value.title.substr(0, 20)}</Td>
                        <Td textAlign='center'>{value.body.substr(0, 50)}</Td>
                        <Td textAlign='center'>
                            <ButtonGroup gap='4'>
                                <Button colorScheme='facebook' size='sm' onClick={() => handleModalEdit(value, true)}>Detail</Button>
                                <ModalEdit detailData={detailData} onOpen={modalEditOpen} onClose={() => setModalEditOpen(!modalEditOpen)} />
                                <Button colorScheme='red' size='sm' onClick={() => onBtDelete(value.id)}>Delete</Button>
                            </ButtonGroup>
                        </Td>
                    </Tr>
                )
            })
        }
    }
    const handlePagination = (page, limit) => {
        setPage(page)
        setLimitData(limit)

        if (limitData !== limit) {
            setPage(1)
        }
    }
    return (
        <>
            {
                isLoading ?
                    <LoadingPage />
                    :
                    <>
                        <Box w={{ base: '85%', sm: '85%', md: '85%', lg: '95%' }} m='0 auto'>
                            <Box my='20px' borderBottom='2px solid #F2F2F2'>
                                <Heading as='h2' size='lg' textAlign='center' mb='10px'>Data Statistic User</Heading>
                            </Box>
                            <Box display='flex' w='100%' flexDirection={{ base: 'column', sm: 'column', md: 'column', lg: 'row'}}>
                                <Box flexBasis='30%'>
                                    {printPieChart()}
                                </Box>
                                <Box flexBasis='35%' m={{ base: '15px 0', lg: 'auto 0' }}>
                                    {printLineChart()}
                                </Box>
                                <Box flexBasis='35%' m='auto 0'>
                                    {printBarChart()}
                                </Box>
                            </Box>
                        </Box>
                        <Box w={{ base: '90%', lg: '95%' }} m='30px auto'>
                            <Box borderBottom='2px solid #F2F2F2' mb='20px'>
                                <Heading as='h2' size='lg' textAlign='center' mb='10px'>List Data User</Heading>
                            </Box>
                            <Box p='30px' borderRadius='15px' boxShadow='lg'>
                                <Box display='flex' justifyContent='end' mb='20px'>
                                    <Button size='sm' colorScheme='green' onClick={() => setModalAddOpen(!modalAddOpen)}>Tambah</Button>
                                    <ModalAdd onOpen={modalAddOpen} onClose={() => setModalAddOpen(!modalAddOpen)} />
                                </Box>
                                <TableContainer>
                                    <Table size={{ base: 'sm', sm: 'sm', md: 'sm', lg: 'lg' }}>
                                        <Thead >
                                            <Tr>
                                                <Th textAlign='center'>No</Th>
                                                <Th textAlign='center'>User Id</Th>
                                                <Th textAlign='center'>Title</Th>
                                                <Th textAlign='center'>Content</Th>
                                                <Th textAlign='center'>Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {printDataTable()}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                                <Box display='flex' mt='50px' justifyContent='center'>
                                    <Pagination current={page} onChange={(page, pageSize) => handlePagination(page, pageSize)} total={dataTable.length} pageSize={limitData} />
                                </Box>
                            </Box>
                        </Box>
                    </>

            }
        </>
    )
}

export default HomePage