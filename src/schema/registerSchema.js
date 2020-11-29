import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('email must be valid!')
    .required('email is required!'),
  username: yup
    .string()
    .required('username is required!')
    .min(1, 'too short!')
    .max(25, 'too long!'),
  password: yup
    .string()
    .required('password is required!')
    .min(5, 'password must be at least 5 characters!'),
  confirmPassword: yup
    .string()
    .required('confirm password is required!')
    .oneOf([yup.ref('password'), null], 'passwords must match!'),
});
