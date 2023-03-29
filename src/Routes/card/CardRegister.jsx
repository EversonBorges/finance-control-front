import React, { useState } from 'react'
import TableCard from './table/TableCard' 
import ModalCard from './modal/ModalCard'

function CardRegister() {

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
        <h1 className='uppercase dark:text-gray-200 sm:text-2xl'>Adicionar cartão</h1>
        <div className='flex flex-col items-center'>
          <button onClick={onClick} className='button-form'>Novo cartão</button>
        </div>
      </div>
      <div className='flex w-full flex-col items-center mt-20 gap-3 px-10'>
        <ModalCard onClose={onClose} show={show} edit={edit}/>
        <TableCard onClick={onClick} ></TableCard>
      </div>
    </div>
  )
}

export default CardRegister