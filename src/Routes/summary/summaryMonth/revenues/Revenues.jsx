import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableRevenues from './table/TableRevenues'
import ModalRevenues from './modal/ModalRevenues'
import apiFetch from '../../../../axios/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../../../components/Toast';
import UtilServices from '../../../../utils/UtilServices';
import AlterMonthYear from '../../../../components/AlterMonthyear';

function Revenues(props) {

  const { month, year } = useParams();
  const [show, setShow] = useState(false)
  
  let [edit, setEdit] = useState()
  const [revenues, setRevenues] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [monthDescription, setMonthDescription] = useState("")
  const [revenueYear, setRevenueYear] = useState(year)
  const [revenueMonth, setRevenueMonth] = useState(month)

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
      let url = props.home ? `revenues/reference-year-month/${revenueYear}`
          :`revenues/reference-year-month?year=${revenueYear}&month=${revenueMonth}`
      const response = await apiFetch.get(url)
      setRevenues(response.data)
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

  const alterMonthAndYear = (increment) => {

    let result = UtilServices.moveToMonthAndYear(increment, revenueMonth, revenueYear)

    setRevenueMonth(result.newMonth)
    setRevenueYear(result.newYear)
  }

  useEffect(() => {
    getRevenues()
    getMonthDescription(revenueMonth)
  }, [revenueMonth, revenueYear])

  return (
    <div className='container'>
      <div>
        <Toast />
      </div>
      <div>
        <AlterMonthYear
            home={props.home}
            header={'Receitas'}
            alterMonthAndYear={alterMonthAndYear}
            monthDescription={monthDescription}
            year={revenueYear}
            add={onClick} />
      </div>
      <div>
        <ModalRevenues
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