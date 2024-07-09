import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import apiFetch from '../../../../axios/config';
import TableCategory from './TableCategory';
import CustomSwitch from '../../../../components/Switch';

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

function ModalCategory(props) {
    const theme = document.getElementsByClassName('dark').length === 1 ? '#1E2734' : '#B3B7BC';
    customStyles.content.background = theme;

    const [category, setCategory] = useState([]);
    const [categoryUpdate, setCategoryUpdate] = useState(null);
    const [checked, setChecked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        description: '',
        classification: '',
    });

    let disableClass = !isFormValid ? 'bg-gray-400' : "";

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
            type: props.type,
            classification: formData.classification,
            active: checked ,
        };

        try {
            if (categoryUpdate) {
                await apiFetch.put("category", request);
                props.showToast("Atualizado com sucesso!", "success");
            } else {
                await apiFetch.post("category", request);
                props.showToast("Adicionado com sucesso!", "success");
            }
            resetForm();
            getCategories();
            setCategoryUpdate(null);
        } catch (error) {
            console.log('Error submitting form:', error);
            props.showToast(error.message, "warn");
        }
    };

    const getCategories = async () => {
        try {
            const response = await apiFetch.get(`category/${props.type}`);
            setCategory(response.data);
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    };

    const onClick = (value) => {
        setCategoryUpdate(value);
        setChecked(value.active);
        props.openModal();
    };

    const resetForm = () => {
        setFormData({
            id: '',
            description: '',
            classification: '',
        });
    };

    const closeModal = () => {
        resetForm();
        setCategoryUpdate(null);
        props.onCloseModalCategory();
    };

    function validateForm() {
        if (props.type === 'E') {
            return formData.description && formData.classification;
        } else {
            return formData.description;
        }
    }

    useEffect(() => {
        if (categoryUpdate) {
            setFormData({
                id: categoryUpdate.id,
                description: categoryUpdate.description,
                classification: categoryUpdate.classification,
            });
            setChecked(categoryUpdate.active);
        }
    }, [categoryUpdate]);

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData, checked]);

    return (
        <div>
            <Modal
                isOpen={props.showCategory}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit} className="form">
                    <h1>{categoryUpdate ? "Editar categoria" : "Adicionar Categoria"}</h1>

                    <input type="hidden" name="id" value={formData.id} />

                    <div className='flex gap-5'>
                        <div className='w-full'>
                            <label htmlFor="description">Descrição</label>
                            <input
                                name="description"
                                type="text"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        {props.type === 'E' && (
                            <div className='w-full'>
                                <label htmlFor="classification">Classificação</label>
                                <select
                                    name="classification"
                                    value={formData.classification}
                                    onChange={handleChange}
                                    className="rounded-md"
                                >
                                    <option value="">Selecione uma classificação</option>
                                    <option value='Essencial'>Essencial</option>
                                    <option value='Não Essencial'>Não Essencial</option>
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

                    <div className="flex justify-center gap-10 mt-5">
                        <button type="submit" className={`button-form ${disableClass}`} disabled={!isFormValid}>Salvar</button>
                        <button type="button" onClick={closeModal} className="button-form">Fechar</button>
                    </div>

                    <div className='mt-5 border-t-2'>
                        <TableCategory userCard={category} onClick={onClick} />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ModalCategory;
