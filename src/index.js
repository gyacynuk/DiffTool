import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@xstyled/styled-components'
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = {
    colors: {
      text: '#000',
      background: '#fff',
      primary: '#17A2B8',
      modes: {
        dark: {
          text: '#fff',
          background: '#000',
          primary: '#0cf',
        },
      },
    },
  }

ReactDOM.render(
    <ThemeProvider theme={theme}>
            <App />
    </ThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
