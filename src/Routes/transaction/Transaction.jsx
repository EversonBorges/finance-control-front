import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TableTransactions from './table/TableTransactions'
import ModalTransaction from './modal/ModalTransaction'
import apiFetch from '../../axios/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../components/Toast';
import ModalUserCard from './UserCard/ModalUserCard'
import ModalTransactionUserCard from './UserCard/ModalTransactionUserCard'

function Transaction() {

  const { id } = useParams()
  const [referenceDate, setReferencedate] = useState(new Date().toLocaleDateString('en-CA'))
  const [show, setShow] = useState(false)
  const [showUserCard, setShowUserCard] = useState(false)
  let [edit, setEdit] = useState()
  const [transactions, setTransactions] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [showTransactionUser, setShowTransactionUser] = useState(false)
  const [userCardInfo, setUserCardInfo] = useState({})

  const handleChange = (ev) => {
    setReferencedate(new Date(ev.target.value))
  }

  const onClick = (event) => {
    setShow(true)
    edit = event.idTransaction ? event : null
    setEdit(edit)
    event.idTransaction && setIsEdit(true)
  }

  const onClickModalUser = () => {
    setShowUserCard(true)
  }

  const onClickModalTransactionUser = () => {
    setShowTransactionUser(true)
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

  const onCloseTransactionModalUser = () => {
    setShowTransactionUser(false)
  }

  const getTransactions = async () => {

    try {
      const response = await apiFetch.get(`transactions/card_id/${id}?referenceDate=${new Date(referenceDate).toLocaleDateString('pt-BR')}`)
      const content = response.data.content
      setTransactions(content)
    } catch (error) {
      console.log(error);
    }
  }

  const getTransactionsUserCards = async (userCardId) => {
    console.log("User ", userCardId);
    try {

            const response = await apiFetch.get(`transactions/user_id/${id}/${userCardId}?referenceDate=${new Date(referenceDate).toLocaleDateString('pt-BR')}`)
            const content = response.data
            console.log("content ->", userCardInfo);
            setUserCardInfo(content)
            console.log("UserCardInfo ->", userCardInfo);

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
  }, [referenceDate])


  return (
    <div className='container'>
      <div>
        <Toast />
      </div>
      <div >
        <h6 className='uppercase dark:text-gray-200 sm:text-sm'>Adicionar transação</h6>
          
        <div className='flex items-center gap-3'>
          <button onClick={onClick} className='button-form py-1'>Nova transação</button>
          <button onClick={onClickModalUser} className='button-form py-1'>Registrar usuário</button>
          <button onClick={onClickModalTransactionUser} className='button-form py-1'>Transação usuário</button>
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
          isEdit={isEdit} />
        <TableTransactions
          onClick={onClick}
          referenceDate={referenceDate}
          transactions={transactions} />
        <ModalUserCard
          onCloseModalUser={onCloseModalUser}
          showUserCard={showUserCard}
          id={id}
          showToast={showToast}
          openModal={openModal}
        />
        <ModalTransactionUserCard
          onCloseModalUser={onCloseTransactionModalUser}
          showUserCard={showTransactionUser}
          id={id}
          referenceDate={referenceDate}
          getTransactionsUserCards={getTransactionsUserCards}
          userCardInfo={userCardInfo}
        />
      </div>
    </div>
  )
}

export default Transaction