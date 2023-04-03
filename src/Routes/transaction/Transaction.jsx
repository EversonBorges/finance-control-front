import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableTransactions from './table/TableTransactions'
import ModalTransaction from './modal/ModalTransaction'
import apiFetch from '../../axios/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../components/Toast';
import ModalUserCard from './UserCard/ModalUserCard'

function Transaction() {


  const { id, referenceDate } = useParams()
  const formaterReferenceDate = new Date(referenceDate).toLocaleDateString('pt-BR')
  const [show, setShow] = useState(false)
  const [showUserCard, setShowUserCard] = useState(false)
  let [edit, setEdit] = useState()
  const [transactions, setTransactions] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  const onClick = (event) => {
    setShow(true)
    edit = event.idTransaction ? event : null
    setEdit(edit)
    event.idTransaction && setIsEdit(true)
  }

  const onClickModalUser = (event) => {
    setShowUserCard(true)
  }

  const onClose = () => {
    setShow(false)
    setIsEdit(false)
  }

  const openModal = () => {
    setShowUserCard(true)
  }

  const onCloseModalUser = () => {
    setShowUserCard(false)
  }

  const getTransactions = async () => {

    try {
      const response = await apiFetch.get(`transactions/card_id/${id}?referenceDate=${formaterReferenceDate}`)
      const content = response.data.content
      setTransactions(content)
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
    getTransactions()
  }, [])

  return (
    <div className='container'>
      <div>
        <Toast />
      </div>
      <div className='header'>
        <h1 className='uppercase dark:text-gray-200 sm:text-2xl'>Adicionar transação</h1>
        <div className='flex items-center gap-3'>
          <button onClick={onClick} className='button-form'>Nova transação</button>
          <button onClick={onClickModalUser} className='button-form'>Registar usuário</button>
        </div>
      </div>
      <div className='flex w-full flex-col items-center mt-20 gap-3 px-10'>
        <ModalTransaction 
              onClose={onClose} 
              show={show} 
              edit={edit} 
              id={id} 
              getTransactions={getTransactions} 
              showToast={showToast} 
              isEdit={isEdit}/>
        <TableTransactions 
              onClick={onClick} 
              formaterReferenceDate={formaterReferenceDate} 
              transactions={transactions}/>
        <ModalUserCard 
              onCloseModalUser={onCloseModalUser} 
              showUserCard={showUserCard} 
              id={id} 
              showToast={showToast} 
              openModal= {openModal}
              />
      </div>
    </div>
  )
}

export default Transaction