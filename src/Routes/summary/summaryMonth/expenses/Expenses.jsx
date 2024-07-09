import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableExpenses from './table/TableExpenses'
import ModalAddRevenues from './modal/ModalAddRevenues'
import apiFetch from '../../../../axios/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../../../components/Toast';

function Expenses() {

  const { month, year, classification } = useParams();
  const [show, setShow] = useState(false)
  
  let [edit, setEdit] = useState()
  const [expenses, setExpenses] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  const onClick = (event) => {
    setShow(true)
    edit = event.id ? event : null
    setEdit(edit)
    event.id && setIsEdit(true)
  }

  const onClose = () => {
    setShow(false)
    setIsEdit(false)
  }

  const getRevenues = async () => {

    try {
      const response = await apiFetch.get(`expense/reference-year-month?year=${year}&month=${month}`)
      setExpenses(response.data)
    } catch (error) {
      console.log(error);
    }
  }


  const showToast = (params, type) => {
    switch (type) {
      case "success":
        toast.success(params)
        break;
      case "warn":
        toast.warn(params)
        break;
    }
  }

  useEffect(() => {
    getRevenues()
  }, [])

  return (
    <div className='container'>
      <div>
        <Toast />
      </div>
      <div >
          
        <div className='flex justify-between pb-2 px-3'>
        <h6 className='font-extrabold dark:text-gray-200 sm:text-lg'>Receitas</h6>
          <button onClick={onClick} className='button-form'>Novo</button>
        </div>
      </div>
      <div className='flex w-full flex-col items-center'>
        <ModalAddRevenues
          onClose={onClose}
          show={show}
          edit={edit}
          getRevenues={getRevenues}
          showToast={showToast}
          isEdit={isEdit} />
        <TableExpenses
          onClick={onClick}
          transactions={expenses}
          filter={classification} />
      </div>
    </div>
  )
}

export default Expenses