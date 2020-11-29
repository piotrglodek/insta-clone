import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
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
import { loginSchema } from '../schema/loginSchema';
// Store
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsAuthenticated,
  loginUser,
  selectLoginError,
} from '../store/features/user/userSlice';

export const Login = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  // Firebase server error
  const loginError = useSelector(selectLoginError);

  // Form validation
  const { register, errors, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  // Redirect logged user to app
  if (isAuthenticated) {
    return <Redirect to={pathname.feed} />;
  }

  const onSubmit = data => {
    dispatch(loginUser(data));
    reset();
  };

  return (
    <PageTitle title='sign in'>
      <FormWrapper>
        <StyledLogo />
        <Form onSubmit={handleSubmit(onSubmit)}>
          {loginError && <FormError>{loginError}</FormError>}
          <TextField
            error={errors.loginEmail}
            name='email'
            label='E-mail'
            ref={register}
            type='email'
          />
          <TextField
            error={errors.loginPassword}
            name='password'
            label='Password'
            ref={register}
            type='password'
          />
          <SubmitButton value='Login' disabled={!formState.isValid} />
        </Form>
        <StyledText>
          Don't have an account? <FormLink to='/register'>Sign up</FormLink>
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
