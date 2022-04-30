import {createMuiTheme} from '@material-ui/core';
import palette from './palette';
import MuiButton from './muiButton'

export const themeOptions = {
  typography: {
    fontFamily: "Heebo, Sans-serif",
    allVariants: {color: '#435177'}
  },
  palette,
  overrides: {
    MuiButton,
  },
};

export const ltrTheme = createMuiTheme({direction: 'ltr', ...themeOptions});
export const rtlTheme = createMuiTheme({direction: 'rtl', ...themeOptions});
