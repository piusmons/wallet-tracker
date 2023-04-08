import { Network, Alchemy } from 'alchemy-sdk';
import React, { useState } from 'react';


const settings = {
    apiKey: "Vdfcrf_EvCuslHJJT9xNkCsm2upJbifm",
    network: Network.ETH_MAINNET
    
};

const alchemy = new Alchemy(settings);



export default function WalletInput() {
    
    const [text, setText] = useState('');
    const [walletHoldings, setWalletHoldings] = useState([])
    const [tokenEvent, setTokenEvent] = useState([])
    function onChangeHandler(event){

        setText(event.target.value);
        
        
    }

    function walletSubmitHandler(e) {
          
        const userTrack = text
        
        alchemy.nft.getNftsForOwner(userTrack).then(data => {
            let walletData = data
            
            let walletData2 = walletData.ownedNfts.map(item => {return {name : item.contract?.name, id: item.tokenId}})
            setWalletHoldings(walletData2)
        
        
        
        alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: userTrack,
            excludeZeroValue: true,
            category: ["erc721", "erc1155"],
        }).then(data => {
            let tokenMove = data
            let tokenMove2 = tokenMove["transfers"].map(token => {return {tokenType : token.tokenId, receiver: token.to}})
            setTokenEvent(tokenMove2)
            console.log(tokenMove2)
            
        })
            
        
            
            
        })        

    }

    
    
    return (

        
      <div className="inputMainContainer">
        <h1 className='appName'>Ethereum Wallet Tracker</h1>
        
            <form className="form" onSubmit={e => {
                e.preventDefault();
                walletSubmitHandler(text);
            }}>
                <input className="inputField" onChange={onChangeHandler} value={text}></input>

                <button className="trackButton">🔍</button>
            </form>       
            <p>try typing in "dingaling.eth"</p>
           
        <div>
            <h2>NFTs</h2>
            <div className="vertical-menu"> 
            {walletHoldings.map((item, index) => (<ul key={index}><li >{item.name} {item.id}</li> </ul>))}
            </div>
            <h2>Transfers</h2>
            <div className='transferContainer'>

            <div className='vertical-menu'>
                <b>Token type</b>
                {tokenEvent.map((item, index) => (<ul key={index}><li>{item.tokenType}</li></ul>) )}
            </div>
            <div className='vertical-menu'>
                <b>Receiver</b>
                {tokenEvent.map((item, index) => (<ul key={index}><li>{item.receiver}</li></ul>) )}
            </div>
            </div>

            
            
        </div>
      </div>

      
    );
  }



