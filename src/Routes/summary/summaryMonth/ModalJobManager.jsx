import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import SummaryService from '../service/SummaryService';
import { SummaryContext } from '../../../contexts/SummaryContext';
import apiFetch from '../../../axios/config';
import Toast from '../../../components/Toast';
import { toast } from 'react-toastify';
import { usePreviousRoute } from '../../../contexts/PreviousRouteContext';
import { MonthDetailsContext } from '../../../contexts/MonthDetailsContext';

function ModalJobManager(props) {

    const { theme } = useContext(SummaryContext)
    const [formData, setFormData] = useState({
        year: '',
        month: ''
    });
    const { setIsDataFetched } = useContext(MonthDetailsContext)
    const [isFormValid, setIsFormValid] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { previousRoute } = usePreviousRoute();

    useEffect(() => {
        setShowModal(props.show)
        setIsFormValid(validateForm());
    }, [formData]);

    let disableClass = !isFormValid ? 'bg-gray-400' : "";
    const customStyles = SummaryService.getCustomStyle(theme)

    function validateForm() {
        return formData.year > 0 && formData.month
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await apiFetch.put(`job-manager?year=${formData.year}&month=${formData.month}`);
            response.status === 200 ? showToast(response.data, "success") : showToast(response.data, "warn");
            setIsDataFetched(false);
            closeModal;
        } catch (error) {
            console.log(error);
            showToast(error.message, "error");
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

    const closeModal = () => {
        setShowModal(false);
        if (previousRoute) {
            navigate(previousRoute);
          }
    };

    return (
        <div>
            <div>
                <Toast />
            </div>
            <Modal
                isOpen={showModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit} className="form">
                    <h1>{"Executar Job"}</h1>
                    <div className='w-full'>
                        <label htmlFor="month">Mês</label>
                        <input
                            name="month"
                            type="number"
                            value={formData.month}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="year">Ano</label>
                        <input
                            name="year"
                            type="number"
                            value={formData.year}
                            onChange={handleChange}
                        />
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

export default ModalJobManager;
