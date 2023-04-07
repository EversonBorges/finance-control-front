import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import apiFetch from '../../../axios/config'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '20px',
        background: "",
    },
};

function ModalTransactionUserCard(props) {

    const theme = document.getElementsByClassName('dark').length === 1 ? '#1E2734' : '#B3B7BC'
    customStyles.content.background = theme
    const [userCard, setUserCard] = useState([])
    const [userCardId, setUserCardId] = useState(0)
    const [userCardInfo, setUserCardInfo] = useState()

    let infoUser = {}

    const getUserCards = async () => {
        try {
            const response = await apiFetch.get("user-card/allActive")
            const content = response.data
            setUserCard(content)
        } catch (error) {
            console.log(error);
        }
    }

    const getTransactionsUserCards = async () => {
        console.log("User ", userCardId);
        try {

            const response = await apiFetch.get(`transactions/user_id/${props.id}/${userCardId}?referenceDate=${new Date(props.referenceDate).toLocaleDateString('pt-BR')}`)
            const content = response.data
            console.log("content ->", content);
            infoUser = content
            setUserCardInfo(content)
            console.log("UserCardInfo ->", userCardInfo);

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        setUserCardId(event.target.value)
    }

    useEffect(() => {
        getUserCards()
    }, [])

    useEffect(() => {
        getTransactionsUserCards()
    }, [userCardId])

    const closeModal = () => {
        props.onCloseModalUser()
        setUserCardId(0)
    }

    return (
        <div>
            <Modal
                isOpen={props.showUserCard}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="form">
                    <h1>Transações por usuário</h1>
                    <div className='block mb-2'>
                        <label htmlFor="userCardId">Usuário cartão</label>
                        <select className="w-full rounded-md border-2 border-black  dark:border-white font-bold" value={userCardId} onChange={handleChange}>
                            <option value="">Selecione um usuário</option>
                            {
                                userCard.map((opt) => {
                                    return <option key={opt.id} value={opt.id}>{opt.nameUser}</option>
                                })
                            }
                        </select>
                    </div>
                        <fieldset className='dark:text-gray-200 border-2 px-20 border-black dark:border-white'>
                            <legend className='uppercase font-bold text-xl '>Informações</legend>
                            {!userCardInfo
                                ?<div className='font-bold'>
                                    Não há compras neste periodo para o usuário selecionado
                                </div>
                                :<div className='flex flex-col items-center'>
                                    <div className='text-lg'>
                                        <span htmlFor="">Usuário: </span>
                                        <span className='font-bold'>{userCardInfo.nameUserCard}</span>
                                    </div>
                                    <div className='text-lg'>
                                        <span htmlFor="">Mês referência: </span>
                                        <span className='font-bold'>{userCardInfo.monthAndYearReference}</span>
                                    </div>
                                    <div className='text-lg'>
                                        <span htmlFor="">Quantidade de compras: </span>
                                        <span className='font-bold' >{userCardInfo.totalTransaction}</span>
                                    </div>
                                    <div className='text-lg'>
                                        <span htmlFor="">Valor total de compras mês: </span>
                                        <span className='font-bold' >{userCardInfo.totalPurchase && userCardInfo.totalPurchase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    </div>
                                </div>
                            }
                        </fieldset>
                    <div className="flex  justify-center gap-10 mt-5">
                        <button onClick={closeModal} className='button-form'>Fechar</button>
                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default ModalTransactionUserCard