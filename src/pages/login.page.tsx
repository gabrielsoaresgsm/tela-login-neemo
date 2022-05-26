import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { createTheme, ThemeProvider  } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { ReactComponent as GoogleLogo } from '../assets/google.svg'; // Importar logo da google
import { ReactComponent as FacebookLogo } from '../assets/facebook.svg'; // Importar logo do facebook 
import styled from '@emotion/styled';

const theme = createTheme({
  palette: {
    laranja: {
      main: '#ff6f00',
      contrastText: '#fff',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    laranja: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    laranja?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    laranja: true;
  }
}

// Componente Link - Estilização
export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #ff6f00;
  &:hover {
    text-decoration: underline;
    color: #ff8f00;
  }
`;

// Componente Auth
export const OauthMuiLink = styled(MuiLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#ff6f00 ;
  border-radius: 1;
  padding: 0.6rem 0;
  column-gap: 1rem;
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color:#e2e2e2;
    color: #393e45;
    box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
  }
`;

/*

const { z } = require("zod");

// Validação de Login
const validacaoLogin = z.object({
  email: z.string()
  .nonempty('O e-mail é obrigatório')
  .email('E-mail inválido'),
  password: z.string()
    .nonempty('Senha requerida')
    .min(8, 'A senha deve ter mais de 8 caracteres')
    .max(32, 'A senha deve ter menos de 32 caracteres'),
  persistUser: literal(true).optional(),
});

*/

// Validação de Login
const validacaoLogin = object({
  email: string()
  .nonempty('O e-mail é obrigatório')
  .email('E-mail inválido'),
  password: string()
    .nonempty('Senha requerida')
    .min(8, 'A senha deve ter mais de 8 caracteres')
    .max(32, 'A senha deve ter menos de 32 caracteres'),
  persistUser: literal(true).optional(),
});

// Obter o tipo
type ILogin = TypeOf<typeof validacaoLogin>;

const PaginaLogin: FC = () => {
  // Valor padrão 
  const defaultValues: ILogin = {
    email: '',
    password: '',
  };

  // O objeto retornado de useForm Hook
  const methods = useForm<ILogin>({
    resolver: zodResolver(validacaoLogin),
    defaultValues,
  });

  // Enviar gerenciador
  const onSubmitHandler: SubmitHandler<ILogin> = (values: ILogin) => {
    console.log(values);
  };

  // Renderização
  return (
    <Container
      maxWidth={false}
      sx={{ height: '100vh' }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid
          item
          sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}
        >
          <FormProvider {...methods}>
            <Grid
              container
              sx={{
                boxShadow: { sm: '0px 0px 4px rgba(0, 0, 0, 0.35)' },
                py: '6rem',
                px: '1rem',
              }}
            >
              <Grid
                item
                container
                justifyContent='space-between'
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: '45rem' },
                  marginInline: 'auto',
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ borderRight: { sm: '1px solid #ddd' } }}
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    component='form'
                    noValidate
                    autoComplete='off'
                    sx={{ paddingRight: { sm: '3rem' } }}
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                  >
                    <Typography
                      variant='h6'
                      component='h1'
                      sx={{ textAlign: 'center', mb: '1.5rem' }}
                    >
                      Faça login na sua conta
                    </Typography>

                    <FormInput
                      label='Digite seu e-mail'
                      type='email'
                      name='email'
                      focused
                      required
                    />
                    <FormInput
                      type='password'
                      label='Senha'
                      name='password'
                      required
                      focused
                    />

                    <FormControlLabel
                      control={
                        <ThemeProvider theme={theme}>
                        <Checkbox
                          color='primary'
                          size='small'
                          aria-label='trust this device checkbox'
                          required
                          {...methods.register('persistUser')}
                        />
                        </ThemeProvider>
                      }
                      label={
                        <Typography
                          variant='body2'
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 400,
                            color: '#5e5b5d',
                          }}
                        >
                          Lembrar senha
                        </Typography>
                      }
                    />
                    <ThemeProvider theme={theme}>
                    <LoadingButton
                      loading={false}
                      color="laranja"
                      type='submit'
                      variant='contained'
                      sx={{
                        py: '0.8rem',
                        mt: 2,
                        width: '80%',
                        marginInline: 'auto',
                      }}
                    >
                      Login
                    </LoadingButton>
                    </ThemeProvider>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant='h6'
                    component='p'
                    sx={{
                      paddingLeft: { sm: '3rem' },
                      mb: '1.5rem',
                      textAlign: 'center',
                    }}
                  >
                    Faça login com
                  </Typography>
                  <Box
                    display='flex'
                    flexDirection='column'
                    sx={{ paddingLeft: { sm: '3rem' }, rowGap: '1rem' }}
                  >
                    <OauthMuiLink style={{ borderRadius: 50 }} href=''>
                      <GoogleLogo style={{ height: '2rem' }} />
                      Google
                    </OauthMuiLink>
                    <OauthMuiLink style={{ borderRadius: 50 }} href=''>
                      <FacebookLogo style={{ height: '2rem' }} />
                      Facebook
                    </OauthMuiLink>
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent='center'>
                <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                    Não possui conta?{' '}
                    <LinkItem to='/'>Inscreva-se</LinkItem>
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    Esqueceu sua{' '}
                    <LinkItem to='/'>senha?</LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaginaLogin;
