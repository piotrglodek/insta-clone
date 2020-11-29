import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('email must be valid!')
    .required('email is required!'),
  password: yup.string().required('password is required!'),
});
