import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
const theme = createTheme({
  palette: {
    primary: {
      main: '#a81d34',
    },
    secondary: {
      main: '#0f112e',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <App />
  </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);