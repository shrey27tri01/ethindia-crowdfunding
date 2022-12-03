import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// var ethers = require('ethers');  
// var url = 'https://polygon-mumbai.infura.io/v3/2fc633a5df2141d68ac1bf7dbc620710';
// var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
// customHttpProvider.getBlockNumber().then((result) => {
//     console.log("Current block number: " + result);
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// // import React from 'react';
// import { StrictMode } from "react";
// import ReactDOM from 'react-dom';
// import './index.css';
// import {React} from 'react'
// import App from './App';
// // import reportWebVitals from './reportWebVitals';
// // import { Web3ReactProvider } from "@web3-react/core";
// // import { ethers } from "ethers";


// // const getLibrary = (provider) => {
// //   const library = new ethers.providers.Web3Provider(provider);
// //   library.pollingInterval = 8000; // frequency provider is polling
// //   return library;
// // };

// // const rootElement = document.getElementById("root");
// // ReactDOM.render(
// //   <StrictMode>
// //       <Web3ReactProvider getLibrary={getLibrary}>
// //         <App />
// //       </Web3ReactProvider>
// //   </StrictMode>,
// //   rootElement
// // );



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // // If you want to start measuring performance in your app, pass a function
// // // to log results (for example: reportWebVitals(console.log))
// // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();
