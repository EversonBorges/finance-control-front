import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import apiFetch from '../../../../axios/config';
import TableCreditCard from './TableCreditCard';
import CustomSwitch from '../../../../components/Switch';
import { SummaryContext } from '../../../../contexts/SummaryContext'
import { toast } from 'react-toastify';
import Toast from '../../../../components/Toast';
import SummaryService from '../../service/SummaryService';

function ModalCreditCard(props) {

    const { creditCards, setCreditCards, showModalCreditCard, setShowModalCreditCard, theme } = useContext(SummaryContext)
    const [creditCardUpdate, setCreditCardUpdate] = useState(null);
    const [checked, setChecked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        flag: '',
        dueDate: '',
        referenceDayPurchase: ''
    });
    const navigate = useNavigate();

    let disableClass = !isFormValid ? 'bg-gray-400' : "";
    const customStyles = SummaryService.getCustomStyle(theme)

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const getCreditCards = async () => {
        try {
            const response = await apiFetch.get("credit-card");
            setCreditCards(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCreditCards();
        setShowModalCreditCard(props.show)
    }, []);

    const closeModal = () => {
        resetForm();
        setCreditCardUpdate(null);
        setShowModalCreditCard(false);
        if (props.home) {
            navigate(`/`);
        }
    };

    const handleSwitchChange = (checked) => {
        setChecked(checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let request = {
            id: formData.id,
            name: formData.name,
            flag: formData.flag,
            dueDate: formData.dueDate,
            referenceDayPurchase: formData.referenceDayPurchase,
            active: checked
        };

        try {
            if (creditCardUpdate) {
                await apiFetch.put("credit-card", request);
                showToast("Atualizado com sucesso!", "success");
            } else {
                request.active = true
                await apiFetch.post("credit-card", request);
                showToast("Adicionado com sucesso!", "success");
            }
            resetForm();
            getCreditCards();
            setCreditCardUpdate(null);

            if (!props.home) {
                closeModal()
            }
        } catch (error) {
            console.log('Error submitting form:', error);
            showToast(error.message, "warn");
        }
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

    const onClick = (value) => {
        setCreditCardUpdate(value);
        setChecked(value.active);
        props.openModal();
    };

    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            flag: '',
            dueDate: '',
            referenceDayPurchase: ''
        })
    }

    function validateForm() {
        return formData.name && formData.flag && formData.dueDate > 0 && formData.referenceDayPurchase > 0;
    }

    useEffect(() => {
        if (creditCardUpdate) {
            setFormData({
                id: creditCardUpdate.id,
                name: creditCardUpdate.name,
                flag: creditCardUpdate.flag,
                dueDate: creditCardUpdate.dueDate,
                referenceDayPurchase: creditCardUpdate.referenceDayPurchase,
            });
            setChecked(creditCardUpdate.active);
        }
    }, [creditCardUpdate]);

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData, checked]);

    return (
        <div>
            <div>
                <Toast />
            </div>
            <Modal
                isOpen={showModalCreditCard}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit} className="form">
                    <h1>{creditCardUpdate ? "Editar cartão de crédito" : "Adicionar cartão de crédito"}</h1>

                    <input type="hidden" name="id" value={formData.id} />
                    <div className='gap-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>

                        <div className='w-full'>
                            <label htmlFor="name">Nome</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="flag">Bandeira</label>
                            <input
                                name="flag"
                                type="text"
                                value={formData.flag}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={`gap-2 flex  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${creditCardUpdate ? 3 : 2}`}>
                        <div className='w-full'>
                            <label htmlFor="dueDate">Dia compra</label>
                            <input
                                name="dueDate"
                                type="number"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="referenceDayPurchase">Vencimento</label>
                            <input
                                name="referenceDayPurchase"
                                type="number"
                                value={formData.referenceDayPurchase}
                                onChange={handleChange}
                            />
                        </div>
                        {creditCardUpdate && (
                            <div className='flex flex-col items-center'>
                                <label htmlFor="active">Ativo</label>
                                <CustomSwitch
                                    handleChange={handleSwitchChange}
                                    checked={checked}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center gap-10 mt-2">
                        <button type="submit" className={`button-form ${disableClass}`} disabled={!isFormValid}>Salvar</button>
                        <button type="button" onClick={closeModal} className="button-form">Fechar</button>
                    </div>

                </form>
                <div className='mt-2 border-t-2'>
                    <TableCreditCard creditCards={creditCards} onClick={onClick} />
                </div>
            </Modal>
        </div>
    );
}

export default ModalCreditCard;
