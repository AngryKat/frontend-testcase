
import * as yup from 'yup';

const phoneRegEx = /^[+]?[0-9]*$/;

export const userSchema = yup.object().shape({
    name: yup.string().nullable().required('Name is required'),
    surname: yup.string().nullable().required('Surname is required'),
    country: yup.string().nullable().required('Country is required'),
    email: yup.string().nullable().email('Email is not valid').required('Email is required'),
    phoneNumber: yup.string().nullable().matches(phoneRegEx, 'Phone number is not valid').required('Phone number is required'),
});
