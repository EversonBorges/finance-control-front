import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const FormCardValidationSchema = yup.object({
    nameCard: yup.string().required('Nome do cartão não pode ser vazio'),
    owner: yup.string().required('Titular não pode ser vazio'),
    limitCard: yup.number().typeError('Limite do cartão não pode ser vazio')
                .positive('Limite do cartão deve ser um numero positivo'),
    bestDayBuy: yup.number().typeError('Melhor dia de compra não pode ser vazio')
                .max('31', 'Melhor dia de compra não deve ser maior que 31')
                .positive('Melhor dia de compra deve ser um numero positivo'),
    duoDate: yup.number().typeError('Vencimento não pode ser vazio')
                .max('31', 'Vencimento não deve ser maior que 31')
                .positive('Vencimento deve ser um numero positivo'),
})

export const FormCardValidationResolver = yupResolver(FormCardValidationSchema)