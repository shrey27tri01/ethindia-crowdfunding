import { React, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import simple_token_abi from '../Contracts/simple_token_abi.json';
//import {Link} from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DemoToken_Abi from '../Contracts/simple_token_abi.json';
import DemoToken_Bytecode from '../Contracts/simpleTokenBytecode';

import DASHBOARDHEADER from '../components/dashboardHeader';
import SIDEBAR from '../components/sidebar';
import DASHBOARDCONTENT from '../components/dashboardContent';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { toHex, truncateAddress } from './utils';

import { ethereum } from './config';
import { PUBLIC_URL } from '../global';

const Notification = ({ navigation }) => {
  const navigate = useNavigate();

  const [user_Id, setUser_Id] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [listing, setListing] = useState([]);
  const [buying, setBuying] = useState([]);
  const [owner_wallet_address, setOwner_wallet_address] = useState('');
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  // for loading
  const [isDisplay, setIsDisplay] = useState(false);
  const [isDisplay2, setIsDisplay2] = useState(false);

  // for error popup and messages
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleCloseError = () => {
    setError(false);
    window.location.reload();
  };

  // requested supply
  const [total_supply, setTotal_supply] = useState('');

  // buyer details
  const [buyOwner, setBuyOwner] = useState('');
  const [buyId, setBuyId] = useState('');
  const [buyListingId, setBuyListingId] = useState('');
  const [buyContract, setBuyContract] = useState('');
  const [buyTotalSupply, setBuyTotalSupply] = useState('');

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const [walletType, setWalletType] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (owner, id, contractBuy, totalAmount) => {
    // console.log("----owner----", owner);
    // console.log("----id----", id);
    // console.log("----Contract----", contractBuy);
    // console.log("----listing_id----", listing_id);
    setBuyId(id);
    setBuyOwner(owner);
    setBuyContract(contractBuy);
    setBuyTotalSupply(totalAmount);
    setShow(true);

    // setBuyListingId(listing_id);
  };

  const disconnect = () => {
    refreshState();
    // deactivate();
  };

  const refreshState = () => {
    window.localStorage.setItem('provider', undefined);
    // setNetwork("");
    // setMessage("");
    // setSignature("");
    // setVerified(undefined);
  };

  const setProvider = (type) => {
    window.localStorage.setItem('provider', type);
  };

  const connectWalletHandler1 = () => {
    setErrorMessage('');

    ethereum.request({ method: 'eth_requestAccounts' }).then((response) => {
      console.log('response ', response[0]);
    });
  };

  const connectWalletHandler = (data) => {
    console.log('Conncetd wallet is ', data, connButtonText);
    // localStorage.setItem('provider', data));
    // setProvider(data);
    setWalletType(data);
    setShow1(false);
    if (data == 'CoinBase') {
      if (connButtonText == 'Connect Wallet') {
        console.log('1111');
        connectWalletHandlerCoinbase(data);
      } else {
        console.log('222');
        setOwner_wallet_address('');
        setConnButtonText('Connect Wallet');
        ethereum.close();
        disconnect();
      }
    }
    if (data == 'MetaMask') {
      if (connButtonText == 'Connect Wallet') {
        connectWalletHandlerMetamask(data);
      } else {
        // ethereum.close();
        disconnect();
        setOwner_wallet_address('');
        setConnButtonText('Connect Wallet');
      }
    }
  };
  const networks = {
    polygon: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: 'Polygon Mumbai',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: [
        'https://polygon-mumbai.infura.io/v3/2fc633a5df2141d68ac1bf7dbc620710',
      ],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
  };

  const handleNetworkSwitch = async (networkName) => {
    setErrorMessage();
    await changeNetwork({ networkName, setErrorMessage });
  };

  const changeNetwork = async ({ networkName, setError }) => {
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      console.log('----changeNetworkError----', err);
      setErrorMessage(err.message);
      setError(true);
    }
  };

  const handleNetworkSwitch1 = async (networkName) => {
    setErrorMessage();
    await changeNetwork1({ networkName, setErrorMessage });
  };

  const changeNetwork1 = async ({ networkName, setError }) => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      console.log('----changeNetworkError----', err);
      setErrorMessage(err.message);
      setError(true);
    }
  };

  const connectWalletHandlerCoinbase = async (data) => {
    const qwe = await ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((response) => {
        setOwner_wallet_address(response[0]);
        setConnButtonText('Disconnect Wallet');
        setProvider(data);
        handleNetworkSwitch('polygon');
      });
  };

  const connectWalletHandlerMetamask = (data) => {
    setErrorMessage('');
    setError(false);
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          // accountChangedHandler(result[0]);
          setConnButtonText('Disconnect Wallet');
          console.log('----wallet address connected---', result[0]);
          setOwner_wallet_address(result[0]);
          setProvider(data);
          handleNetworkSwitch1('polygon');
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setError(true);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
      setError(true);
    }
  };

  const getData1 = async (userId, token) => {
    const res = await axios.get(`${PUBLIC_URL}/purchase`);
    // const tempFinal = res.data;
    // console.log(res.data)
    var tempFinal = [];
    res.data.map((t) => {
      if (t.status == 'Pending') {
        setIsDisplay(true);
        tempFinal.push(t);
      }
    });
    setBuying(tempFinal);
  };

  useEffect(() => {
    const provider = window.localStorage.getItem('provider');
    if (provider) {
      // activate(connectors[provider]);
      // setConnButtonText('Disconnect');

      // console.log("-----Active address-----", truncateAddress(account), "--------", provider);

      if (provider == 'MetaMask') {
        setWalletType(provider);
        connectWalletHandlerMetamask();
      }
      if (provider == 'CoinBase') {
        setWalletType(provider);
        connectWalletHandlerCoinbase();
      }
    } else {
      // activate(connectors.injected);
      setConnButtonText('Connect Wallet');
      console.log(
        '-----not Active address-----',
        truncateAddress(owner_wallet_address),
        '-------'
      );
    }

    if (!localStorage.getItem('user')) {
      // navigate('/', {user_id : });
      navigate('/login');
    } else {
      // const provider = window.localStorage.getItem("provider");
      // setUserToken(localStorage.getItem('token'));
      let x = JSON.parse(localStorage.getItem('user'));
      setUserInfo(x);
      // alert(x.token);
      // getData(x.id, x.token);
      if (x.isAdmin) {
        setIsDisplay2(true);
        console.log('----------isAdmin-------');
        getData1(x.id, x.token);
      }
      //
    }
  }, [navigation]);

  const statusChange = async (id, listing_id, status, supply) => {
    const res = await axios.get(`${PUBLIC_URL}/purchase`);
    var temp = res.data;
    var finalTemp = {};

    temp.map((t) => {
      if (t.id == id) {
        finalTemp = {
          buyer_wallet_address: t.buyer_wallet_address,
          owner_wallet_address: t.owner_wallet_address,
          supply_amount: t.supply_amount,
          listing_id: t.listing_id,
          contract_address: t.contractAddress,
          status: status,
        };
      }
    });

    const res1 = await axios.put(`${PUBLIC_URL}/purchase/${id}`, finalTemp);
    console.log(res1.data);

    if (status == 'Rejected') {
      // alert("Rejected Successfully");
      setErrorMessage('Rejected Successfully');
      setError(true);
    } else {
      // alert("Transferred Successfully");
      setErrorMessage('Transferred Successfully');
      setError(true);
    }

    if (status == 'Rejected') {
      const res = await axios.get(`${PUBLIC_URL}/listings`);
      var temp = res.data;
      var finalTemp = {};

      temp.map((t) => {
        if (t.id == listing_id) {
          finalTemp = {
            title: t.title,
            address: 'try',
            owner_wallet_address: t.owner_wallet_address,
            available_supply: parseInt(t.available_supply) + parseInt(supply),
            total_supply: t.total_supply,
            contract_address: t.contract_address,
            property_image: t.property_image,
            total_property_value: t.total_property_value,
            // "id": t.id
          };
        }
      });

      const res1 = await axios.put(
        `${PUBLIC_URL}/listings/${listing_id}`,
        finalTemp
      );
      console.log(res1.data);
    }
  };

  const transferHandle = async (contractAddress, supply, buyer, item) => {
    // console.log("------object-----", object);
    console.log(
      '=====',
      contractAddress,
      '-----',
      supply,
      '------buyer---',
      buyer
    );
    if (owner_wallet_address == '') {
      console.log('Need to connect wallet');
      setErrorMessage('Need to connect wallet');
      // alert("Connect wallet First");
      // setErrorMessage("Connect wallet First");
      setError(true);
      // setLoading(false);
      return;
    }
    if (owner_wallet_address != item.owner_wallet_address) {
      setErrorMessage(
        'Need to connect ' + truncateAddress(owner_wallet_address) + ' wallet'
      );
      // alert("Connect wallet First");
      // setErrorMessage("Connect wallet First");
      setError(true);
      return;
    }
    try {
      var x = supply + '000000000000000000';
      if (walletType == 'MetaMask') {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        let tempSigner = tempProvider.getSigner();

        let tempContract = new ethers.Contract(
          contractAddress,
          DemoToken_Abi,
          tempSigner
        );
        console.log('-----transfer metamask');
        let temp = await tempContract.transfer(buyer, x);
        console.log('-----temp----', temp);

        statusChange(item.id, item.listing_id, 'Approved', supply);
      }
      if (walletType == 'CoinBase') {
        let tempProvider = new ethers.providers.Web3Provider(ethereum);
        let tempSigner = tempProvider.getSigner();

        let tempContract = new ethers.Contract(
          contractAddress,
          DemoToken_Abi,
          tempSigner
        );
        console.log('-----transfer coinbase');
        let temp = await tempContract.transfer(buyer, x);
        console.log('-----temp----', temp);

        statusChange(item.id, item.listing_id, 'Approved', supply);
      }
      //for metamask
      // let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      // let tempSigner = tempProvider.getSigner();
    } catch (err) {
      console.log('--------err-----', err);
      // setLoading(false);
    }
  };

  return (
    <div id="main-wrapper" className="admin">
      <div className="header landing">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="navigation">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  ></div>
                  <div className="signin-btn d-flex align-items-center">
                    <div className="mx-2">
                      Welcome {userInfo.name} (
                      {truncateAddress(owner_wallet_address)}){' '}
                    </div>

                    {connButtonText == 'Connect Wallet' ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setShow1(true);
                        }}
                      >
                        {connButtonText}
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          connectWalletHandler(walletType);
                        }}
                      >
                        {connButtonText}
                      </button>
                    )}
                    <div className="mx-2">
                      <a class="btn btn-danger" href="/logout">
                        Signout
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SIDEBAR />

      <div className="content-body">
        <div className="container">
          {isDisplay ? (
            <div>
              <h4 className="card-title mb-3">Notification</h4>
              {buying.map((item) => {
                return (
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="me-3 icon-circle bg-warning text-white">
                          <i className="ri-question-answer-line"></i>
                        </span>
                        <div>
                          <h4 className="card-title mb-3">
                            {item.listing_title}
                          </h4>
                          <p>Buyer name : {item.buyer_name}</p>
                          <p>
                            Number of token requested : {item.supply_amount}
                          </p>
                          <button
                            onClick={() => {
                              transferHandle(
                                item.contract_address,
                                item.supply_amount,
                                item.buyer_wallet_address,
                                item
                              );
                            }}
                            className="btn btn-primary"
                          >
                            Transfer Now
                          </button>

                          <button
                            class="btn btn-danger"
                            onClick={() => {
                              statusChange(
                                item.id,
                                item.listing_id,
                                'Rejected',
                                item.supply_amount
                              );
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card p-4">
              <h4 className="card-title mb-3">No Notifications</h4>
            </div>
          )}
        </div>
      </div>

      <Modal show={isError} onHide={handleCloseError} className="buy-popup">
        <Modal.Body>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <h5 className="mb-0"> {errorMessage} </h5>
          <p></p>
          <p></p>
          <p></p>

          <button
            onClick={() => {
              setError(false);
              window.location.reload();
            }}
            className="btn btn-primary  text-white"
          >
            Ok
          </button>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </Modal.Body>
      </Modal>

      <Modal show={show1} onHide={handleClose1} className="buy-popup">
        <Modal.Header closeButton>
          <Modal.Title>Select Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button
            className="btn mt-2"
            onClick={() => {
              connectWalletHandler('MetaMask');
            }}
          >
            <span className="icons1">
              <img src="./images/mm.png" alt="" width="24" />{' '}
            </span>
            Metamask
          </button>
          <button
            className="btn"
            onClick={() => {
              connectWalletHandler('CoinBase');
            }}
          >
            <span className="icons1">
              <img src="./images/cbw.png" alt="" width="24" />{' '}
            </span>
            Coinbase Wallet
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Notification;
