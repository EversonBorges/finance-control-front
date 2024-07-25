import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import apiFetch from '../../../../../axios/config';
import UtilServices from '../../../../../utils/UtilServices';
import ModalCategory from '../../category/ModalCategory';
import { DocumentIcon } from "@heroicons/react/24/solid";
import { SummaryContext } from '../../../../../contexts/SummaryContext'
import SummaryService from '../../../service/SummaryService';
import { MonthDetailsContext } from '../../../../../contexts/MonthDetailsContext';

function ModalRevenues(props) {

    const {
        theme,
        categories,
        showModalCategory, 
        setShowModalCategory
    } = useContext(SummaryContext)
    const { setIsDataFetched } = useContext(MonthDetailsContext)

    const formMethods = useForm({  });
    const { formState: { errors }, register, handleSubmit, reset, setValue, watch } = formMethods;
    const [success, setSuccess] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    
    let disableClass = !isFormValid ? 'bg-gray-400' : "";
    const customStyles = SummaryService.getCustomStyle(theme)
   
    useEffect(() => {
        if (success) {
            executeReset()
            setSuccess(false);
        }

        if (props.isEdit) {
            setValueEdit();
        }
    }, [props.isEdit, success, reset]);

    useEffect(() => {
        const subscription = watch((values) => {
            setIsFormValid(validateForm(values));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    function setValueEdit() {
        if (props.edit) {
            setValue("id", props.edit.id);
            setValue("amount", props.edit.amount);
            setValue("receivingDate", formatDateForInput(props.edit.receivingDate));
            setValue("category", props.edit.category.id);
        }
    }

    function formatDateForInput(dateStr) {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    function validateForm(values) {
        return values.category && values.receivingDate && values.amount;
    }

    function executeReset() {
        reset({
            amount: "",
            receivingDate: "",
            category: ""
        });
    }

    const onSubmit = async (values) => {

        const request = {
            id: values.id,
            amount: values.amount,
            receivingDate: UtilServices.formatterDate(values.receivingDate),
            category: {
                id: values.category
            }
        };

        try {
            if (props.edit) {
                await apiFetch.put("revenues", request);
                props.showToast("Editado com sucesso!", "success");
            } else {
                await apiFetch.post("revenues", request);
                props.showToast("Adicionado com sucesso!", "success");
            }
            setSuccess(true);
            props.getRevenues();
            props.onClose();
            setIsDataFetched(false);
        } catch (error) {
            console.log(error);
            props.showToast(error.message, "error");
          }
    };

    const closeModal = () => {
        executeReset()
        props.onClose();
    };

    const openModalCategory = () => {
        setShowModalCategory(true);
    };

    return (
        <div>
            <Modal
                isOpen={props.show}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <h1>{props.edit ? "Editar receita" : "Adicionar nova receita"}</h1>
                    <input {...register('id')} type="hidden" />
                    <div className='block mb-2'>
                        <label htmlFor="category">Categoria</label>
                        <div className='flex flex-row items-center gap-3'>
                            <div>
                                <select {...register('category')} className="rounded-md">
                                    <option value="">Selecione</option>
                                    {categories.filter(opt => opt.active).map((opt) => (
                                        <option key={opt.id} value={opt.id}>{opt.description}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button type="button" onClick={openModalCategory}>
                                    <DocumentIcon className='h-5 sm:h-6  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-110' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-3'>
                        <div>
                            <label htmlFor="receivingDate">Data do Recebimento</label>
                            <input {...register('receivingDate')} type="date" />
                        </div>
                        <div>
                            <label htmlFor="amount">Valor</label>
                            <input {...register('amount')} type="text" onInput={UtilServices.mascaraMoeda} />
                        </div>
                    </div>
                    <div className="flex justify-center gap-10 mt-5">
                        <button type='submit' className={`button-form ${disableClass}`} disabled={!isFormValid}>Salvar</button>
                        <button type="button" className='button-form' onClick={closeModal}>Fechar</button>
                    </div>
                </form>
            </Modal>
            <ModalCategory
                show={showModalCategory}
                home={false}
                type={'R'}
            />
        </div>
    );
}

export default ModalRevenues;
