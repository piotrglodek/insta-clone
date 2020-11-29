import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
// Router
import { pathname } from './';
// Components
import {
  PageTitle,
  FormWrapper,
  Form,
  FormLink,
  TextField,
  FormError,
  SubmitButton,
  Logo,
} from '../components';
// Hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../schema/registerSchema';
// Store
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsAuthenticated,
  registerUser,
  selectRegisterError,
} from '../store/features/user/userSlice';

export const Register = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  // Firebase server error
  const registerError = useSelector(selectRegisterError);

  // Form validation
  const { register, errors, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  // Redirect logged user to app
  if (isAuthenticated) {
    return <Redirect to={pathname.feed} />;
  }

  const onSubmit = data => {
    dispatch(registerUser(data));
    reset();
  };

  return (
    <PageTitle title='create account'>
      <FormWrapper>
        <StyledLogo />
        <Form onSubmit={handleSubmit(onSubmit)}>
          {registerError && <FormError>{registerError}</FormError>}
          <TextField
            error={errors.email}
            name='email'
            label='E-mail'
            ref={register}
            type='email'
          />
          <TextField
            error={errors.username}
            name='username'
            label='Username'
            ref={register}
            type='text'
          />
          <TextField
            error={errors.password}
            name='password'
            label='Password'
            ref={register}
            type='password'
          />
          <TextField
            error={errors.confirmPassword}
            name='confirmPassword'
            label='Confirm password'
            ref={register}
            type='password'
          />
          <SubmitButton value='Create account' disabled={!formState.isValid} />
        </Form>
        <StyledText>
          Have an account? <FormLink to='/login'>Log in</FormLink>
        </StyledText>
      </FormWrapper>
    </PageTitle>
  );
};

const StyledLogo = styled(Logo)`
  margin: 2rem 0;
  color: ${({ theme: { color } }) => color.black};
  text-align: center;
`;

const StyledText = styled.p`
  margin: 0;
  margin-top: 2rem;
  color: ${({ theme: { color } }) => color.darkGray};
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
`;
