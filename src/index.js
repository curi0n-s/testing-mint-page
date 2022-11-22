import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers'
import { chain, configureChains } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { INFURA_API_KEY } from "./config"

const { chains, provider } = configureChains(
  [chain.goerli, chain.polygon],
  [infuraProvider({ apiKey: INFURA_API_KEY })],
)

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,

  }
})

const client = createClient({
  autoConnect: true,
  provider,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <WagmiConfig client={client}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </WagmiConfig>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
