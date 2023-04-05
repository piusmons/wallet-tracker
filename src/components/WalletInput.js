import { Network, Alchemy } from 'alchemy-sdk';
import React, { useState, useEffect } from 'react';


const settings = {
    apiKey: "Vdfcrf_EvCuslHJJT9xNkCsm2upJbifm",
    network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(settings);




export default function WalletInput() {
    
    const [text, setText] = useState('');
    const [wallet, setWallet] = useState('');
    const [walletData, setWalletData] = useState([]);
    

    function onChangeHandler(event){

        setText(event.target.value);
        
        console.log(text)

    }

    function walletSubmitHandler(e) {
        
        setWallet(text);
        const userTrack = text
        
        
        alchemy.nft.getNftsForOwner(userTrack).then(data => {
            let walletData = data
            
            const ownedNfts = walletData.ownedNfts.map(item => {return {name : item.contract?.name, id: item.tokenId}})
            setWalletData(ownedNfts)
            console.log(ownedNfts)
            
            
            
            
            
        })

        

        
        

    }
    
    return (
      <div>

        <form onSubmit={e => {
            e.preventDefault();
            walletSubmitHandler(text);
        }}>
            <input onChange={onChangeHandler} value={text}></input>
            <button>Track</button>
        </form>
        
        <div>
         {walletData.map((item, index) => (<><h1 key={index}>{item.name}</h1> <h1>{item.id}</h1></>))} 
        </div>
        
      </div>
    );
  }


