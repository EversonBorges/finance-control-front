import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableInvestments from './table/TableInvestments'
import apiFetch from '../../../../axios/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../../../components/Toast';
import UtilServices from '../../../../utils/UtilServices';
import AlterMonthYear from '../../../../components/AlterMonthyear';
import ModalInvestments from './modal/ModalInvestments'

function Investments(props) {

  const { month, year } = useParams();
  const [show, setShow] = useState(false)
  
  let [edit, setEdit] = useState()
  const [investments, setInvestments] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [monthDescription, setMonthDescription] = useState("")
  const [investmentsYear, setInvestmentsYear] = useState(year)
  const [investmentsMonth, setInvestmentsMonth] = useState(month)

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

  const getInvestments = async () => {

    try {
      let url = props.home ? `investments/reference-year-month/${investmentsYear}`
          :`investments/reference-year-month?year=${investmentsYear}&month=${investmentsMonth}`
      const response = await apiFetch.get(url)
      setInvestments(response.data)
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

    let result = UtilServices.moveToMonthAndYear(increment, investmentsMonth, investmentsYear)

    setInvestmentsMonth(result.newMonth)
    setInvestmentsYear(result.newYear)
  }

  useEffect(() => {
    getInvestments()
    getMonthDescription(investmentsMonth)
  }, [investmentsMonth, investmentsYear])

  return (
    <div className='container'>
      <div>
        <Toast />
      </div>
      <div>
        <AlterMonthYear
            home={props.home}
            header={'Investimentos'}
            alterMonthAndYear={alterMonthAndYear}
            monthDescription={monthDescription}
            year={investmentsYear}
            add={onClick} />
      </div>
      <div>
        <ModalInvestments
          onClose={onClose}
          show={show}
          edit={edit}
          getInvestments={getInvestments}
          showToast={showToast}
          isEdit={isEdit} />
        <TableInvestments
          onClick={onClick}
          transactions={investments} />
      </div>
    </div>
  )
}

export default Investments