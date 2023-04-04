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
    const [name, setName] = useState([]);

    function onChangeHandler(event){

        setText(event.target.value);
        
        console.log(text)

    }

    function walletSubmitHandler(e) {
        
        setWallet(text);
        const userTrack = text
        
        alchemy.nft.getNftsForOwner(userTrack).then(data => {
            let walletData = data
            const ownedNfts = walletData.ownedNfts.map(function (item) {
                return item.contract?.name 
                
            })
            
            setName(ownedNfts);
            
            
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
            {name?.map((item) => (<h1>{item}</h1>))}
        </div>
        
      </div>
    );
  }