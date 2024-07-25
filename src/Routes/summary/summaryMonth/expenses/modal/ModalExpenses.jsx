import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import apiFetch from '../../../../../axios/config';
import UtilServices from '../../../../../utils/UtilServices';
import ModalCategory from '../../category/ModalCategory';
import { CreditCardIcon, DocumentIcon } from "@heroicons/react/24/solid";
import ModalCreditCard from '../../creditCard/ModalCreditCard';
import { SummaryContext } from '../../../../../contexts/SummaryContext'
import SummaryService from '../../../service/SummaryService';
import { MonthDetailsContext } from '../../../../../contexts/MonthDetailsContext';

function ModalExpenses(props) {

    const formMethods = useForm({});
    const { creditCards, theme,categories, 
            showModalCreditCard, setShowModalCreditCard,
            showModalCategory, setShowModalCategory
        } = useContext(SummaryContext)
    const { setIsDataFetched } = useContext(MonthDetailsContext)

    const { formState: { errors }, register, handleSubmit, reset, setValue, watch } = formMethods;
    const [success, setSuccess] = useState(false);
    const [paymentsMethods, setPaymentsMethods] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    
    const [showCreditCard, setShowCreditCard] = useState(false)

    let disableClass = !isFormValid ? 'bg-gray-400' : "";
    const customStyles = SummaryService.getCustomStyle(theme)

    const paymentsMethodsUtil = UtilServices.createPaymentMethodsEnum()

    useEffect(() => {
        getPaymentMethods()
    }, []);

    function executeReset() {
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
            executeReset()
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

        const request = {
            id: values.id,
            establishment: values.establishment,
            quantityInstallments: values.quantityInstallments,
            valuesInstallment: values.valuesInstallment,
            transactionDate: UtilServices.formatterDate(values.transactionDate),
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
            setIsDataFetched(false);
        } catch (error) {
            console.log(error);
            props.showToast(error.message, "error");
        }
    };

    function getPaymentMethods(){
        setPaymentsMethods(paymentsMethodsUtil.getAllMethods())
    }

    const closeModal = () => {
        executeReset()
        props.onClose();
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
                                            {creditCards.filter(opt => opt.active).map((opt) => (
                                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <button type="button" onClick={openModalCreditCard}>
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
                show={showModalCategory}
                home={false}
                type={'E'}
            />
            <ModalCreditCard show={showModalCreditCard} home={false}/>
        </div>
    );
}

export default ModalExpenses;
