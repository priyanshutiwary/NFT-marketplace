import React from 'react';
import { useState, useEffect } from "react";

const Navigation = ({ activePage }) => {

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
  return (
    <div>
      <div className='text-gray-200 bg-gray-800 font-bold text-xl h-16 flex flex-row items-center px-4 sm:px-6 md:px-8'>
        <a href="/Home" className={`${
          activePage === 'Home' ? 'text-purple-700' : 'text-white'
        } text-sm sm:text-base lg:text-lg xl:text-xl mr-4 sm:mr-6`}>
          Home
        </a>
        <a href="/Explore" className={`${
          activePage === 'Explore' ? 'text-purple-700' : 'text-white'
        } text-sm sm:text-base lg:text-lg xl:text-xl mr-4 sm:mr-6`}>
          Explore
        </a>
        {/* <a href="/Sell" className={`${
          activePage === 'Sell' ? 'text-purple-700' : 'text-white'
        } text-sm sm:text-base lg:text-lg xl:text-xl mr-4 sm:mr-6`}>
          Sell
        </a> */}
        <a href="/Create" className={`${
          activePage === 'Create' ? 'text-purple-700' : 'text-white'
        } text-sm sm:text-base lg:text-lg xl:text-xl`}>
          Create
        </a>
      </div>
      <div className="absolute right-0 top-0  h-16 w-1/3 flex flex-row items-center justify-end sm:pr-20  pr-4">
          <button
            onClick={connectWallet}
            className=" text-lgfocus:border-spacing-6 border-white   relative right-0 bg-purple-700 hover:bg-purple-800  font-bold py-2 px-2 rounded-xl hover:text-gray-950 text-black transition duration-300 "
          >
            { walletAddress && walletAddress.length>0?`${walletAddress.substring(0,4)}..${walletAddress.substring(38)}`:"connect"}
          </button>
        </div>
    </div>
  );
};

export default Navigation;
