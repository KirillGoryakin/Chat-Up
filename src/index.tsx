import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './assets/css/index.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from 'store';

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'purple.500'
      }
    }
  },
  colors: {
    dark: {
      50: '#fbf0f2',
      100: '#dcd8d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#282626',
      900: '#150a0d',
    }
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>
);