import {React, useEffect, useState} from 'react';
import {ethers, ContractFactory} from 'ethers';
import {Link} from 'react-router-dom';
//import DemoToken_Abi from '../artifacts/contracts/DemoToken.sol/DemoToken.json';
// import DemoToken_Bytecode from '../artifacts/build-info/85160e02a4dfdc9d803061ba76d1b1ae.json';  
import DemoToken_Abi from '../Contracts/simple_token_abi.json'; 
import DemoToken_Bytecode from '../Contracts/simpleTokenBytecode'

const Header = () => {

	
	let contractAddress = '0x41134f490B9215C02ffF73c9d83F3eBFC3EbB2EA';

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [balance, setBalance] = useState(null);
    const [transferHash, setTransferHash] = useState(null);

     const connectWalletHandlerTemp = async () => {
        // const bytecode = "0x608060405234801561001057600080fd5b506040516103bc3803806103bc83398101604081905261002f9161007c565b60405181815233906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a333600090815260208190526040902055610094565b60006020828403121561008d578081fd5b5051919050565b610319806100a36000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063313ce5671461005157806370a082311461006557806395d89b411461009c578063a9059cbb146100c5575b600080fd5b604051601281526020015b60405180910390f35b61008e610073366004610201565b6001600160a01b031660009081526020819052604090205490565b60405190815260200161005c565b604080518082018252600781526626bcaa37b5b2b760c91b6020820152905161005c919061024b565b6100d86100d3366004610222565b6100e8565b604051901515815260200161005c565b3360009081526020819052604081205482111561014b5760405162461bcd60e51b815260206004820152601a60248201527f696e73756666696369656e7420746f6b656e2062616c616e6365000000000000604482015260640160405180910390fd5b336000908152602081905260408120805484929061016a9084906102b6565b90915550506001600160a01b0383166000908152602081905260408120805484929061019790849061029e565b90915550506040518281526001600160a01b0384169033907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a350600192915050565b80356001600160a01b03811681146101fc57600080fd5b919050565b600060208284031215610212578081fd5b61021b826101e5565b9392505050565b60008060408385031215610234578081fd5b61023d836101e5565b946020939093013593505050565b6000602080835283518082850152825b818110156102775785810183015185820160400152820161025b565b818111156102885783604083870101525b50601f01601f1916929092016040019392505050565b600082198211156102b1576102b16102cd565b500190565b6000828210156102c8576102c86102cd565b500390565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220d80384ce584e101c5b92e4ee9b7871262285070dbcd2d71f99601f0f4fcecd2364736f6c63430008040033";

        // let tempProvider = new ethers.getDefaultProvider("https://polygon-mumbai.infura.io/v3/2fc633a5df2141d68ac1bf7dbc620710")
        // (network, {
        //     infura: {
        //       projectId: "2fc633a5df2141d68ac1bf7dbc620710",
        //       projectSecret: "61fbb493c1234ac8bc2046a1514939e8",
        //     },
        // });
        
        try{

            let tempProvider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/2fc633a5df2141d68ac1bf7dbc620710");
            const mnemonic = "lounge burst fiber sunset soap room bundle nominee ill amount online antenna";
            const wallet = ethers.Wallet.fromMnemonic(mnemonic);
            console.log("--------wallet----", wallet);
            const account = wallet.connect(provider);
            console.log("---tempProvider----", account);
            let tempSigner = tempProvider.getSigner();
            console.log("---tempsigner----", tempSigner);

            const factory = new ContractFactory(DemoToken_Abi, DemoToken_Bytecode, account);
            console.log("-------1111--------", factory);
            const contract = await factory.deploy("555" + "000000000000000000");
            console.log("-------22222--------");
            let address = contract.address;
            console.log("-------33333--------");
            let details = await contract.deployTransaction.wait();
            console.log("----address---", address, "-----details------", details);
        }
        catch(err)
        {
            console.log("--------err-----", err);
        }
        
        


    }



    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {

            window.ethereum.request({ method: 'eth_requestAccounts'})
            .then(result => {
                console.log("result[0]", result[0])
                accountChangedHandler(result[0]);
                setConnButtonText('Wallet Connected');
            })
            .catch(error => {
                setErrorMessage(error.message);
            
            });

        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    }

    // update account, will cause component re-render
    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        updateEthers();
    }

    const updateBalance = async () => {
        let balanceBigN = await contract.balanceOf(defaultAccount);
        console.log("try1 : ", balanceBigN);
        let balanceNumber = balanceBigN.toString();

        let tokenDecimals = await contract.decimals();
        let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);

        let tokenName = await contract.name();
        let tokenSymbol = await contract.symbol();
        console.log("try2 : ", tokenName, "------------", tokenSymbol, "-----------", tokenBalance);
        setTokenName(tokenName);
        setTokenSymbol(tokenSymbol);

        setBalance(toFixed(tokenBalance));  


    }

   function toFixed(x) {
   if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
         x *= Math.pow(10, e - 1);
         x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
   } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
         e -= 20;
         x /= Math.pow(10, e);
         x += (new Array(e + 1)).join('0');
      }
   }
   return x;
}

    const chainChangedHandler = () => {
        // reload the page to avoid any errors with chain change mid use of application
        window.location.reload();
    }

    // listen for account changes
    // window.ethereum.on('accountsChanged', accountChangedHandler);

    // window.ethereum.on('chainChanged', chainChangedHandler);

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        let tempContract = new ethers.Contract(contractAddress, DemoToken_Abi, tempSigner);
        setContract(tempContract);  
    }

    useEffect(() => {
        if (contract != null) {
            updateBalance();
            updateTokenName();
        }
    }, [contract]);

    const updateTokenName = async () => {
        setTokenName(await contract.name());
    }



	return (
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
                                        <li className="nav-item dropdown"><Link to="/dashboard">Home</Link>
                                        </li>
                                        <li className="nav-item"><a className="nav-link" href="./explore.html">Explore</a></li>
                                        <li className="nav-item"><a className="nav-link" href="./item.html">Item</a></li>
                                        <li className="nav-item"><a className="nav-link" href="./collection.html">Collection</a>
                                        </li>
                                        <li className="nav-item"><a className="nav-link" href="./profile.html">Profile</a></li>
                                        <li className="nav-item"><a className="nav-link" href="./upload">Upload</a></li>
                                        <li className="nav-item"><Link to="/dashboard">Dashboard</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="signin-btn d-flex align-items-center">
                                    <div className="dark-light-toggle theme-switch" onclick="themeToggle()">
                                        <span className="dark"><i className="ri-moon-line"></i></span>
                                        <span className="light"><i className="ri-sun-line"></i></span>
                                    </div>

                                    {/*<a className="btn btn-primary" href="./connect.html">Connect</a>*/}
                                    <button className="btn btn-primary" onClick={connectWalletHandler}>{connButtonText}</button>
                                    <button className="btn btn-primary" onClick={connectWalletHandlerTemp}>Mint</button>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	)
}

export default Header;