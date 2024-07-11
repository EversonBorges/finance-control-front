import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableRevenues from './table/TableRevenues'
import ModalAddRevenues from './modal/ModalRevenues'
import apiFetch from '../../../../axios/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../../../components/Toast';
import UtilServices from '../../../../utils/UtilServices';

function Revenues() {

  const { month, year } = useParams();
  const [show, setShow] = useState(false)
  
  let [edit, setEdit] = useState()
  const [revenues, setRevenues] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [monthDescription, setMonthDescription] = useState("")

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
      const response = await apiFetch.get(`revenues/reference-year-month?year=${year}&month=${month}`)
      setRevenues(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  function getMonthDescription(code) {
    var months = UtilServices.getListMonths()
    for (let i = 0; i < months.length; i++) {
      if (months[i].cod == code) {
        setMonthDescription(months[i].description)
      }
    }
    return null;
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
    getMonthDescription(month)
  }, [])

  return (
    <div className='container'>
      <div>
        <Toast />
      </div>
      <div >
          
        <div className='flex justify-between pb-2 px-3'>
        <h6 className='font-extrabold dark:text-gray-200 sm:text-lg'>Receitas</h6>
        <h6 className='font-extrabold dark:text-gray-200 sm:text-lg'>Referência: {monthDescription} - {year}</h6>
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
        <TableRevenues
          onClick={onClick}
          transactions={revenues} />
      </div>
    </div>
  )
}

export default Revenues