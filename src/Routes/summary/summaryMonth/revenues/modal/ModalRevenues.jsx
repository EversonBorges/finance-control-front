import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import apiFetch from '../../../../../axios/config';
import UtilServices from '../../../../../utils/UtilServices';
import { toast } from 'react-toastify';
import ModalCategory from '../../category/ModalCategory';
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '20px',
        background: '',
    },
};

function ModalRevenues(props) {
    const theme = document.getElementsByClassName('dark').length === 1 ? '#1E2734' : '#B3B7BC';
    customStyles.content.background = theme;

    const formMethods = useForm({  });
    const { formState: { errors }, register, handleSubmit, reset, setValue, watch } = formMethods;
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showCategory, setShowUserCard] = useState(false);

    let disableClass = !isFormValid ? 'bg-gray-400' : "";

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (success) {
            reset({
                amount: "",
                receivingDate: "",
                description: ""
            });
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

    const onSubmit = async (values) => {
        values.receivingDate = new Date(values.receivingDate).toLocaleDateString('pt-BR');

        const request = {
            id: values.id,
            amount: values.amount,
            receivingDate: values.receivingDate,
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
        } catch (error) {
            console.log(error);
            if (error?.response?.data) {
                error.response.data.forEach((obj) => {
                    props.showToast(obj.message, "warn");
                });
            }
        }
    };

    const getCategories = async () => {
        try {
            const response = await apiFetch.get("category/R");
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        reset({
            amount: "",
            receivingDate: "",
            category: ""
        });
        props.onClose();
    };

    const showToast = (params, type) => {
        switch (type) {
            case "success":
                toast.success(params);
                break;
            case "warn":
                toast.warn(params);
                break;
        }
    };

    const onClickModalUser = () => {
        setShowUserCard(true);
    };

    const onCloseModalCategory = () => {
        setShowUserCard(false);
        getCategories();
    };

    const openModal = () => {
        setShowUserCard(true);
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
                                    <option value="">Selecione uma categoria</option>
                                    {categories.map((opt) => (
                                        <option key={opt.id} value={opt.id}>{opt.description}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="error-text">{errors.category.message}</p>}
                            </div>
                            <div>
                                <button type="button" onClick={onClickModalUser}>
                                    <PlusCircleIcon className='h-5 sm:h-8  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-110' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-3'>
                        <div>
                            <label htmlFor="receivingDate">Data do Recebimento</label>
                            <input {...register('receivingDate')} type="date" />
                            {errors.receivingDate && <p className="error-text">{errors.receivingDate.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="amount">Valor</label>
                            <input {...register('amount')} type="text" onInput={UtilServices.mascaraMoeda} />
                            {errors.amount && <p className="error-text">{errors.amount.message}</p>}
                        </div>
                    </div>
                    <div className="flex justify-center gap-10 mt-5">
                        <button type='submit' className={`button-form ${disableClass}`} disabled={!isFormValid}>Salvar</button>
                        <button type="button" className='button-form' onClick={closeModal}>Fechar</button>
                    </div>
                </form>
            </Modal>
            <ModalCategory
                onCloseModalCategory={onCloseModalCategory}
                showCategory={showCategory}
                getCategories={getCategories}
                categories={categories}
                showToast={showToast}
                openModal={openModal}
                type={'R'}
            />
        </div>
    );
}

export default ModalRevenues;
