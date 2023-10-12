import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';

const Home = () => {
  const[walletAddress,setwalletAddress]=useState("");
  useEffect(()=>{
    getConnectedWallet();
  });

  useEffect(()=>{
    addWalletListener();
  });
  const connectWallet = async() => {
    if (typeof window !="undefined" && typeof window.ethereum != "undefined" ){
      try{
        //metamusk is installed 
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        setwalletAddress(accounts[0]);
        console.log(accounts[0]);
      }catch(err){
        console.error(err.message);
      }
      
    }else{
      alert("please install metamusk")
    }
  }

  const getConnectedWallet = async() => {
    if (typeof window !="undefined" && typeof window.ethereum != "undefined" ){
      try{
        //metamusk is installed 
        const accounts = await window.ethereum.request({method: "eth_accounts"});
        if(accounts.length>0){
          setwalletAddress(accounts[0]);
          
        }
        
      }catch(err){
        console.error(err.message);
      }
      
    }
  }

  const addWalletListener = async() => {
    if (typeof window !="undefined" && typeof window.ethereum != "undefined" ){
      try{
        window.ethereum.on("accountsChanged",(accounts)=>{
          setwalletAddress(accounts[0]);

        }) 
        
        
      }catch(err){
        console.error(err.message);
      }
      
    }
  }

  

  const activePage = 'Home';

  return (
    <>
      <div className="">
        <Navigation activePage={activePage} />
        <div className="absolute right-0 top-0  h-16 w-1/3 flex flex-row items-center justify-end sm:pr-20  pr-4">
          <button
            onClick={connectWallet}
            className=" text-lgfocus:border-spacing-6 border-white   relative right-0 bg-purple-700 hover:bg-purple-800  font-bold py-2 px-2 rounded-xl hover:text-gray-950 text-black transition duration-300 "
          >
            { walletAddress && walletAddress.length>0?`${walletAddress.substring(0,4)}..${walletAddress.substring(38)}`:"connect"}
          </button>
        </div>
        <div className="w-full sm:w-3/4 p-24">
          <h1 className="text-gray-200">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel quos quibusdam, quidem deleniti blanditiis animi
            eum ducimus obcaecati dolores? Maiores molestias, quae sapiente voluptatum nobis aspernatur maxime perferendis
            culpa officiis!
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
