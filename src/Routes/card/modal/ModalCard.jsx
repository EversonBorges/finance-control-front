import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form'
import { FormCardValidationResolver } from '../validations/FormCardValidation';
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

function ModalCard(props) {

    const theme = document.getElementsByClassName('dark').length === 1 ? '#1E2734' : '#B3B7BC'
    customStyles.content.background = theme
    const formMethods = useForm({ resolver: FormCardValidationResolver })
    const { formState: { errors }, register, handleSubmit, reset, formState, setValue } = formMethods

    function alterVAlue(){
        setValue("nameCard", props.edit ? props.edit.nameCard : "")
        setValue("owner", props.edit ? props.edit.owner : "")
        setValue("limitCard", props.edit ? props.edit.limitCard : "")
        setValue("bestDayBuy", props.edit ? props.edit.bestDayBuy : "")
        setValue("duoDate", props.edit ? props.edit.duoDate : "")
    }

    const onSubmit = async (values) => {

        try {
            if (props.edit) {
                await apiFetch.put(`cards/${props.edit.id}`, values)
                props.showToast("Editado com sucesso!")
                props.onClose()
            } else {
                await apiFetch.post("cards", values)
                props.showToast("Adicionado com sucesso!");
            }
            props.getCards()
        } catch (error) {
            console.log(error.response);
            error.response.data.map((obj)=>{
                props.showToast(obj.message);
            })
        }
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset(
                { nameCard: "", owner: "", limitCard: "", bestDayBuy: "", duoDate: "", }
            );
        }
        alterVAlue()
    }, [formState, reset]);

    return (
        <div>
            <Modal
                isOpen={props.show}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <h1>{props.edit ? "Editar Cartão" : "Adicionar novo cartão"}</h1>
                    <label htmlFor="nameCard">Nome cartão</label>
                    <input {...register('nameCard')} type="text" />
                    {errors?.nameCard?.message && (
                        <p className='error-text'>{errors?.nameCard?.message}</p>
                    )}
                    <label htmlFor="owner">Titular</label>
                    <input {...register('owner')} type="text" />
                    {errors?.owner?.message && (
                        <p className='error-text'>{errors?.owner?.message}</p>
                    )}
                    <div className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <div>
                            <label htmlFor="limitCard">Limite cartão</label>
                            <input {...register('limitCard')} type="number" />
                            {errors?.limitCard?.message && (
                                <p className='error-text'>{errors?.limitCard?.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="bestDayBuy">Melhor dia compra</label>
                            <input {...register('bestDayBuy')} type="number" />
                            {errors?.bestDayBuy?.message && (
                                <p className='error-text'>{errors?.bestDayBuy?.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="duoDate">Vencimento cartão</label>
                            <input {...register('duoDate')} type="number" />
                            {errors?.duoDate?.message && (
                                <p className='error-text'>{errors?.duoDate?.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex  justify-center gap-10 mt-5">
                        <button type='submit' className='button-form'>Salvar</button>
                        <button onClick={props.onClose} className='button-form'>Fechar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ModalCard