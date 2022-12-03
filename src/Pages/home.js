import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
//import DemoToken_Abi from '../artifacts/contracts/DemoToken.sol/DemoToken.json';
//import DemoToken_Bytecode from '../artifacts/contracts/DemoToken.sol/DemoToken.dbg.json';    
//import {Link} from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HEADER from '../components/header';
// import { useWeb3React } from "@web3-react/core";
// import { connectors } from "./connectors";
import Modal from 'react-bootstrap/Modal';
import { toHex, truncateAddress } from "./utils";
import {ethereum} from './config';
import SIDEBAR from '../components/sidebar';

const Home = () => {

    // const navigate = useNavigate();


    // const {
    // library,
    // chainId,
    // account,
    // activate,
    // deactivate,
    // active
    // } = useWeb3React();

    // deploy simple token contract and paste deployed contract address here. This value is local ganache chain
    const navigate = useNavigate();


  const [total_supply, setTotal_supply] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  

    // const[userId, setUserId] = useState('');

//     let contractAddress = '0x6AFbE770d23f29D09f1e73E6e06Af8CAd8C23397';

    const [errorMessage, setErrorMessage] = useState(null);
    const [owner_wallet_address, setOwner_wallet_address] = useState('');
    const [user_Id, setUser_Id] = useState('');
    const [listing, setListing] = useState([]);
    // const [owner_wallet_address, setOwner_wallet_address] = useState('');
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');


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





   
    const handleSubmit = (mainOwner, listing_id) => {
        // e.preventDefault();
        console.log("---------------title--------", listing_id);
        if(listing_id)
        {

            console.log("Need to connect wallet");
            setErrorMessage("Need to connect wallet");
            return 
        }
        else
        {
            // if(owner_wallet_address == mainOwner)
            // {
            //     console.log("You cannot bid");
            //     setErrorMessage("You cannot bid");
            //     return
            // }
            // else
            // {
            //     setErrorMessage("");
            // }
            
            
            axios.get("https://backend.virtualsfadmin.com/sanctum/csrf-cookie").then((response) => {
                axios.post('https://backend.virtualsfadmin.com/api/listing/buy', {
                    buyer_wallet_address: owner_wallet_address,
                    owner_wallet_address: mainOwner,
                    supply_amount: total_supply,
                    listing_id: listing_id,
                    user_id: user_Id,
                }).then(response => {
                    console.log(response)
                    navigate('/dashboard');
               
                },
                (error) => {
                    if (error.response) {
                                setErrorMessage(error.response.data.message)
                    } else {
                               setErrorMessage("Could not complete the login")
                    }
                }
            )},
            (error) => {
                 setErrorMessage("Could not complete the login")
            })
        }
    }
        
//  const [defaultAccount, setDefaultAccount] = useState(null);
//  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

//  const [provider, setProvider] = useState(null);
//  const [signer, setSigner] = useState(null);
//  const [contract, setContract] = useState(null);

//  const [tokenName, setTokenName] = useState("");
//  const [tokenSymbol, setTokenSymbol] = useState("");
//  const [balance, setBalance] = useState(null);
//  const [transferHash, setTransferHash] = useState(null);

// const connectWalletHandler = async(data) => {
//      console.log("Conncetd wallet is ", data);
//      if (window.ethereum && window.ethereum.isMetaMask) {
//         console.log('installed MetaMask');
//     }
//     if (window.ethereum && window.ethereum.isCoinbaseWallet) {
//         console.log('coinbase MetaMask');
//     }
//      setShow(false);
//      const qwe =  await ethereum.request({ method: 'eth_requestAccounts' }).then(response => {
//             console.log("response ", response[0]);
//         })
//     }



    // const connectWalletHandler = () => {
    //  if (window.ethereum && window.ethereum.isMetaMask) {

    //      window.ethereum.request({ method: 'eth_requestAccounts'})
    //      .then(result => {
    //          accountChangedHandler(result[0]);
    //          setConnButtonText('Wallet Connected');
    //      })
    //      .catch(error => {
    //          setErrorMessage(error.message);
            
    //      });

    //  } else {
    //      console.log('Need to install MetaMask');
    //      setErrorMessage('Please install MetaMask browser extension to interact');
    //  }
    // }

//  // update account, will cause component re-render
//  const accountChangedHandler = (newAccount) => {
//      setDefaultAccount(newAccount);
//      updateEthers();
//  }

//  const updateBalance = async () => {
//      let balanceBigN = await contract.balanceOf(defaultAccount);
//      console.log("try1 : ", balanceBigN);
//      let balanceNumber = balanceBigN.toString();

//      let tokenDecimals = await contract.decimals();
//      let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);

//      let tokenName = await contract.name();
//      let tokenSymbol = await contract.symbol();
//      console.log("try2 : ", tokenName, "------------", tokenSymbol);
//      setTokenName(tokenName);
//      setTokenSymbol(tokenSymbol);

//      setBalance(toFixed(tokenBalance));  


//  }

//    function toFixed(x) {
//    if (Math.abs(x) < 1.0) {
//       var e = parseInt(x.toString().split('e-')[1]);
//       if (e) {
//          x *= Math.pow(10, e - 1);
//          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
//       }
//    } else {
//       var e = parseInt(x.toString().split('+')[1]);
//       if (e > 20) {
//          e -= 20;
//          x /= Math.pow(10, e);
//          x += (new Array(e + 1)).join('0');
//       }
//    }
//    return x;
// }

//  const chainChangedHandler = () => {
//      // reload the page to avoid any errors with chain change mid use of application
//      window.location.reload();
//  }

//  // listen for account changes
//  window.ethereum.on('accountsChanged', accountChangedHandler);

//  window.ethereum.on('chainChanged', chainChangedHandler);

//  const updateEthers = () => {
//      let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
//      setProvider(tempProvider);

//      let tempSigner = tempProvider.getSigner();
//      setSigner(tempSigner);

//      let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);
//      setContract(tempContract);  
//  }
const getData = (userId) => {
        setUser_Id(userId)
        
        axios.defaults.withCredentials = true;
        // CSRF COOKIE
        axios.get("https://backend.virtualsfadmin.com/sanctum/csrf-cookie").then((response) => {
                axios.get(`https://backend.virtualsfadmin.com/api/listings?user_id=${userId}`,
            ).then(response => {
                    
                    // navigate('/');
                    var temp = response.data.data;
                    var temp1 = [];
                    // console.log("-----------response-------", temp.length, "-------", temp);

                    for(var i =0; i<temp.length; i++)
                    {
                        console.log(temp[i]);
                        temp1.push({
                            id : temp[i].id,
                            title : temp[i].title,
                            address: temp[i].address,
                            owner_wallet_address: temp[i].owner_wallet_address,
                            total_supply: temp[i].total_supply,
                            available_supply: temp[i].available_supply,
                            contract_address: temp[i].contract_address,
                            created_at: temp[i].created_at,
                        });
                    }
                    
                    setListing(temp1);
                    
                    
               
                },
                (error) => {
                    if (error.response) {
                                setErrorMessage(error.response.data.message)
                    } else {
                               setErrorMessage("Could not complete the login")
                    }
                }
            )},
            (error) => {
                 setErrorMessage("Could not complete the login")
            })
    }

    const [isDisplay, setIsDisplay] = useState(false);
    const [isDisplayLogInOut, setIsDisplayLogInOut] = useState(false);

    useEffect(() => {

        //-------------- Login Type---------------------
        // let x = JSON.parse(localStorage.getItem('user'));
        //     if(x.isAdmin)
        //     {
        //         // console.log("----------isAdmin-------");
        //         // getData1(x.id);
        //         setIsDisplay(true);

        //     }
        //----------------------------------------------
        // if (!localStorage.getItem('user')) {
        //     // navigate('/', {user_id : });
        //     navigate('/');
        // }
        // else
        // {

        //################## Wallet Connect #################################
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
        //###############################################################

        if (!localStorage.getItem('user')) {
            setIsDisplayLogInOut(true);
        }
        if (localStorage.getItem('user')) {
            // let x = JSON.parse(localStorage.getItem('user'));
            //-------------- Login Type---------------------
            let x = JSON.parse(localStorage.getItem('user'));
                if(x.isAdmin)
                {
                    // console.log("----------isAdmin-------");
                    // getData1(x.id);
                    setIsDisplay(true);

                }
            //----------------------------------------------
            // console.log("-------upload-----------", x, "----------", x.id);

            getData(x.id);
        }
        // const provider = window.localStorage.getItem("provider");
        //     if (provider) 
        //     {
        //         activate(connectors[provider]);
        //         setConnButtonText('Disconnect');
        //         console.log("-----Active address-----", truncateAddress(account), "--------", provider);
        //     }
        //     else
        //     {
        //         // activate(connectors.injected);
        //         setConnButtonText('Connect');
        //         console.log("-----not Active address-----", truncateAddress(account), "-------");
        //     }
        // if (contract != null) {
        //  updateBalance();
        //  updateTokenName();
        // }
        // if (localStorage.getItem('user')) {
            // navigate('/', {user_id : });
            
        // }

        // getData();
    }, [navigate]);

    // const updateTokenName = async () => {
    //  setTokenName(await contract.name());
    // }
    //################ Wallet Connect ##################################
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const [walletType , setWalletType] =useState("");
    const [isError, setError ] = useState(false);
    const [userInfo, setUserInfo] = useState('');

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

    //##################################################################
    
    return (
    <div id="main-wrapper" className="front">
        
    <div className="header landing">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="navigation">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <div className="brand-logo">
                                    <a href="/home">
                                        <img src="./images/logo.png" alt="" className="logo-primary" width="75" />
                                        <strong>Shiny Lobster</strong>
                                    </a>
                                    
                                </div>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto">
                                        <li className="nav-item dropdown"><Link to="/">Home</Link></li>
                                        <li className="nav-item"><a className="nav-link" href="./dashboard">Dashboard</a></li>

                                        {
                                            isDisplay?(
                                                <li className="nav-item"><a className="nav-link" href="./notification">Notification</a></li>
                                            ):(
                                                <li className="nav-item"><a className="nav-link" href="./myactivity">Activity</a></li>
                                               )
                                        }
                                    
                                        {
                                            isDisplay?(
                                                <li className="nav-item"><a className="nav-link" href="./upload">Upload</a></li>
                                            ):(
                                                <li className="nav-item"><a className="nav-link" href="./mypurchases">Assets</a></li>
                                               )
                                        }

                                        {/*{
                                            isDisplayLogInOut?(
                                                <li className="nav-item"><a className="nav-link" href="./login">Login</a></li>
                                            ):(
                                                <li className="nav-item"><a className="nav-link" href="./logout">Logout</a></li>
                                               )
                                        } */}
                                    </ul>
                                </div>
                                <div className="signin-btn d-flex align-items-center">

                                    {/*<a className="btn btn-primary" href="./connect.html">Connect</a>*/}
                                    
                                    {/*<button className="btn btn-primary" onClick={()=>{setShow(true)}}>{connButtonText}</button>*/}
                                    <div className="mx-2">Welcome {userInfo.name} ({truncateAddress(owner_wallet_address)   }) </div>

                                    { connButtonText == "Connect Wallet" ? 
                                    (
                                        <button className="btn btn-primary" onClick={()=>{setShow1(true)}}>{connButtonText}</button>
                                    ):(
                                        <button className="btn btn-primary" onClick={()=>{connectWalletHandler(walletType)}}>{connButtonText}</button>)
                                    }
                                    
                                    {/*<button className="btn btn-primary" onClick={}>Mint</button>*/}

                                    {
                                            isDisplayLogInOut?(
                                                <div className="mx-2"><a class="btn btn-primary" href="/login">SignIn</a></div>
                                            ):(
                                                <div className="mx-2"><a class="btn btn-danger" href="/logout">Signout</a></div>
                                               )
                                        }
                                    {/*<div className="mx-2"><a class="btn btn-danger" href="/logout">Signout</a></div>*/}
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        


        <div className="intro1 section-padding">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-xl-5 col-lg-6 col-12">
                        <div className="intro-content  my-5">
                            <h1 className="mb-3">An extraordinary decentralised <span> Real Estate Tokenization Marketplace </span></h1>
                            <p>on the world's first &amp; largest Tokenized marketplace</p>
                            <div className="intro-btn mt-5">
                                <a className="btn btn-primary" href="/explore.html">Explore<i className="bi bi-arrow-right"></i>
                                </a>
                                <a className="btn btn-outline-primary" href="/upload">Create</a>
                            </div>
                            {/*<a className="more c-pointer d-inline-flex popup-youtube"
                                href="https://www.youtube.com/watch?v=7e90gBu4pas">
                                <span><i className="bi bi-play-fill"></i></span>
                                Learn more about Neftify</a> */}
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6 col-12">
                        <div className="intro-slider">
                            <div className="slider-item"><img src="./images/property/2.png" alt="" className="img-fluid"/>
                                <div className="slider-item-avatar"><img
                                            src="./images/avatar/11.jpg" alt=""/>
                                    <div>
                                        <h5>Mark Paxton</h5>
                                        <p>House 1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        

        

        {/*<div className="trending-category section-padding bg-light triangle-top-light triangle-bottom-light">
        
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="section-title text-center d-flex justify-content-between mb-3">
                                    <h2>Trending Items</h2>
                                </div>
                            </div>
                        </div>
                        {errorMessage &&
                                                    <div className="alert alert-danger">{errorMessage}</div>
                                            }
                                            <div className="col-12 mb-3">
                                                   <label className="form-label">Total Supply</label><input name="total_supply"
                                                        type="text" className="form-control" value={total_supply} onChange={e => setTotal_supply(e.target.value)} required/>
                                                </div>
                        <div className="row align-items-center">
                            {listing.map ((item) =>{
                                return(
                                    <div className="col-xl-3 col-lg-6 col-md-6" key={item.id}>
                                        <div className="card items">
                                            <div className="card-body">
                                                <div className="items-img position-relative">
                                                    <img src="./images/avatar/12.jpg" className="img-fluid rounded mb-3" alt=""/>
                                                    
                                                </div>
                                                <a href="/">
                                                    <h4 className="card-title">{item.title}</h4>
                                                    <h5 className="text-muted">{item.address}</h5>
        
                                                </a>
                                                <p></p>
                                                <div className="d-flex justify-content-between">
                                                        {item.available_supply ? (
                                                            <p><strong className="text-primary">{item.available_supply}/{item.total_supply}</strong></p>):(
                                                            <p><strong className="text-primary">{item.total_supply}/{item.total_supply}</strong></p>
                                                            )}
                                                        
                                                        
                                                </div>
        
        
                                                <div className="d-flex justify-content-center mt-3">        
                                                    <button className="btn btn-primary" onClick={()=>{handleSubmit(item.owner_wallet_address, item.id)}}>Place a bid</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                
                            })}
                            
                            
                        </div>
        
                    </div>
                </div> */}

        <div className="create-sell section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="section-title text-center">
                            <h2>Create and sell your Property Tokens</h2>
                            <p>Here are a few reasons why you should choose us</p>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="create-sell-content">
                            <div className="create-sell-content-icon"><i className="bi bi-shield-check"></i></div>
                            <div>
                                <h4>Set up your wallet </h4>
                                <p>Once you’ve set up your wallet of choice, connect it to your dashboard by clicking the
                                    wallet
                                    icon in the top right corner. Learn about the wallets we support.</p>
                                   
                                    <a href="/dashboard">Explore<i className="bi bi-arrow-right-short"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="create-sell-content">
                            <div className="create-sell-content-icon"><i className="bi bi-x-diamond"></i></div>
                            <div>
                                <h4>Create your collection</h4>
                                <p>Click My Collections and set up your collection. Manage your assets and get your digital assets
                                right into your wallet.</p>
                                
                                <a href="/dashboard">Explore<i className="bi bi-arrow-right-short"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="create-sell-content">
                            <div className="create-sell-content-icon"><i className="bi bi-circle-half"></i></div>
                            <div>
                                <h4>Add your Property Tokens</h4>
                                <p>Go to your dashboard and look for properties you want to invest check the 
                                property details and add the tokens to your crypto wallet.</p>

                                <a href="/dashboard">Explore<i className="bi bi-arrow-right-short"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="create-sell-content">
                            <div className="create-sell-content-icon"><i className="bi bi-circle-half"></i></div>
                            <div>
                                <h4>Invest in your Future</h4>
                                <p>Choose between fixed-price listings, and declining-price listings. You
                                    choose
                                    how you want to sell your Tokens, and we help you sell them!</p>

                                    <a href="/dashboard">Explore<i className="bi bi-arrow-right-short"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div className="browse-category section-padding border-top">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="section-title text-center">
                            <h2>Trending Properties</h2>
                            <p>Here are a few properties in which you can invest</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="card browse-cat"><img className="img-fluid card-img-top" src="./images/property/Prop1.jpg"
                                alt=""/>
                            <div className="card-body">
                                <h4>530 Jackson Blvd</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="card browse-cat"><img className="img-fluid card-img-top" src="./images/property/Prop2.jpeg"
                                alt=""/>
                            <div className="card-body">
                                <h4>Privilion</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="card browse-cat"><img className="img-fluid card-img-top" src="./images/property/Prop3.jpg"
                                alt=""/>
                            <div className="card-body">
                                <h4>Plot 132 Mount Hill</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="card browse-cat"><img className="img-fluid card-img-top" src="./images/property/Prop4.jpg"
                                alt=""/>
                            <div className="card-body">
                                <h4>Plot 130 Mount Hill</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="card browse-cat"><img className="img-fluid card-img-top" src="./images/property/Prop5.jpeg"
                                alt=""/>
                            <div className="card-body">
                                <h4>Test Contract</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="card browse-cat"><img className="img-fluid card-img-top" src="./images/property/1.png"
                                alt=""/>
                            <div className="card-body">
                                <h4>Edge Residency</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="card browse-cat"><img className="img-fluid card-img-top" src="./images/property/2.png"
                                alt=""/>
                            <div className="card-body">
                                <h4>Edge Residency 2</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="card browse-cat"><img className="img-fluid card-img-top" src="./images/property/Prop7.jpg"
                                alt=""/>
                            <div className="card-body">
                                <h4>Empire Infraspacec </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="intro-video section-padding bg-light triangle-top-light triangle-bottom-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="section-title text-center">
                            <h2>Get your Tokens Now</h2>
                            <p>The Tokenized marketplace with trending properties for everyone</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="intro-video-play">
                            <div className="play-btn"><a className="popup-youtube"
                                    href="https://www.youtube.com/watch?v=PKw0RTT1Hp4">
                                    <i className="bi bi-play-fill"></i></a></div>
                        </div>
                        <div className="intro-video-content text-center mt-5"><a href="/dashboard"
                                className="btn btn-primary px-4">Explore
                                the marketplace</a></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="bottom section-padding triangle-top-dark triangle-bottom-dark">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-7 col-sm-8">
                        <div className="bottom-logo"><img className="pb-3" src="./images/logo.png" style={{width:"50px"}} alt=""/>
                            <p> Shiny Lobster comes with a unique concept of tokeninzing the Real Estate properties and getting desiered returns.
                                A complete and reselable solution to invest in your future and to fulfill your dreams out of the desiered returns.</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-5 col-sm-4 col-6">
                        <div className="bottom-widget">
                            <h4 className="widget-title">About us</h4>
                            <ul>
                                <li><a href="/dashboard">Explore</a></li>
                                <li><a href="/item">Item</a></li>
                                {
                                    isDisplay?(
                                        <li><a href="/notification">Notification</a></li>
                                    ):(
                                        <li><a href="/myactivity">My Activity</a></li>
                                       )
                                }

                                {
                                    isDisplay?(
                                        <li><a href="/upload">Upload</a></li>
                                    ):(
                                        <li><a href="/mypurchases">My Assets</a></li>
                                       )
                                }
                            </ul>
                        </div>
                    </div>



                    {/* <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6">
                                            <div className="bottom-widget">
                                                <h4 className="widget-title">Settings</h4>
                                                <ul>
                                                    <li><a href="./settings.html">Settings</a></li>
                                                    <li><a href="./application.html">Application</a></li>
                                                    <li><a href="./security.html">Security</a></li>
                                                    <li><a href="./activity.html">Activity</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-8 col-sm-8">
                                            <div className="bottom-widget">
                                                <h4 className="widget-title">Profile</h4>
                                                <div className="row">
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                                        <ul>
                                                            <li><a href="./profile.html">Profile</a></li>
                                                            <li><a href="./created.html">Created</a></li>
                                                            <li><a href="./collected.html">Collected</a></li>
                                                            <li><a href="./activity.html">Activity</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                                        <ul>
                                                            <li><a href="./onsale.html">On Sale</a></li>
                                                            <li><a href="./liked.html">Liked</a></li>
                                                            <li><a href="./following.html">Following</a></li>
                                                            <li><a href="./followers.html">Followers</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                </div>
            </div>
        </div>


        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="copyright">
                            {/*<p>© Copyright 2022 </p>*/}
                            <a href="https://solvios.technology/">Solvios Technology</a> 
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="footer-social">
                            <ul>
                                <li><a href="https://www.facebook.com/solviostech/"><i className="bi bi-facebook"></i></a></li>
                                <li><a href="https://twitter.com/solviostech"><i className="bi bi-twitter"></i></a></li>
                                <li><a href="https://in.linkedin.com/company/solvios-technology-llc"><i className="bi bi-linkedin"></i></a></li>
                                <li><a href="https://www.youtube.com/channel/UCUAPVfCifPK-gBD1nCY9c-Q/featureds"><i className="bi bi-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <Modal show={show} onHide={handleClose} className="buy-popup">
                <Modal.Header closeButton>
                  <Modal.Title>Select Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
        
                    <button className="btn mt-2"  onClick={()=>{connectWalletHandler("MetaMask")}} ><span className='icons1'><img src="./images/mm.png" alt="" width="24" /> </span>Metamask</button>
                    <button className="btn"  onClick={()=>{connectWalletHandler("CoinBase")}} ><span className='icons1'><img src="./images/cbw.png" alt="" width="24" /> </span>Coinbase Wallet</button>
                    <button className="btn mt-2"  onClick={()=>{connectWalletHandler("WalletConnect")}} ><span className='icons1'><img src="./images/wc.png" alt="" width="24" /> </span>CWallet Connect</button>
                    
                </Modal.Body>
              </Modal>*/}

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
    )
}

export default Home;