import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form'
import { FormTransactionValidationResolver } from '../validations/FormTransactionValidation';
import apiFetch from '../../../../../axios/config'
import UtilServices from '../../../../../utils/UtilServices';

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

function ModalTransaction(props) {

    const theme = document.getElementsByClassName('dark').length === 1 ? '#1E2734' : '#B3B7BC'
    customStyles.content.background = theme
    const formMethods = useForm({ resolver: FormTransactionValidationResolver })
    const { formState: { errors }, register, handleSubmit, reset, formState, setValue } = formMethods
    const [sucess, setSucess] = useState()
    const [cards, setCards] = useState([])
    const [userCard, setUserCard] = useState([])

    function setValueEdit() {
        setValue("id", props.edit && props.edit.idTransaction)
        setValue("referenceDate", props.edit && props.edit.referenceDate)
        setValue("userCardId", props.edit && props.edit.userCardId)
        setValue("purchaseDescription", props.edit && props.edit.purchaseDescription)
        setValue("price", props.edit && props.edit.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        setValue("installmentsTotal", props.edit && props.edit.installmentsTotal)
    }

    const onSubmit = async (values) => {

        values.referenceDate = new Date(values.referenceDate).toLocaleDateString('pt-BR')
        values.price = values.price.replace(".", "").replace(",", ".").slice(3)

        try {
            if (props.edit) {
                await apiFetch.put("transactions", values)
                props.onClose()
                props.showToast("Editado com sucesso!", "success")
            } else {
                await apiFetch.post("transactions", values)
                props.showToast("Adicionado com sucesso!", "success")
            }
            setSucess(true)
            props.getTransactions()
        } catch (error) {
            console.log(error);
            error?.response?.data.map((obj) => {
                props.showToast(obj.message, "warn");
            })
        }
    };

    const getCards = async () => {
        try {
            const response = await apiFetch.get("cards/listCardActive")
            const content = response.data
            setCards(content)
        } catch (error) {
            console.log(error);
        }
    }

    const getUserCards = async () => {
        try {
            const response = await apiFetch.get("user-card/allActive")
            const content = response.data
            setUserCard(content)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserCards()
        getCards()
    }, [])

    useEffect(() => {
        if (sucess) {
            reset(
                { referenceDate: "", userCardId: "", purchaseDescription: "", price: "", installmentsTotal: "", }
            );
            setSucess(false)
        }

        if (props.isEdit) {
            setValueEdit()
        }

    }, [formState, reset]);

    const closeModal = () => {
        reset(
                { referenceDate: "", userCardId: "", purchaseDescription: "", price: "", installmentsTotal: "", }
            );
        props.onClose()
    }

    let classFlex = props.edit ? 'flex gap-4 items-center' : ""
    let disableClass = props.edit ? 'bg-gray-400' : ""

    return (
        <div>
            <Modal
                isOpen={props.show}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <h1>{props.edit ? "Editar transação" : "Adicionar nova transação"}</h1>
                    <label htmlFor="idCard"></label>
                    <input {...register('idCard')} type="hidden" value={props.id} />
                    <div className={classFlex}>
                        {props.edit &&
                            <div className='block mb-2 w-1/2'>
                                <label htmlFor="idCard">Cartão</label>
                                <select {...register('idCard')} className="w-full rounded-md">
                                    {
                                        cards.map((opt) => {
                                            return <option key={opt.id} value={opt.id}>{opt.nameCard}</option>
                                        })
                                    }

                                </select>
                            </div>
                        }

                        <div className='block mb-2'>
                            <label htmlFor="userCardId">Usuário cartão</label>
                            <select {...register('userCardId')} className="w-full rounded-md">
                                <option value="">Selecione um usuário do cartão</option>
                                {
                                    userCard.map((opt) => {
                                        return <option key={opt.id} value={opt.id}>{opt.nameUser}</option>
                                    })
                                }

                            </select>
                            {errors?.userCardId?.message && (
                                <p className='error-text'>{errors?.userCardId?.message}</p>
                            )}
                        </div>
                    </div>

                    <label htmlFor="purchaseDescription">Descrição compra</label>
                    <input {...register('purchaseDescription')} type="text" />
                    {errors?.purchaseDescription?.message && (
                        <p className='error-text'>{errors?.purchaseDescription?.message}</p>
                    )}
                    <div className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <div>
                            <label htmlFor="referenceDate">Data compra</label>
                            <input {...register('referenceDate')} type="date" className={disableClass} disabled={props.edit}></input>
                            {errors?.referenceDate?.message && (
                                <p className='error-text'>{errors?.referenceDate?.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="price">Valor compra</label>
                            <input {...register('price')} type="text" onInput={UtilServices.mascaraMoeda} className={disableClass} disabled={props.edit} />
                            {errors?.price?.message && (
                                <p className='error-text'>{errors?.price?.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="installmentsTotal">Parcelas</label>
                            <input {...register('installmentsTotal')} type="number" className={disableClass} disabled={props.edit} />
                            {errors?.installmentsTotal?.message && (
                                <p className='error-text'>{errors?.installmentsTotal?.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex  justify-center gap-10 mt-5">
                        <button type='submit' className='button-form'>Salvar</button>
                        <button onClick={closeModal} className='button-form'>Fechar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ModalTransaction