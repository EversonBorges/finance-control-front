import React, { useState, useEffect } from 'react'
import TableCard from './table/TableCard'
import ModalCard from './modal/ModalCard'
import apiFetch from '../../axios/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../components/Toast';

function CardRegister() {

  const [show, setShow] = useState(false)
  let [edit, setEdit] = useState()
  const [cards, setCards] = useState([])

  const onClick = (event) => {
    setShow(true)
    edit = event.id ? event : null
    setEdit(edit)
  }

  const onClose = () => {
    setShow(false)
  }

  const showToast = (params) => {
    toast.success(params);
  }

  const getCards = async () => {
    try {
      const response = await apiFetch.get("cards")
      const content = response.data.content
      setCards(content)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCards()
  }, [])

  return (
    <div className='container'>
      <div>
        <Toast />
      </div>
      <div className='header'>
        <h1 className='uppercase dark:text-gray-200 sm:text-2xl'>Adicionar cartão</h1>
        <div className='flex flex-col items-center'>
          <button onClick={onClick} className='button-form'>Novo cartão</button>
        </div>
      </div>
      <div className='flex w-full flex-col items-center mt-20 gap-3 px-10'>
        <ModalCard onClose={onClose} show={show} edit={edit} getCards={getCards} showToast={showToast}/>
        <TableCard onClick={onClick} cards={cards} getCards={getCards}></TableCard>
      </div>
    </div>
  )
}

export default CardRegister