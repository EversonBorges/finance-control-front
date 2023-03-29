import React, { useState} from 'react'
import { useParams } from 'react-router-dom'
import TableTransactions from './table/TableTransactions'
import ModalTransaction from './modal/ModalTransaction'

function Transaction() {

  const { id, referenceDate } = useParams()
  const formaterReferenceDate = new Date(referenceDate).toLocaleDateString('pt-BR')
  const [show, setShow] = useState(false)
  let [edit, setEdit] = useState()

  const onClick = (event) => {
    setShow(true)
    edit =  event.id ? event : null
    setEdit(edit)
  }

  const onClose = () => {
    setShow(false)
  }

  return (
    <div className='container'>
      <div className='header'>
        <h1 className='uppercase dark:text-gray-200 sm:text-2xl'>Adicionar transação</h1>
        <div className='flex flex-col items-center'>
          <button onClick={onClick} className='button-form'>Nova transação</button>
        </div>
      </div>
      <div className='flex w-full flex-col items-center mt-20 gap-3 px-10'>
        <ModalTransaction onClose={onClose} show={show} edit={edit} id={id}/>
        <TableTransactions onClick={onClick} id={id} formaterReferenceDate={formaterReferenceDate}></TableTransactions>
      </div>
    </div>
  )
}

export default Transaction