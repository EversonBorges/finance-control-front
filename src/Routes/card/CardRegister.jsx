import React, { useState } from 'react'
import Table from '../../components/Table' 
import NewModal from './modal/NewModal'

function CardRegister() {

  const [show, setShow] = useState(false)
  let [edit, setedit] = useState()

  const onClick = (event) => {
    setShow(true)
    edit =  event.id ? event : null
    setedit(edit)
  }

  const onClose = () => {
    setShow(false)
  }

  return (
    <div className='flex flex-col'>
      <div className='flex bg-gradient-to-t from-gray-800 to-transparent shadow-gray-900 dark:shadow-gray-500 shadow-lg mt-5 py-7 items-center justify-around uppercase font-bold text-sm '>
        <h1 className='uppercase dark:text-gray-200 sm:text-2xl'>Adicionar cartão</h1>
        <div className='flex flex-col items-center'>
          <button onClick={onClick} className='button-form'>Novo cartão</button>
        </div>
      </div>
      <div className='flex flex-col items-center mt-7 gap-3'>
        <NewModal onClose={onClose} show={show} edit={edit}/>
          <Table onClick={onClick} ></Table>
      </div>
    </div>
  )
}

export default CardRegister