import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const FormUserCardValidationSchema = yup.object({
    nameUser: yup.string().required('Nome usuário cartão não pode ser vazio'),
})

export const FormUserCardValidationResolver = yupResolver(FormUserCardValidationSchema)