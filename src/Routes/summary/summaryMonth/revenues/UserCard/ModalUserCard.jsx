import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form'
import apiFetch from '../../../../../axios/config'
import TableUserCard from './TableUserCard';
import { FormUserCardValidationResolver } from './validations/FormUserCardValidation';
import Switch from '../../../../../components/Switch'

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

function ModalUserCard(props) {

    const theme = document.getElementsByClassName('dark').length === 1 ? '#1E2734' : '#B3B7BC'
    customStyles.content.background = theme
    const formMethods = useForm({ resolver: FormUserCardValidationResolver })
    const { formState: { errors }, register, handleSubmit, reset, setValue } = formMethods
    const [userCard, setUserCard] = useState([])
    const [userUpdate, setUserUpdate] = useState(null)
    const [checked, setChecked] = useState()

    const onSubmit = async (values) => {

        try {
            if (userUpdate) {
                setUserUpdate(null)
                values.active = checked
                await apiFetch.put("user-card", values)
                props.showToast("Atualizado com sucesso!", "success")
            } else {
                await apiFetch.post("user-card", values)
                props.showToast("Adicionado com sucesso!", "success")
            }
            reset( { nameUser: "" } );
            getUserCards()
        } catch (error) {
            console.log(error);
            error?.response?.data.map((obj) => {
                props.showToast(obj.message, "warn");
            })
        }
    };

    const getUserCards = async () => {
        try {
            const response = await apiFetch.get("user-card")
            const content = response.data
            setUserCard(content)
        } catch (error) {
            console.log(error);
        }
    }

    const onClick = (value) => {
        control()
        setUserUpdate(value.id && value)
    }

    const handleChange = (event) => {
        setChecked(event)
    }

    const control = () => {
        props.openModal()
    }

    useEffect(() => {
        setChecked(userUpdate?.active)
        setValueEdit()
    }, [userUpdate])

    useEffect(() => {
        getUserCards()
    }, [])

    const closeModal = () => {
        reset(
            { nameUser: "" }
        );
        setUserUpdate(null)
        props.onCloseModalUser()
    }

    function setValueEdit() {
        setValue("id", userUpdate && userUpdate.id)
        setValue("nameUser", userUpdate && userUpdate.nameUser)
        setValue("active", userUpdate && userUpdate.active)
    }

    return (
        <div>
            <Modal
                isOpen={props.showUserCard}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <h1>{userUpdate ? "Editar usuário cartão" : "Adicionar usuário cartão"}</h1>

                    <label htmlFor="id"></label>
                    <input {...register('id')} type="hidden" value={props.id} />

                    <div className='flex gap-5'>
                        <div className='w-full'>
                            <label htmlFor="nameUser">Nome usuário</label>
                            <input  {...register('nameUser')} type="text" />
                            {errors?.nameUser?.message && (
                                <p className='error-text'>{errors?.nameUser?.message}</p>
                            )}
                        </div>
                        <div>
                            {userUpdate &&
                                <div className='flex flex-col items-center'>
                                    <label htmlFor="active">Ativo</label>
                                    <Switch handleChange={handleChange} checked={checked} />
                                </div>
                            }
                        </div>
                    </div>

                    <div className="flex  justify-center gap-10 mt-5">
                        <button type='submit' className='button-form'>Salvar</button>
                        <button onClick={closeModal} className='button-form'>Fechar</button>
                    </div>

                    <div className=' mt-5 border-t-2'>
                        <TableUserCard userCard={userCard} onClick={onClick} />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ModalUserCard