import getMuiTheme from 'material-ui/styles/getMuiTheme';

const primaryColor = '#3359DF';

export default getMuiTheme({
  appBar: {
    color: primaryColor,
    padding: 30,
    height: 45,
  },
  palette: {
    primary1Color: primaryColor,
  },
  datePicker: {
    selectColor: primaryColor,
  },
});
