import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableExpenses from './table/TableExpenses'
import apiFetch from '../../../../axios/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../../../components/Toast';
import UtilServices from '../../../../utils/UtilServices';
import ModalExpenses from './modal/ModalExpenses'
import AlterMonthYear from '../../../../components/AlterMonthyear';

function Expenses(props) {
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
      let url = props.home ? `expense/reference-year-month/${expenseYear}`
        : `expense/reference-year-month?year=${expenseYear}&month=${expenseMonth}`
      const response = await apiFetch.get(url)
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

    let result = UtilServices.moveToMonthAndYear(increment, expenseMonth, expenseYear)

    setExpenseMonth(result.newMonth)
    setExpenseYear(result.newYear)
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
      <div>
        <AlterMonthYear
          home={props.home}
          header={'Despesas'}
          alterMonthAndYear={alterMonthAndYear}
          monthDescription={monthDescription}
          year={expenseYear}
          add={onClick} />
      </div>
      <div className='p-2'>
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
          filter={props.home ? "" : classification} />
      </div>
    </div>
  )
}

export default Expenses
