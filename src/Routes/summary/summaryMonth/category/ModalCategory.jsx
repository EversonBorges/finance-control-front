import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import apiFetch from '../../../../axios/config';
import TableCategory from './TableCategory';
import CustomSwitch from '../../../../components/Switch';
import { SummaryContext } from '../../../../contexts/SummaryContext'
import { toast } from 'react-toastify';
import Toast from '../../../../components/Toast';
import SummaryService from '../../service/SummaryService';

function ModalCategory(props) {

    const { categories, setCategories, showModalCategory, setShowModalCategory, theme } = useContext(SummaryContext)
    const [categoryUpdate, setCategoryUpdate] = useState(null);
    const [checked, setChecked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        description: '',
        classification: '',
        type: ''
    });
    const navigate = useNavigate();

    let disableClass = !isFormValid ? 'bg-gray-400' : "";
    const customStyles = SummaryService.getCustomStyle(theme)

    const getCategories = async () => {
        try {
            var url = props.home ? `category` : `category/${props.type}`
            const response = await apiFetch.get(url);
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
        setShowModalCategory(props.show)
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSwitchChange = (checked) => {
        setChecked(checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let request = {
            id: formData.id,
            description: formData.description,
            type: props.home ? formData.type : props.type,
            classification: formData.classification,
            active: checked,
        };

        if(props.home && formData.type !== 'E'){
            request.classification = ''
        }
        
        try {
            if (categoryUpdate) {
                await apiFetch.put("category", request);
                showToast("Atualizado com sucesso!", "success");
            } else {
                request.active = true
                await apiFetch.post("category", request);
                showToast("Adicionado com sucesso!", "success");
            }
            resetForm();
            getCategories();
            setCategoryUpdate(null);
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
        resetForm()
        setCategoryUpdate(value);
        setChecked(value.active);
        props.openModal();
    };

    const resetForm = () => {
        setFormData({
            id: '',
            description: '',
            classification: '',
            type:''
        });
    };

    const closeModal = () => {
        resetForm();
        setCategoryUpdate(null);
        setShowModalCategory(false);
        if (props.home) {
            navigate(`/`);
        }
    };

    function validateForm() {
        if(props.home){
            if(formData.type === 'E'){
                return formData.description && formData.type && formData.classification
            }

            return formData.description && formData.type 
        }

        if (props.type === 'E') {
            return formData.description && formData.classification;
        } 
        
        return formData.description;
    }

    useEffect(() => {
        if (categoryUpdate) {
            setFormData({
                id: categoryUpdate.id,
                description: categoryUpdate.description,
                classification: categoryUpdate.classification,
                type:categoryUpdate.type
            });
            setChecked(categoryUpdate.active);
        }
    }, [categoryUpdate]);

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData, checked]);

    return (
        <div>
            <div>
                <Toast />
            </div>
            <Modal
                isOpen={showModalCategory}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit} className="form">
                    <h1>{categoryUpdate ? "Editar categoria" : "Adicionar Categoria"}</h1>

                    <input type="hidden" name="id" value={formData.id} />
                        <div className={`gap-2 flex sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${props.type === 'E' ? 2: 1}`}>
                            <div className='w-full'>
                                <label htmlFor="description">Descrição</label>
                                <input
                                    name="description"
                                    type="text"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            {(props.home || props.type === 'E') && (
                                <div className='w-full'>
                                    <label htmlFor="classification">Classificação</label>
                                    <select
                                        name="classification"
                                        value={formData.classification}
                                        onChange={handleChange}
                                        className="rounded-md w-full"
                                    >
                                        <option value="">Selecione</option>
                                        <option value='Essencial'>Essencial</option>
                                        <option value='Não Essencial'>Não Essencial</option>
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className='gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex justify-center items-center'>
                        {props.home && (
                            <div className='w-full'>
                                <label htmlFor="type">Tipo</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="rounded-md w-full"
                                >
                                    <option value="">Selecione</option>
                                    <option value='I'>Investimento</option>
                                    <option value='E'>Despesa</option>
                                    <option value='R'>Receita</option>
                                </select>
                            </div>
                        )}
                        {categoryUpdate && (
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
                        <TableCategory categories={categories} onClick={onClick} />
                    </div>
            </Modal>
        </div>
    );
}

export default ModalCategory;
