import { createMuiTheme } from '@material-ui/core/styles';

const myTheme = createMuiTheme({
  typography: {
    fontFamily: ['"Comic Sans MS"', 'cursive', 'sans-serif'].join(','),
    htmlFontSize: 10,
  },
});

export default myTheme;
