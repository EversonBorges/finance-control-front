import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableExpenses from './table/TableExpenses'
import apiFetch from '../../../../axios/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../../../components/Toast';
import UtilServices from '../../../../utils/UtilServices';
import ModalExpenses from './modal/ModalExpenses'
import { ArrowLeftCircleIcon,  ArrowRightCircleIcon} from "@heroicons/react/24/solid";

function Expenses() {
  const { month, year, classification } = useParams();
  const [show, setShow] = useState(false)
  const [expenseYear, setExpenseYear] = useState(year)
  const [expenseMonth, setExpenseMonth] = useState(month)
  const [edit, setEdit] = useState()
  const [expenses, setExpenses] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [monthDescription, setMonthDescription] = useState("")

  const onClick = (event) => {
    setShow(true)
    const edit = event.id ? event : null
    setEdit(edit)
    event.id && setIsEdit(true)
  }

  const onClose = () => {
    setShow(false)
    setIsEdit(false)
  }

  const getExpenses = async () => {
    try {
      const response = await apiFetch.get(`expense/reference-year-month?year=${expenseYear}&month=${expenseMonth}`)
      setExpenses(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getMonthDescription = (code) => {
    const months = UtilServices.getListMonths()
    for (let i = 0; i < months.length; i++) {
      if (months[i].cod == code) {
        setMonthDescription(months[i].description)
      }
    }
  }

  const alterMonthAndYear = (increment) => {
    let newMonth = parseInt(expenseMonth) + increment
    let newYear = expenseYear
    if (newMonth > 12) {
      newMonth = 1
      newYear = parseInt(expenseYear) + 1
    } else if (newMonth < 1) {
      newMonth = 12
      newYear = parseInt(expenseYear) - 1
    }
    setExpenseMonth(newMonth)
    setExpenseYear(newYear)
  }

  const showToast = (params, type) => {
    switch (type) {
      case "success":
        toast.success(params)
        break;
      case "warn":
        toast.warn(params)
        break;
      case "error":
        toast.error(params)
        break;
    }
  }

  useEffect(() => {
    getExpenses()
    getMonthDescription(expenseMonth)
  }, [expenseMonth, expenseYear])

  return (
    <div className='container'>
      <div>
        <Toast />
      </div>
      <div >
        <div className='flex justify-between pb-2 px-3'>
          <h6 className='font-extrabold dark:text-gray-200 sm:text-lg'>Despesas</h6>
          <div className='flex gap-3 items-center'>
            <button type="button" onClick={() => alterMonthAndYear(-1)}>
              <ArrowLeftCircleIcon className='h-5 sm:h-8  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-110' />
            </button>
            <h6 className='font-extrabold dark:text-gray-200 sm:text-lg'>{monthDescription} - {expenseYear}</h6>
            <button type="button" onClick={() => alterMonthAndYear(1)}>
              <ArrowRightCircleIcon className='h-5 sm:h-8  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-110' />
            </button>
          </div>
          <button onClick={onClick} className='button-form'>Novo</button>
        </div>
      </div>
      <div className='flex w-full flex-col items-center'>
        <ModalExpenses
          onClose={onClose}
          show={show}
          edit={edit}
          getExpenses={getExpenses}
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
