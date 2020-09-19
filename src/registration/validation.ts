
import * as Yup from 'yup'
export const validationRules= Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'Min length: 2'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Min length: 2'),                
    email: Yup.string()
        .email('A valid emal address is required')
        .required('Email address is required'),
    gender: Yup.string()
        .required('Gender field is required'),
})

