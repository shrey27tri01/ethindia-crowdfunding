import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import simple_token_abi from '../Contracts/simple_token_abi.json'    
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

import { toHex, truncateAddress } from "./utils";


import {ethereum} from './config';




const Dashboard = ({navigation}) => {

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
    const [isError, setError ] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const handleCloseError = () => {setError(false);
        window.location.reload();
    }


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
    const [walletType , setWalletType] =useState("");

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
        setBuyTotalSupply(totalAmount)
        setShow(true);

        // setBuyListingId(listing_id);
    };

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

    

    const getData = async(userId, token) => {
        setUser_Id(userId)
        setUserToken(token);

        const res = await axios.get('http://localhost:3000/listings');
        var temp = res.data;
        console.log("-----------response-------", temp.length, "-------", temp);
        var temp1 = [];
                    var tempImage = ""

        for(var i =0; i<temp.length; i++)
                    {
                        tempImage="";
                        //console.log(temp[i].property_image);
                        if(temp[i].property_image)
                        {
                            tempImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVES3nzS4rzEX4Mmy9q5yyw_jN8-5HQSO6g&usqp=CAU";
                        }
                        else
                        {
                            tempImage = "./images/items/123.jpeg";
                        }
                        temp1.push({
                            key: temp[i].id,
                            id : temp[i].id,
                            title : temp[i].title,
                            address: temp[i].address,
                            owner_wallet_address: temp[i].owner_wallet_address,
                            total_supply: temp[i].total_supply,
                            available_supply: temp[i].available_supply,
                            contract_address: temp[i].contract_address,
                            created_at: temp[i].created_at,
                            // listing_id : temp[i].listing_id,
                            property_image : tempImage

                        });
                    }
                    
                    setListing(temp1);
        
        // const headers = {
        //                 "Authorization": `Bearer ${ token }`
        //             };
        // axios.get("https://backend.virtualsfadmin.com/sanctum/csrf-cookie").then((response) => {
        //         axios.get(`https://backend.virtualsfadmin.com/api/listings`, {headers: headers} ).then(response => {
                    
        //             // navigate('/');
        //             var temp = response.data.data;
        //             var temp1 = [];
        //             var tempImage = ""
        //             console.log("-----------response-------", temp.length, "-------", temp);
        //             console.log(JSON.stringify(temp))

        //             for(var i =0; i<temp.length; i++)
        //             {
        //                 tempImage="";
        //                 //console.log(temp[i].property_image);
        //                 if(temp[i].property_image)
        //                 {
        //                     tempImage = "https://backend.virtualsfadmin.com/storage/" + temp[i].property_image;
        //                 }
        //                 else
        //                 {
        //                     tempImage = "./images/items/123.jpeg";
        //                 }
        //                 temp1.push({
        //                     key: temp[i].id,
        //                     id : temp[i].id,
        //                     title : temp[i].title,
        //                     address: temp[i].address,
        //                     owner_wallet_address: temp[i].owner_wallet_address,
        //                     total_supply: temp[i].total_supply,
        //                     available_supply: temp[i].available_supply,
        //                     contract_address: temp[i].contract_address,
        //                     created_at: temp[i].created_at,
        //                     // listing_id : temp[i].listing_id,
        //                     property_image : tempImage

        //                 });
        //             }
                    
        //             setListing(temp1);
        //             console.log("Listing", temp1);
                    
                    
               
        //         },
        //         (error) => {
        //             if (error.response) {
        //                         setErrorMessage(error.response.data.message)
        //             } else {
        //                        setErrorMessage("Could not complete the login")
        //             }
        //         }
        //     )},
        //     (error) => {
        //          setErrorMessage("Could not complete the login")
        //     })


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

            //#############################################################
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
                getData(x.id, x.token);
                if(x.isAdmin)
                {
                    setIsDisplay2(true);
                //     console.log("----------isAdmin-------");
                //     getData1(x.id, x.token);
                }
                //
            }

            //#############################################################
            
    }, [navigation]);



    const handleSubmit = (e) => {
        if(isNaN(total_supply))
        {
            setErrorMessage("Please Enter Number only");
            setError(true);
            return
        }
        else{
            e.preventDefault();
            handleClose();


            if (buyTotalSupply <= total_supply)
            {
                setErrorMessage("Amount is larger than total Supply");
                setError(true);
            }
            else{
                if (owner_wallet_address== "")
                {
                    // alert("Connect wallet first")
                    setErrorMessage("Connect wallet first");
                    setError(true);
                }
                else
                {
                    BuyApi(buyOwner, buyId );
                    //statusChange(buyId, buyListingId, "Approved");
                }
            }
        }
        
        
        // alert(total_supply);
        
        // return false;
    }


    const statusChange = (id , listing_id, status) =>{
        const headers = {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${ userToken }`
                    };
        axios.get("https://backend.virtualsfadmin.com/sanctum/csrf-cookie").then((response) => {
                axios.post('https://backend.virtualsfadmin.com/api/listing/update-status', {
                    status : status, 
                    listing_id: listing_id,
                    user_id: user_Id,
                    id: id,
                    
                }, {headers : headers}).then(response => {
                    console.log(response)
                    setError(false);
                    if(status == "Rejected"){
                        // alert("Rejected Successfully");
                        setErrorMessage("Rejected Successfully");
                        setError(true);
                    }
                    else
                    {
                        // alert("Transferred Successfully");
                        setErrorMessage("Transferred Successfully");
                        setError(true);
                    }
                    
                    // window.location.reload();
                    // navigate('/dashboard');
               
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


    const BuyApi = async (mainOwner, listing_id) => {
        // e.preventDefault();
        console.log("---------------title--------", listing_id);
        if(!listing_id)
        {

            console.log("Need to connect wallet");
            setErrorMessage("Need to connect wallet");
            return 
        }
        else
        {
            setErrorMessage("");

            const apiData = {
                "buyer_wallet_address": owner_wallet_address,
                "owner_wallet_address": mainOwner,
                "supply_amount": total_supply,
                "listing_id": listing_id,
                "contract_address":buyContract,
                "status" : 'Pending'
            }

            const res = await axios.get('http://localhost:3000/listings');
            var temp = res.data;
            var finalTemp = {};


            temp.map((t)=>{
                if(t.id == listing_id)
                {
                    finalTemp = {
                    "title": t.title,
                    "address": "try",
                    "owner_wallet_address": t.owner_wallet_address,
                    "available_supply": 1,
                    "total_supply": t.total_supply,
                    "contract_address": t.contract_address,
                    "property_image": t.property_image,
                    "total_property_value": t.total_property_value,
                    // "id": t.id
                    }
                }
            });



            // var config = {
            //     method: 'post',
            //     url: 'http://localhost:3000/listings    ',
            //     // headers: headers,
            //     data : finalTemp
            //   };

            //   axios(config)
            //   .then(function (response) {
            //     console.log(JSON.stringify(response.data));
            //     // setErrorMessage("Purchase is requested Successfully");
            //     // setError(true);
            //     // navigate('/dashboard');
            //     // setLoading(false);
            //     // navigate('/dashboard');
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //     // setLoading(false);
            //     navigate('/dashboard');
            //   });

            const res1 = await axios.put(`http://localhost:3000/listings/${listing_id}`, finalTemp);
            console.log(res1.data);

            var config = {
                method: 'post',
                url: 'http://localhost:3000/purchase',
                // headers: headers,
                data : apiData
              };

              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                setErrorMessage("Purchase is requested Successfully");
                setError(true);
                // navigate('/dashboard');
                // setLoading(false);
                navigate('/dashboard');
              })
              .catch(function (error) {
                console.log(error);
                // setLoading(false);
                navigate('/dashboard');
              });
            
            
            // const headers = {
            //     'Content-Type': 'application/json',
            //             "Authorization": `Bearer ${ userToken }`
            //         };
            // axios.get("https://backend.virtualsfadmin.com/sanctum/csrf-cookie").then((response) => {
            //     axios.post('https://backend.virtualsfadmin.com/api/listing/buy', {
            //         buyer_wallet_address: owner_wallet_address,
            //         owner_wallet_address: mainOwner,
            //         supply_amount: total_supply,
            //         listing_id: listing_id,
            //         user_id: user_Id,
            //         contract_address:buyContract,
            //         headers: headers
            //     }, {headers: headers}).then(response => {
            //         console.log(response)
            //         setError(false);
            //         // alert("Purchase is requested Successfully");
            //         setErrorMessage("Purchase is requested Successfully");
            //         setError(true);

            //         // window.location.reload();
            //         //navigate('/dashboard');
               
            //     },
            //     (error) => {
            //         if (error.response) {
            //                     setErrorMessage(error.response.data.message)
            //         } else {
            //                    setErrorMessage("Could not complete the login")
            //         }
            //     }
            // )},
            // (error) => {
            //      setErrorMessage("Could not complete the login")
            // })

        }
    }

    const transferHandle = async (contractAddress, supply, buyer, item) =>{
        // console.log("------object-----", object);
        console.log("=====", contractAddress, "-----", supply, "------buyer---", buyer);
        if(owner_wallet_address == "" )
        {

            console.log("Need to connect wallet");
            setErrorMessage("Need to connect wallet");
            // alert("Connect wallet First");
            // setErrorMessage("Connect wallet First");
            setError(true);
            // setLoading(false);
            return 
        }
        if (owner_wallet_address != item.owner_wallet_address)
        {
            setErrorMessage("Need to connect " + truncateAddress(owner_wallet_address) + " wallet");
            // alert("Connect wallet First");
            // setErrorMessage("Connect wallet First");
            setError(true);
            return
        }
        try{

            var x = supply + "000000000000000000"
            if(walletType == "MetaMask")
            {
                let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
                let tempSigner = tempProvider.getSigner();


                let tempContract = new ethers.Contract(contractAddress, DemoToken_Abi, tempSigner);
                console.log("-----transfer metamask");
                let temp = await tempContract.transfer(buyer, x);
                console.log("-----temp----", temp);

                statusChange(item.id, item.listing_id, "Approved");    
            }
            if(walletType == "CoinBase")
            {
                let tempProvider = new ethers.providers.Web3Provider(ethereum);
                let tempSigner = tempProvider.getSigner();


                let tempContract = new ethers.Contract(contractAddress, DemoToken_Abi, tempSigner);
                console.log("-----transfer coinbase");
                let temp = await tempContract.transfer(buyer, x);
                console.log("-----temp----", temp);

                statusChange(item.id, item.listing_id, "Approved");
            }
            //for metamask
            // let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
            // let tempSigner = tempProvider.getSigner();

            
        }
        catch(err)
        {
            console.log("--------err-----", err);
            // setLoading(false);
        }

        


    }

    
    
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
                    <h4 className="card-title mb-3">Listing</h4>
                    {listing.map ((item) =>{
                        return(
                            <div className="col-xxl-6">
                                <div className="card top-bid">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-6">
                                                <img src={item.property_image}
                                                    width="100%"
                                                    alt="..."/></div>
                                            <div className="col-md-6">
                                                <h4 className="card-title">{item.title}</h4>
                                                <p className="text-start">{item.address}</p>
                                                <div className="d-flex justify-content-between mt-3 mb-3">
                                                    <div className="text-start">
                                                        <p className="mb-2">Supply</p>
                                                    </div>
                                                    <div className="text-end">
                                                        <p className="mb-2">
                                                            <strong className="text-primary">{item.available_supply} / {item.total_supply}</strong>
                                                        </p>
                                                        
                                                    </div>
                                                </div>
                                                {isDisplay2? (
                                                    <div className="d-flex justify-content-center">
                                                        <p className="btn btn-info"  onClick={()=>{window.open("https://mumbai.polygonscan.com/token/" + item.contract_address , '_blank', 'noopener,noreferrer')}}>Polygonscan</p>
                                                        <p onClick={()=>{localStorage.setItem('item', item.id);navigate('/item');}} className="btn btn-secondary">Details</p>
                                                    </div>
                                                ):(
                                                    <div className="d-flex justify-content-center">
                                                        <p className="btn btn-primary" onClick={()=>{handleShow(item.owner_wallet_address, item.id, item.contract_address, item.available_supply)}}>Buy</p>
                                                        <p onClick={()=>{localStorage.setItem('item', item.id);navigate('/item');}} className="btn btn-secondary">Details</p>
                                                    </div>
                                                )}
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                    

                    

                    
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
          <Modal.Title>Buy Tokens</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p></p>
        {owner_wallet_address != "" ? (
            <p>Connected Wallet : {truncateAddress(owner_wallet_address)} </p> )
            :
            <p>Wallet Not connected </p>
        }
        <p></p>
         
           <form onSubmit={handleSubmit}>
           <p> Available Supply : {buyTotalSupply}</p>
           <p>Enter No of Tokens</p>

    <input type="text" name="name" value={total_supply} onChange={e => setTotal_supply(e.target.value)} required/>
  <input type="submit" value="Submit" />
  
</form>
        </Modal.Body>
      </Modal>

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

export default Dashboard;