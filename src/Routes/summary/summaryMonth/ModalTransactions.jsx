import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import SummaryService from '../service/SummaryService';
import { SummaryContext } from '../../../contexts/SummaryContext';

function ModalTransactions(props) {

    const {theme} = useContext(SummaryContext)
    const [formData, setFormData] = useState({
        year: '',
        transaction: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShowModal(props.show)
        setIsFormValid(validateForm());
    }, [formData]);

    let disableClass = !isFormValid ? 'bg-gray-400' : "";
    const customStyles = SummaryService.getCustomStyle(theme)

    function validateForm() {
        return formData.year  > 0 && formData.transaction 
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        navigate(`/${formData.transaction}/${formData.year}`);
    };

    const closeModal = () => {
        setShowModal(false);
        navigate(`/`);
    };

    return (
        <div>
            <Modal
                isOpen={showModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit} className="form">
                    <h1>{"Transações"}</h1>
                    <div className='w-full'>
                        <label htmlFor="year">Ano referência</label>
                        <input
                            name="year"
                            type="number"
                            value={formData.year}
                            onChange={handleChange}
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="transaction">Selecione uma transação</label>
                        <div className="flex flex-col">
                            <label className="">
                                <input
                                    type="radio"
                                    name="transaction"
                                    value="revenues"
                                    className="radioInput"
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Receitas</span>
                            </label>
                            <label className="">
                                <input
                                    type="radio"
                                    name="transaction"
                                    value="expenses"
                                    className="radioInput"
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Despesas</span>
                            </label>
                            <label className="">
                                <input
                                    type="radio"
                                    name="transaction"
                                    value="investments"
                                    className="radioInput"
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Investimentos</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-center gap-5 mt-5">
                        <button type="submit" className={`button-form ${disableClass}`} disabled={!isFormValid}>Executar</button>
                        <button type="button" onClick={closeModal} className="button-form">Sair</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ModalTransactions;
