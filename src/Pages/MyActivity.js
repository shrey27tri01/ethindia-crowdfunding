import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SIDEBAR from '../components/sidebar';
import * as Moment from 'moment';



import { toHex, truncateAddress } from "./utils";


import {ethereum} from './config';




const MyActivity = ({navigation}) => {

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
    

    // for error popup and messages
    const [isError, setError ] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const handleCloseError = () => {setError(false);
        window.location.reload();
    }

    const date = (dt) => {
        // var x = Moment(dt).format('ddd')
        // console.log("---moment.parseZone---", Moment.parseZone(dt) ,"---day----", x , "----", dt);
        return Moment(dt).format('DD-MMM-YYYY');
      }
      const dateEvent = (dt) => {
        // var x = Moment(dt).format('ddd, MMM DD, LT') 
        // console.log("---moment.parseZone----", Moment.parseZone(dt) ,"---day---", x , "---", dt);
        return Moment(dt).format('ddd, MMM DD, LT');
      }
      const monthConversion = (dt) => {
        // var x = Moment(dt).format('ddd');
        // var y = Moment(dt)
        // console.log("---moment.parseZone---", Moment.parseZone(dt) ,"---day--", x , "---", dt);
        return Moment(dt).format('MMM');
      }
      const dateConversion = (dt) => {
        // var x = Moment(dt).format('ddd');
        // var y = Moment(dt)
        // console.log("----moment.parseZone---", Moment.parseZone(dt) ,"---day---", x , "----", dt);
        return Moment(dt).format('DD');
      }


    
    const [walletType , setWalletType] =useState("");

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);


    const disconnect = () => {
        refreshState();
        // deactivate();
      };

      const refreshState = () => {
        window.localStorage.setItem("provider", undefined);
        // setNetwork("");
        // setMessage("");
        // setSignature("");
        // setVerified(undefined);
      };


      const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
      };





    
    const connectWalletHandler1 = () => {
        setErrorMessage("");

        ethereum.request({ method: 'eth_requestAccounts' }).then(response => {
            console.log("response ", response[0]);
        })
    }

    const connectWalletHandler = (data) => {
     console.log("Conncetd wallet is ", data, connButtonText);
     // localStorage.setItem('provider', data));
     
     setWalletType(data);
     setShow1(false);
     if(data == "CoinBase")
     {
        if(connButtonText == "Connect Wallet")
        {
            console.log("1111");
            connectWalletHandlerCoinbase(data);
        }
        else
        {
            console.log("222");
            setOwner_wallet_address("");
            setConnButtonText('Connect Wallet')
            ethereum.close();
            disconnect();
        }

     }
     if(data == "MetaMask")
     {
        if(connButtonText == "Connect Wallet")
        {
            connectWalletHandlerMetamask(data);
        }
        else
        {
            // ethereum.close();
            disconnect();
            setOwner_wallet_address("");
            setConnButtonText('Connect Wallet')
        }
        
     }
     
    }

    const networks = {
  polygon: {
                chainId: `0x${Number(80001).toString(16)}`,
                chainName: "Polygon Mumbai",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18
                },
                rpcUrls: ["https://polygon-mumbai.infura.io/v3/2fc633a5df2141d68ac1bf7dbc620710"],
                blockExplorerUrls: ["https://polygonscan.com/"]
              },
  
};

    const handleNetworkSwitch = async (networkName) => {
        setErrorMessage();
        await changeNetwork({ networkName, setErrorMessage });
      };

  const changeNetwork = async ({ networkName, setError }) => {
      try {
        
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks[networkName]
            }
          ]
        });
      } catch (err) {
        console.log("----changeNetworkError----", err);
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
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks[networkName]
            }
          ]
        });
      } catch (err) {
        console.log("----changeNetworkError----", err);
        setErrorMessage(err.message);
        setError(true);
      }
    };

  

    const connectWalletHandlerCoinbase = async(data) => {
        const qwe =  await ethereum.request({ method: 'eth_requestAccounts' }).then(response => {
            setOwner_wallet_address(response[0])
            setConnButtonText('Disconnect Wallet');
            setProvider(data);
            handleNetworkSwitch('polygon');
        });

        

        
    }


    const connectWalletHandlerMetamask = (data) => {
        setErrorMessage("");
        setError(false);
        if (window.ethereum && window.ethereum.isMetaMask) {

            window.ethereum.request({ method: 'eth_requestAccounts'})
            .then(result => {
                // accountChangedHandler(result[0]);
                setConnButtonText('Disconnect Wallet');
                console.log("----wallet address connected---",result[0])
                setOwner_wallet_address(result[0])
                setProvider(data);
                handleNetworkSwitch1('polygon');
                
            })
            .catch(error => {
                setErrorMessage(error.message);
                setError(true);
            
            });
            

        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
            setError(true);
        }
        
    }


    const getData1 = async (userId, token) => {

        const res = await axios.get('http://localhost:3000/purchase');
        // const tempFinal = res.data;
        // console.log(res.data)
        setBuying(res.data)
        
        
       
    }


    






    




    useEffect(() => {
            const provider = window.localStorage.getItem("provider");
            if (provider) 
            {
                // activate(connectors[provider]);
                // setConnButtonText('Disconnect');

                // console.log("-----Active address-----", truncateAddress(account), "--------", provider);

                if(provider == "MetaMask")
                {
                    setWalletType(provider);
                    connectWalletHandlerMetamask(provider);
                }
                if(provider == "CoinBase")
                {
                    setWalletType(provider);
                    connectWalletHandlerCoinbase(provider);
                }
            }
            else
            {
                // activate(connectors.injected);
                setConnButtonText('Connect Wallet');
                console.log("-----not Active address-----", truncateAddress(owner_wallet_address), "-------");
            }


            if (!localStorage.getItem('user')) {
                // navigate('/', {user_id : });
                navigate('/login');
                window.location.reload(false);
            }
            else
            {
                // const provider = window.localStorage.getItem("provider");
                // setUserToken(localStorage.getItem('token'));
                let x = JSON.parse(localStorage.getItem('user'));
                setUserInfo(x);
                // alert(x.token);
                // getData(x.id, x.token);
                getData1(x.id, x.token);
            }
            
    }, [navigation]);



   

    
    
    return (
    <div id="main-wrapper" className="admin">

        <div className="header landing">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="navigation">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                   
                                </div>
                                <div className="signin-btn d-flex align-items-center">
                                    <div className="mx-2">Welcome {userInfo.name} ({truncateAddress(owner_wallet_address)   }) </div>

                                    { connButtonText == "Connect Wallet" ? 
                                    (
                                        <button className="btn btn-primary" onClick={()=>{setShow1(true)}}>{connButtonText}</button>
                                    ):(
                                        <button className="btn btn-primary" onClick={()=>{connectWalletHandler(walletType)}}>{connButtonText}</button>)
                                    }
                                    <div className="mx-2"><a class="btn btn-danger" href="/logout">Signout</a></div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <SIDEBAR/>

        <div className="content-body">
            <div className="container">
                <div className="row">
                    <h4 class="card-title mb-3">My Activity </h4>
                    {buying.length >0 ? (
                        <div class="card">
                            <div class="card-body">
                                <div class="all-notification">
                                    <div class="notification-list">
                                        <div class="lists">
                                            {buying.map ((item) =>{
                                                 return(
                                                    <a href="#" class="">
                                                        <div class="d-flex align-items-center">
                                                        {item.status == "Pending"? 
                                                            (
                                                                <span class="me-3 icon pending">
                                                                    <i class="bi bi-exclamation-triangle">
                                                                    </i>
                                                                </span>
                                                            ):null
                                                        }
                                                        {item.status == "Rejected"?
                                                            (
                                                                <span class="me-3 icon fail">
                                                                    <i class="bi bi-x">
                                                                    </i>
                                                                </span>
                                                            ):null
                                                        }
                                                        {item.status == "Approved"? 
                                                            (
                                                                <span
                                                                    class="me-3 icon success">
                                                                    <i class="bi bi-check">
                                                                    </i>
                                                                </span>
                                                            ):null
                                                        }
                                                            <div>
                                                                <h6 class="mb-0">{item.listing_title}</h6>
                                                                <p>Applied Amount : {item.supply_amount}</p>
                                                                <span>Created at : {dateEvent(item.created_at)}</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    )
                                                 })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):null}
                </div>
            </div>
        </div>


        
        
        <Modal show={show1} onHide={handleClose1} className="buy-popup">
        <Modal.Header closeButton>
          <Modal.Title>Select Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <button className="btn mt-2"  onClick={()=>{connectWalletHandler("MetaMask")}} ><span className='icons1'><img src="./images/mm.png" alt="" width="24" /> </span>Metamask</button>
            <button className="btn"  onClick={()=>{connectWalletHandler("CoinBase")}} ><span className='icons1'><img src="./images/cbw.png" alt="" width="24" /> </span>Coinbase Wallet</button>
            
        </Modal.Body>
      </Modal>
       
    </div>
    );
}

export default MyActivity;