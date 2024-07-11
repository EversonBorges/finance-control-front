import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import apiFetch from '../../../../../axios/config';
import UtilServices from '../../../../../utils/UtilServices';
import { toast } from 'react-toastify';
import ModalCategory from '../../category/ModalCategory';
import { PlusCircleIcon, CreditCardIcon, DocumentIcon } from "@heroicons/react/24/solid";
import ModalCreditCard from '../../creditCard/ModalCreditCard';

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

function ModalExpenses(props) {
    const theme = document.getElementsByClassName('dark').length === 1 ? '#1E2734' : '#B3B7BC';
    customStyles.content.background = theme;

    const formMethods = useForm({});
    const { formState: { errors }, register, handleSubmit, reset, setValue, watch } = formMethods;
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [paymentsMethods, setPaymentsMethods] = useState([]);
    const [creditCards, setCreditCards] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showModalCategory, setShowModalCategory] = useState(false);
    const [showModalCreditCard, setShowModalCreditCard] = useState(false);
    const [showCreditCard, setShowCreditCard] = useState(false)

    let disableClass = !isFormValid ? 'bg-gray-400' : "";

    const paymentsMethodsUtil = UtilServices.createPaymentMethodsEnum()

    useEffect(() => {
        getCategories()
        getPaymentMethods()
        getCreditCards()
    }, []);

    function getReset() {
        return reset({
            establishment: "",
            quantityInstallments: 0,
            valuesInstallment: "",
            transactionDate: "",
            paymentMethods: "",
            category: "",
            creditCard:""
        });
    }

    useEffect(() => {
        if (success) {
            getReset()
            setSuccess(false);
        }

        if (props.isEdit) {
            setValueEdit();
        }
    }, [props.isEdit, success, reset]);

    useEffect(() => {
        const subscription = watch((values) => {
            values.paymentMethods === 'CRT'? setShowCreditCard(true) : setShowCreditCard(false)
                
            setIsFormValid(validateForm(values));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    function setValueEdit() {

        if (props.edit) {
            setValue("id", props.edit.id);
            setValue("establishment", props.edit.establishment);
            setValue("quantityInstallments", props.edit.quantityInstallments);
            setValue("valuesInstallment", props.edit.valuesInstallment);
            setValue("transactionDate", formatDateForInput(props.edit.transactionDate));
            setValue("paymentMethods", paymentsMethodsUtil.getKeyByDescription(props.edit.paymentMethods));
            setValue("creditCard", props.edit.creditCard?.id);
            setValue("category", props.edit.category.id);
        }
    }

    function formatDateForInput(dateStr) {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    function validateForm(values) {

        return (values.establishment &&
            values.quantityInstallments  > 0 &&
            values.valuesInstallment &&
            values.transactionDate &&
            values.paymentMethods &&
            values.category) &&
            !(values.paymentMethods === 'CRT' && !values.creditCard)
    }

    const onSubmit = async (values) => {
        values.transactionDate = new Date(values.transactionDate).toLocaleDateString('pt-BR');

        const request = {
            id: values.id,
            establishment: values.establishment,
            quantityInstallments: values.quantityInstallments,
            valuesInstallment: values.valuesInstallment,
            transactionDate: values.transactionDate,
            paymentMethods: values.paymentMethods,
            category: {
                id: values.category
            }
        };

        if(showCreditCard){
            request.creditCard = {
                id: values.creditCard
            }
        }

        try {
            if (props.edit) {
                await apiFetch.put("expense", request);
                props.showToast("Editado com sucesso!", "success");
            } else {
                await apiFetch.post("expense", request);
                props.showToast("Adicionado com sucesso!", "success");
            }
            setSuccess(true);
            props.getExpenses();
            props.onClose();
        } catch (error) {
            console.log(error);
            props.showToast(error.message, "error");
        }
    };

    function getPaymentMethods(){
        setPaymentsMethods(paymentsMethodsUtil.getAllMethods())
    }

    const getCategories = async () => {
        try {
            const response = await apiFetch.get("category/E");
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCreditCards = async () => {
        try {
            const response = await apiFetch.get("credit-card");
            setCreditCards(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        getReset()
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

    const onClickModalCategory = () => {
        setShowModalCategory(true);
    };

    const onClickModalCreditCard = () => {
        setShowModalCreditCard(true);
    };

    const onCloseModalCategory = () => {
        setShowModalCategory(false);
        getCategories();
    };

    const onCloseModalCreditCard = () => {
        setShowModalCreditCard(false);
        getCategories();
    };

    const openModalCategory = () => {
        setShowModalCategory(true);
    };

    const openModalCreditCard = () => {
        setShowModalCreditCard(true);
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
                    <h1>{props.edit ? "Editar receita" : "Adicionar nova despesa"}</h1>
                    <input {...register('id')} type="hidden" />
                    <div className='gap-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <div>
                            <label htmlFor="transactionDate">Data</label>
                            <input {...register('transactionDate')} type="date" />
                        </div>
                        <div>
                            <label htmlFor="establishment">Estabelecimento</label>
                            <input {...register('establishment')} type="text" />
                        </div>
                        <div>
                            <label htmlFor="category">Categoria</label>
                            <div className='flex flex-row items-center gap-1'>
                                <div>
                                    <select {...register('category')} className="rounded-md">
                                        <option value="">Selecione </option>
                                        {categories.map((opt) => (
                                            <option key={opt.id} value={opt.id}>{opt.description}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <button type="button" onClick={onClickModalCategory}>
                                        <DocumentIcon className='h-5 sm:h-6  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-110' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`gap-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${showCreditCard? 4 : 3}`}>
                        <div className='w-full'>
                            <label htmlFor="paymentMethods">Método pagamento</label>
                            <select {...register('paymentMethods')} className="rounded-md w-full">
                                <option value="">Selecione</option>
                                {paymentsMethods.map((opt) => (
                                    <option key={opt.id} value={opt.id}>{opt.description}</option>
                                ))}
                            </select>
                        </div>
                        {showCreditCard && 
                            <div>
                                <label htmlFor="creditCard">Cartão de crédito</label>
                                <div className='flex flex-row items-center gap-1'>
                                    <div className='w-full'>
                                        <select {...register('creditCard')} className="w-full rounded-md">
                                            <option value="">Selecione</option>
                                            {creditCards.map((opt) => (
                                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <button type="button" onClick={onClickModalCreditCard}>
                                            <CreditCardIcon className='h-5 sm:h-6  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-110' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className=''>
                            <label htmlFor="quantityInstallments">Parcelas</label>
                            <input {...register('quantityInstallments')} type="number" />
                        </div>
                        <div className=''>
                            <label htmlFor="valuesInstallment">Valor</label>
                            <input {...register('valuesInstallment')} type="text" onInput={UtilServices.mascaraMoeda} />
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
                showCategory={showModalCategory}
                getCategories={getCategories}
                categories={categories}
                showToast={showToast}
                openModal={openModalCategory}
                type={'E'}
            />
            <ModalCreditCard
            //todo alterar as propriedades  abaixo que estão com nome de category
                onCloseModalCategory={onCloseModalCreditCard}
                showCategory={showModalCreditCard}
                getCategories={getCategories}
                categories={categories}
                showToast={showToast}
                openModal={openModalCreditCard}
                type={'E'}
            />
        </div>
    );
}

export default ModalExpenses;
