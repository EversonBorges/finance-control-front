import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const FormCardValidationSchema = yup.object({
    referenceDate: yup.date().required('Nome do cartão não pode ser vazio'),
    purchaseDescription: yup.string().required('Nome do cartão não pode ser vazio'),
    userCard: yup.string().required('Nome do cartão não pode ser vazio'),
    price: yup.string().required('Titular não pode ser vazio'),
    installments: yup.number().typeError('Limite do cartão não pode ser vazio')
                .positive('Limite do cartão deve ser um numero positivo'),
})

export const FormCardValidationResolver = yupResolver(FormCardValidationSchema)