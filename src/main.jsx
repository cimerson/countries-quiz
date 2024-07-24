import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { store } from './reduxToolkit/store.js'
import { Provider } from 'react-redux'

import App from './App.jsx'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

const customTheme = extendTheme({ config })

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ChakraProvider theme={customTheme}>
          <App />
        </ChakraProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
)
