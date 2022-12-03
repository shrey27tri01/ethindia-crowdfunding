import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ActivityIndicator from 'react-activity-indicator';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import SIDEBAR from '../components/sidebar';
// import { PieChart } from 'react-minimal-pie-chart';



import { toHex, truncateAddress } from "./utils";


import {ethereum} from './config';




const Item = ({navigation}) => {

    const navigate = useNavigate();


    
    const [user_Id, setUser_Id] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState('');
    const [imge, setImge] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [listing, setListing] = useState([]);
    const [buying, setBuying] = useState([]);
    const [owner_wallet_address, setOwner_wallet_address] = useState('');
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const [total_supply, setTotal_supply] = useState(0);
    const [available_supply, setAvailable_supply] = useState(0);


    // for loading
    const [isDisplay, setIsDisplay] = useState(false);
    

    // for error popup and messages
    const [isError, setError ] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const handleCloseError = () => {setError(false);
        window.location.reload();
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
     // setProvider(data);
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



    const getData = (itemId, token) => {
        
        
        // axios.defaults.withCredentials = true;
        console.log("token", token)
        // CSRF COOKIE
        const headers = {
                        "Authorization": `Bearer ${ token }`
                    };
        axios.get("https://backend.virtualsfadmin.com/sanctum/csrf-cookie").then((response) => {
                axios.get(`https://backend.virtualsfadmin.com/api/listing/${itemId}`, {headers: headers}
            ).then(response => {
                    
                    // navigate('/');
                    var temp = response.data.data;
                    var temp1 = [];
                    setListing(temp.ListingInfo)
                    setAvailable_supply(temp.ListingInfo.available_supply);
                    setTotal_supply(temp.ListingInfo.total_supply-temp.ListingInfo.available_supply);
                    console.log(response.data.data);

                    //console.log("--------", temp.ListingInfo.available_supply, "----------", temp.ListingInfo.total_supply-temp.ListingInfo.available_supply);
                    var tempImage = ""
                        if(temp.ListingInfo.property_image)
                        {
                            tempImage = "https://backend.virtualsfadmin.com/storage/" + temp.ListingInfo.property_image;
                        }
                        else
                        {
                            tempImage = "./images/items/123.jpeg";
                        }

                    setImge(tempImage);
                    setBuying(temp.ListingBuyers);
                    

                    // for(var i =0; i<temp.length; i++)
                    // {

                        
                        
                            
                        
                        
                    // }
                    
                    // setBuying(temp1);
                    // console.log(response, "-----item------", temp.ListingInfo.title);
                    setLoading(false);
                    
                    
               
                },
                (error) => {
                    if (error.response) {
                                setErrorMessage(error.response.data.message)
                                setLoading(false);
                    } else {
                               setErrorMessage("Could not complete the login")
                               setLoading(false);
                    }
                }
            )},
            (error) => {
                 setErrorMessage("Could not complete the login")
                 setLoading(false);
            })
        // setLoading(false);
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
                    connectWalletHandlerMetamask();
                }
                if(provider == "CoinBase")
                {
                    setWalletType(provider);
                    connectWalletHandlerCoinbase();
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
            }
            else
            {
                // const provider = window.localStorage.getItem("provider");
                // setUserToken(localStorage.getItem('token'));
                let x = JSON.parse(localStorage.getItem('user'));
                setUserInfo(x);
                let y = localStorage.getItem('item');
                getData(y, x.token);
                if(x.isAdmin)
                {
                    console.log("----------isAdmin-------");
                    setIsDisplay(true);
                }
            }
            
    }, [navigation]);



   

    
    
    return (
    <div id="main-wrapper" className="admin">
        {
        isLoading?(
            
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                    <ActivityIndicator
                        number={5}
                        diameter={40}
                        borderWidth={1}
                        duration={200}
                        activeColor="#008aff"
                        borderColor="#008aff"
                        borderWidth={5}
                        borderRadius="50%" 
                    />
            </div>  

        ):(
            <div>
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
                    <div class="container">
                        <div class="row">
                            <div class="col-xxl-12">
                                <div class="top-bid">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6"><img src={imge}
                                                    width="100%"
                                                    alt="..."/>
                                            </div>
                                            <div class="col-md-6">
                                                <h3 class="mb-3">{listing.title}</h3>
                                                <ProgressBar now={(listing.available_supply*100)/listing.total_supply} striped visuallyHidden label={`${(listing.available_supply*100)/listing.total_supply}%`} />
                                                
                                                <div class="d-flex justify-content-between mt-4 mb-4">
                                                    <div class="text-start">
                                                        <h4 class="mb-2">Available Supply</h4>
                                                        <h5 class="text-muted">Total Supply</h5>
                                                    </div>
                                                    <div class="text-end">
                                                        <h4 class="mb-2"><strong class="text-primary">{listing.available_supply}</strong></h4>
                                                        <h5 class="text-muted">{listing.total_supply}</h5>
                                                    </div>

                                                </div>
                                                <p></p>
                                                <p class="mb-3">{listing.address}</p>
                                                {isDisplay? (
                                                    <div>
                                                        <h4 class="card-title mb-3">Latest Bids</h4>


                                                            <div class="bid mb-3 card">
                                                                <div class="activity-content card-body py-0">
                                                                    <ul>
                                                                        {buying.map ((item) =>{
                                                                         return(
                                                                            <div>
                                                                                <li class="d-flex justify-content-between align-items-center">
                                                                                    <div class="d-flex align-items-center">
                                                                                        
                                                                                        <div class="activity-info">
                                                                                            <h5 class="mb-0">{item.buyer_name}</h5>
                                                                                            <p>No of Tokens : {item.supply_amount}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="text-end"><span class=" text-muted"><h5>{item.avg_ratio}%</h5></span>
                                                                                    </div>
                                                                                </li>
                                                                                <ProgressBar now={item.avg_ratio} variant='success' />
                                                                                <p> </p>
                                                                            </div>
                                                                            )
                                                                         })}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <p className="btn btn-info"  onClick={()=>{window.open("https://mumbai.polygonscan.com/token/" + listing.contract_address , '_blank', 'noopener,noreferrer')}}>Polygonscan</p>
                                                    </div>
                                                ):(
                                                    <div>
                                                        <h4 class="card-title mb-3"></h4>


                                                            <div class="bid mb-3 card">
                                                                <div class="activity-content card-body py-0">
                                                                    <ul>
                                                                        {buying.map ((item) =>{
                                                                         return(
                                                                            <div>
                                                                                <li class="d-flex justify-content-between align-items-center">
                                                                                    <div class="d-flex align-items-center">
                                                                                        
                                                                                        <div class="activity-info">
                                                                                            <h5 class="mb-0">Your Buying</h5>
                                                                                            <p>No of Tokens : {item.supply_amount}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="text-end"><span class=" text-muted"><h5>{item.avg_ratio}%</h5></span>
                                                                                    </div>
                                                                                    
                                                                                </li>
                                                                                <ProgressBar now={item.avg_ratio} />
                                                                                <p> </p>
                                                                            </div>
                                                                            )
                                                                         })}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            
                                                    </div>
                                                )}
                                                    
                                                

                                                {/*<div class="d-flex justify-content-between align-items-center">
                                                    <div class="d-flex align-items-center">
                                                    </div>
                                                    <div class="text-end">
                                                        <span href="" class="btn btn-primary">Place a Bid</span>
                                                    </div>
                                                </div>*/}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-xxl-12">
                                <div class="top-bid">
                                    <div class="card-body">
                                        <div class="row">
                                                {/*<PieChart
                                              data={[
                                                { title: 'Available Token', value: available_supply, color: 'lightgrey' },
                                                { title: 'Total Token', value: total_supply, color: 'grey' },
                                              ]}
                                            />*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        )}
       
    </div>
    );
}

export default Item;