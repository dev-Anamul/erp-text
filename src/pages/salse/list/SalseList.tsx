import { Button, FormControl, Input, Select, Skeleton, Spinner, Stack, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { CiFilter } from "react-icons/ci";
import { AiOutlinePlus } from 'react-icons/ai';
import SalseFilter from './SalseFilter';
import { useEffect, useState } from 'react';
import TableFooter from './TableFooter';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import SkeletonList from './Skeleton/SkeletonList';
import { useNavigate } from 'react-router-dom';

const SalseList = () => {
  const [filterLimit, setFilterLimit] = useState(20)
  const [data, setData] = useState([])
  const navigate = useNavigate()

  // Filter SHow Hide Handler
  const [filter, setFilter] = useState(false)

  // Get Data 
  // const { data, isLoading, error } = useFrappeGetDocList('Sales Invoice', {
  //   fields: ['name', 'status', "posting_date", 'posting_time', 'customer_name', 'paid_amount', 'net_total', 'remarks'],
  //   limit: filterLimit,
  //   orderBy: {
  //     field: 'creation',
  //     order: 'desc',
  //   }
  // })
  // console.log(data);

  useEffect(() => {
    fetch(`http://excel_erpnext.localhost:8000/api/resource/Sales Invoice?fields=%5B%22name%22%2C%20%22status%22%2C%20%22posting_date%22%2C%20%22posting_time%22%2C%20%22customer_name%22%2C%20%22paid_amount%22%2C%20%22net_total%22%2C%20%22remarks%22%5D&limit=300&order_by=creation+desc`, {
      headers: {
        Authorization: "token 3a6f30c363313f8:0fbd705429e5816"
      }
    }).then((res) => res.json()).then((data) => {
      console.log(data)
      setData(data.data)
    }).catch((err) => console.log(err)).finally()
  }, [])

  return (
    <div className='border rounded-md overflow-hidden'>
      <TableContainer>
        <div className="flex justify-between items-center pt-4 px-3">
          <div className="flex gap-2 items-center">
            <h1 className='text-xl' style={{ color: '#2c4392' }}>Sales Invoices</h1>
            <Button variant="outline" onClick={() => filter ? setFilter(false) : setFilter(true)} colorScheme="facebook" size='sm' >
              <CiFilter size={20} /> Filter
            </Button>
          </div>
          <Button variant="outline" colorScheme="facebook" size='sm' onClick={() => navigate('/sales/add')} >
            <AiOutlinePlus size={18} className="me-1" />  Add
          </Button>
        </div>
        <div style={{ height: filter ? 'auto' : '0', visibility: filter ? 'visible' : 'hidden', opacity: filter ? '1' : '0' }}>
          <SalseFilter />
        </div>
        <div style={{ height: filter ? '60.8vh' : '77.3vh', overflowX: 'auto' }}>
          <Table variant='striped' colorScheme="gray" >
            <TableHead />
            <Tbody>
              {data?.map((d, index) => {

                return (
                  <TableBody data={d} id={index + 1} key={index} />
                )
              })}
            </Tbody>
            {/* {isLoading && (
              <Stack direction='row' spacing={4}>
                <Spinner size='xl' />
              </Stack>
              // <SkeletonList />
            )} */}
            {/* {error && (<h1> Error </h1>)} */}
          </Table>
        </div>
      </TableContainer>
      <TableFooter data={data} filterLimit={setFilterLimit} />
    </div>
  )
}

export default SalseList;