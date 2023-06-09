import { Td, Tr } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HiOutlineDotsVertical } from "react-icons/hi";
import listCss from './list.module.css'
import Swal from 'sweetalert2';


const propps = {
  data: Object,
  id: Number
}

const TableBody = ({ data, id } = propps) => {


  // Invoice Delete Handler
  const handleInvoiceDelete = (name: String) => {
    const documentToBeDeleted = {
      doctype: 'Sales Invoice',
      name: name
    }
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "token 3a6f30c363313f8:0fbd705429e5816"
      },
    };



    if (name) {
      Swal.fire({
        title: 'Are you sure?' + name,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          fetch(`http://excel_erpnext.localhost:8000/api/resource/Sales Invoice/${name}`, options).then((res) => res.json()).then(() => Swal.fire({
            title: 'Success',
            text: 'Sales Invoice deleted Sucessfully',
            icon: 'success'
          })
          )

        }
      })
    }
  }

  return (
    <>
      <Tr>
        <Td>{id}</Td>
        <Td>
          <Link to="/">{data?.name}</Link>
        </Td>
        <Td
          style={{
            color: (data?.status === 'Draft') && 'red' ||
              (data?.status === 'Completed') && 'green' ||
              (data?.status === 'To Deliver	') && 'gray'
          }}
        >{data?.status}</Td>
        <Td>{data?.posting_date}</Td>
        <Td>{data?.posting_time}</Td>
        <Td>{data?.customer_name}</Td>
        <Td>৳{data?.paid_amount}</Td>
        <Td>{data?.net_total}</Td>
        <Td>৳6,375.00</Td>
        <Td>{data?.remarks}</Td>
        <Td className={listCss.actions}>
          <div className={listCss.action_btn}>
            <HiOutlineDotsVertical size={20} />
            <ul>
              <li><Link to="/">View</Link></li>
              {data?.status === 'Draft' && <li><Link to={`/sales/edit/${data?.name}`}>Edit</Link></li>}
              <li><button onClick={() => handleInvoiceDelete(data?.name)}>Delete</button></li>
            </ul>
          </div>
        </Td>
      </Tr>
    </>
  )
}

export default TableBody