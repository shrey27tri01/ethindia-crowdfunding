// TypeScript
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Web3 from 'web3'

// const APP_NAME = 'My Awesome App'
// const APP_LOGO_URL = 'https://example.com/logo.png'
// const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/<YOUR_INFURA_API_KEY>'https://polygon-mumbai.infura.io/v3/2fc633a5df2141d68ac1bf7dbc620710'
// const DEFAULT_CHAIN_ID = 1

const APP_NAME = 'ETHIndia22_Vayu'
const APP_LOGO_URL = 'https://virtualsfadmin.com/images/logo.png'
const DEFAULT_ETH_JSONRPC_URL = 'https://polygon-mumbai.infura.io/v3/2fc633a5df2141d68ac1bf7dbc620710'
// const DEFAULT_ETH_JSONRPC_URL = "https://matic-testnet-archive-rpc.bwarelabs.com"
//"wss://ropsten.infura.io/ws/v3/5cc230f95d9a4516ade3f0d1b89bd341"
//"https://ropsten.infura.io/v3/5cc230f95d9a4516ade3f0d1b89bd341"
//'https://polygon-mumbai.infura.io/v3/2fc633a5df2141d68ac1bf7dbc620710'
const DEFAULT_CHAIN_ID = 80001

// Initialize Coinbase Wallet SDK
export const coinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
  qrcode: true,
})

// Initialize a Web3 Provider object
export const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

// Initialize a Web3 object
export const web3 = new Web3(ethereum)