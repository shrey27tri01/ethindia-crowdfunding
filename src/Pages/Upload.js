import React, {useEffect, useState} from 'react'
import HEADER from '../components/header';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {ethers, ContractFactory} from 'ethers';
import DemoToken_Abi from '../Contracts/simple_token_abi.json'; 
import DemoToken_Bytecode from '../Contracts/simpleTokenBytecode';
import ActivityIndicator from 'react-activity-indicator';
import 'react-activity-indicator/src/activityindicator.css'; 
import Modal from 'react-bootstrap/Modal';   
import {ethereum} from './config';
import { toHex, truncateAddress } from "./utils";

const Upload = () => {

    const navigate = useNavigate();
    const[userId, setUserId] = useState('');
    const [userToken, setUserToken] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [walletType , setWalletType] =useState("");


    const [profileImage, setProfileImage] =useState('');
    const [photoDisplay, setPhotoDisplay] =useState('');
    const [photo, setPhoto] =useState([]);

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [owner_wallet_address, setOwner_wallet_address] = useState('');
    const [total_supply, setTotal_supply] = useState('');
    const [price, setPrice] = useState('');


    const [contract_address, setContract_address] = useState('');


    // for error popup and messages
    const [isError, setError ] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const handleCloseError = () => {setError(false);
        window.location.reload();
    }

    const [isDisplay, setIsDisplay] = useState(false);

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
            if (provider) 
            {

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
                setConnButtonText('Connect Wallet');
                console.log("-----not Active address-----", truncateAddress(owner_wallet_address), "-------");
            }
        if (!localStorage.getItem('user')) {
            navigate('/login');
        }
        else
        {
            let x = JSON.parse(localStorage.getItem('user'));
                if(x.isAdmin)
                {
                    setIsDisplay(true);

                }
            setUserId(x.id);
            setUserToken(x.token)
        }
    }, [navigate]);

    
    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        if(owner_wallet_address == "" )
        {

            console.log("Need to connect wallet");
            setErrorMessage("Need to connect wallet");
            // setErrorMessage(err);
            setError(true);
            setLoading(false);
            return 
        }
        try{

            if(walletType == "MetaMask")
            {
                let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
                console.log("---tempProvider----", tempProvider);

                let tempSigner = tempProvider.getSigner();
                console.log("---tempsigner----", tempSigner);

                const factory = new ContractFactory(DemoToken_Abi, DemoToken_Bytecode, tempSigner);
                console.log("-------1111--------", factory);

                const contract = await factory.deploy(total_supply + "000000000000000000");
                console.log("-------22222--------");

                let address = contract.address;
                console.log("-------33333--------");

                let details = await contract.deployTransaction.wait();
                console.log("----address---", address, "-----details------", details);

                handleSubmitFinal(details.contractAddress);
                
            }
            if(walletType == "CoinBase")
            {
                let tempProvider = new ethers.providers.Web3Provider(ethereum);
                console.log("---tempProvider----", tempProvider);

                let tempSigner = tempProvider.getSigner();
                console.log("---tempsigner----", tempSigner);

                const factory = new ContractFactory(DemoToken_Abi, DemoToken_Bytecode, tempSigner);
                console.log("-------1111--------", factory);

                const contract = await factory.deploy(total_supply + "000000000000000000");
                console.log("-------22222--------");

                let address = contract.address;
                console.log("-------33333--------");

                let details = await contract.deployTransaction.wait();
                console.log("----address---", address, "-----details------", details);

                handleSubmitFinal(details.contractAddress);
                
            }




            let tempProvider = new ethers.providers.Web3Provider(ethereum);
            let tempSigner = tempProvider.getSigner();
            console.log("---tempProvider----", tempProvider);

            console.log("---tempsigner----", tempSigner);

            
        }
        catch(err)
        {
            console.log("--------err-----", err);
            setLoading(false);
            // alert(err);
            setErrorMessage(err);
            setError(true);
        }

    }

    const handleSubmitFinal = (contractAddress) => {
        if(owner_wallet_address == "" )
        {

            console.log("Need to connect wallet");
            setErrorMessage("Need to connect wallet");
            // setErrorMessage(err);
            setError(true);
            setLoading(false);
            return 
        }
        else
        {

         

            var data = {
              'title': title,
              'address': address,
              'owner_wallet_address': owner_wallet_address,
              'available_supply' : total_supply,
              'total_supply': total_supply ,
                'contract_address': contractAddress,
               'property_image': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVES3nzS4rzEX4Mmy9q5yyw_jN8-5HQSO6g&usqp=CAU",
                'total_property_value': price
            };

            
            var config = {
                method: 'post',
                url: 'http://localhost:3000/listings',
                // headers: headers,
                data : data
              };

              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                // navigate('/dashboard');
                setLoading(false);
                navigate('/dashboard');
              })
              .catch(function (error) {
                console.log(error);
                setLoading(false);
                navigate('/dashboard');
              });


        
        }
        
        
    }
          
            


    const [connButtonText, setConnButtonText] = useState('Connect Wallet');


    const disconnect = () => {
        refreshState();      };

      const refreshState = () => {
        window.localStorage.setItem("provider", undefined);
      };


      const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
      };



    const connectWalletHandler = (data) => {
     console.log("Conncetd wallet is ", data, connButtonText);
     // localStorage.setItem('provider', data));
     setProvider(data);
     setWalletType(data);
     setShow(false);
     if(data == "CoinBase")
     {
        if(connButtonText == "Connect Wallet")
        {
            console.log("1111");
            connectWalletHandlerCoinbase();
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
            connectWalletHandlerMetamask();
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

    const connectWalletHandlerCoinbase = async() => {
        const qwe =  await ethereum.request({ method: 'eth_requestAccounts' }).then(response => {
            setOwner_wallet_address(response[0])
            setConnButtonText('Disconnect Wallet');
        })
    }


    const connectWalletHandlerMetamask = () => {
        setErrorMessage("");
        if (window.ethereum && window.ethereum.isMetaMask) {

            window.ethereum.request({ method: 'eth_requestAccounts'})
            .then(result => {
                // accountChangedHandler(result[0]);
                setConnButtonText('Disconnect Wallet');
                console.log("----wallet address connected---",result[0])
                setOwner_wallet_address(result[0])
                
            })
            .catch(error => {
                setErrorMessage(error.message);
                // setErrorMessage(err);
                setError(true);
            
            });

        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
        
    }


    




     const handleImage = (e) =>{
        e.persist();
        const imageDemo = e.target.files[0];
        console.log("-------e-----", e.target.files[0], "------", e.target.value);
        setProfileImage(e.target.value);
        setPhoto(e.target.files[0]);

        setPhotoDisplay(URL.createObjectURL(e.target.files[0]));
     }
    
    
    

    
    
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
            <div id="main-wrapper" className="admin">
            <div className="header landing">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="navigation">
                                <nav className="navbar navbar-expand-lg navbar-light">
                                    <div className="brand-logo">
                                        <a href="/">
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
                                                <li className="nav-item"><a className="nav-link" href="./mypurchases">Purchase</a></li>
                                               )
                                        }
                                        </ul>
                                    </div>
                                    <div className="signin-btn d-flex align-items-center">
                                        <div className="dark-light-toggle theme-switch" onclick="themeToggle()">
                                            <span className="dark"><i className="ri-moon-line"></i></span>
                                            <span className="light"><i className="ri-sun-line"></i></span>
                                        </div>

                                        { connButtonText == "Connect Wallet" ? 
                                    (
                                        <button className="btn btn-primary" onClick={()=>{setShow(true)}}>{connButtonText}</button>
                                    ):(
                                        <button className="btn btn-primary" onClick={()=>{connectWalletHandler(walletType)}}>{connButtonText}</button>)
                                    }
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <div className="page-title">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-6">
                            <div className="page-title-content">
                                <h3>Shiny Lobster</h3>
                                <p className="mb-2">{truncateAddress(owner_wallet_address)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="upload-item section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <h4 className="card-title mb-3">Upload Item</h4>
                            <div className="card">
                                <div className="card-body">
                                    {errorMessage &&
                                                <div className="alert alert-danger">{errorMessage}</div>
                                        }
                                    <form onSubmit={handleSubmit} Encrypted="multipart/form-data">
                                        <div className="row">
                                            <div className="col-xxl-12">
                                                    <div className="media-body">
                                                        <h5 className="mb-0"></h5>
                                                    </div>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <input type="file" name="profile_image"  onChange={handleImage}/>
                                            </div>
                                            
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Item Title*</label><input name="title"
                                                    type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Address*</label><input name="address"
                                                    type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)} required />
                                            </div>
                                            
                                            <div className="col-6 mb-3">
                                                <label className="form-label">Number of token*</label><input name="size" type="text"
                                                    className="form-control" value={total_supply} onChange={e => setTotal_supply(e.target.value)} required />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label className="form-label">Price per token*</label><input name="price" type="text"
                                                    className="form-control" value={price} onChange={e => setPrice(e.target.value)} required />
                                            </div>
                                            
                                        </div>
                                        <div className="mt-3">
                                            <button type="submit" className="btn btn-primary mr-2 w-100">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-6">
                            <h4 className="card-title mb-3">Preview</h4>
                            <div className="card items">
                                <div className="card-body">
                                    <div className="items-img position-relative">

                                    

                                            {photoDisplay?
                                                <img src={photoDisplay} className="img-fluid rounded mb-3" alt=""/>
                                                :
                                                <img src="./images/items/5.jpg" className="img-fluid rounded mb-3" alt=""/>
                                            }

                                            </div>
                                            {title ? <h4 className="card-title">{title}</h4> : <h4 className="card-title">Title</h4>}
                                            {address ? <h4 className="text-muted">{address}</h4> : <h4 className="text-muted">Address</h4>}
                                    
                                    <p></p>
                                    <div className="d-flex justify-content-between">
                                        <div className="text-start">
                                            <p className="mb-2">Size</p>
                                            <p className="mb-2">Token Price</p>
                                            <p className="mb-2">Total</p>


                                        </div>
                                        <div className="text-end">
                                            <p className="mb-2">{total_supply}</p>
                                            <p className="mb-2">{price}</p>
                                            <p className="mb-2">{price*total_supply}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
         
            
           <button onClick={()=>{setError(false); window.location.reload();}} className="btn btn-primary  text-white">Ok</button>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </Modal.Body>
      </Modal>


            <Modal show={show} onHide={handleClose} className="buy-popup">
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
    )
}

export default Upload   ;