import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

const font1 = '"Kaushan Script", "serif"';
const font2 = '"Roboto", "Open Sans", "sans-serif"';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D2123F',
      light: '#FD7426',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#203142',
      contrastText: '#FFFFFF',
    }
  },
  typography: {
    h1: {
      fontFamily: font2,
      fontSize: 48,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '70px',
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: 32,
        lineHeight: '46px',
      },
    },
    h2: {
      fontFamily: font2,
      fontSize: 40,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '58px',
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: 28,
        lineHeight: '41px',
      },
    },
    h4: {
      fontFamily: font1,
      fontSize: 30,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '44px',
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: 18,
        lineHeight: '26px',
      },
    },
    h6: {
      fontFamily: font1,
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 1.15,
    },
    subtitle1: {
      fontFamily: font2,
      fontSize: 12,
      lineHeight: '14px',
    },
    subtitle2: {
      fontFamily: font2,
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '14px',
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: font2,
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '19px',
    },
    body2: {
      fontFamily: font2,
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '16px',
    },
    button: {
      fontFamily: font2,
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '14px',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 8,
          padding: 12,
          minWidth: 100
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          paddingTop: 11,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 8,
          paddingRight: 0,
        },
      },
    },
  },
});

export default theme;
