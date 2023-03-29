import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form'
import { FormCardValidationResolver } from '../validations/FormCardValidation';
import apiFetch from '../../../axios/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../../components/Toast';
import Select from 'react-select';
import UtilServices from '../../../utils/UtilServices';

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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

function ModalTransaction(props) {

    const theme = document.getElementsByClassName('dark').length === 1 ? '#1E2734' : '#B3B7BC'
    customStyles.content.background = theme
    const formMethods = useForm({ resolver: FormCardValidationResolver })
    const { formState: { errors }, register, handleSubmit, reset, formState, setValue } = formMethods
    const [selectedOption, setSelectedOption] = useState(null);

    function alterVAlue() {
        /*setValue("nameCard", props.edit ? props.edit.nameCard : "")
        setValue("owner", props.edit ? props.edit.owner : "")
        setValue("limitCard", props.edit ? props.edit.limitCard : "")
        setValue("bestDayBuy", props.edit ? props.edit.bestDayBuy : "")
        setValue("duoDate", props.edit ? props.edit.duoDate : "")*/
    }

    const onSubmit = (values) => {

        alert("Teste")

        console.log("Values ->", values);

        /*try {
            if (props.edit) {
                await apiFetch.put(`cards/${props.edit.id}`, values)
                toast.success("Editado com sucesso!");
                setTimeout(() => {
                    props.onClose()
                }, 4000);
            } else {
                await apiFetch.post("cards", values)
                toast.success("Adicionado com sucesso!");
            }
        } catch (error) {
            console.log(error);
        }*/
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
                    <h1>{props.edit ? "Editar transação" : "Adicionar nova transação"}</h1>
                    <label htmlFor="idCard"></label>
                    <input {...register('idCard')} type="hidden" value={props.id} />

                    <label htmlFor="userCard">Usuário cartão</label>
                    <select {...register('userCard')} className="w-full rounded-md">
                        <option value="">--Selecione um usuário do cartão--</option>
                        {
                            options.map((opt) => {
                               return <option value={opt.value}>{opt.label}</option>
                            })
                        }
                        
                    </select>
                    {errors?.userCard?.message && (
                        <p className='error-text'>{errors?.userCard?.message}</p>
                    )}

                    <label htmlFor="purchaseDescription">Descrição compra</label>
                    <input {...register('purchaseDescription')} type="text" />
                    {errors?.purchaseDescription?.message && (
                        <p className='error-text'>{errors?.purchaseDescription?.message}</p>
                    )}
                    <div className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <div>
                            <label htmlFor="referenceDate">Data compra</label>
                            <input {...register('referenceDate')} type="date"></input>
                            {errors?.referenceDate?.message && (
                                <p className='error-text'>{errors?.referenceDate?.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="price">Valor compra</label>
                            <input {...register('price')} type="text" onInput={UtilServices.mascaraMoeda} />
                            {errors?.price?.message && (
                                <p className='error-text'>{errors?.price?.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="installments">Parcelas</label>
                            <input {...register('installments')} type="number" />
                            {errors?.installments?.message && (
                                <p className='error-text'>{errors?.installments?.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex  justify-center gap-10 mt-5">
                        <button type='submit' className='button-form'>Salvar</button>
                        <button onClick={props.onClose} className='button-form'>Fechar</button>
                    </div>
                </form>
                <div className="absolute top-48 left-48">
                    <div>
                        <Toast />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalTransaction