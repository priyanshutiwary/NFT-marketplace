  import React from 'react';
  import { useState } from "react";
  import Navigation from './Navigation';
  import imageadd from '../assets/imageadd.png';
  import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
  import Marketplace from '../Marketplace.json'
  import { useLocation } from "react-router";

  const Create = () => {
    const activePage = 'Create';
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const location = useLocation();

    async function disableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = true
        listButton.style.backgroundColor = "grey";
        listButton.style.opacity = 0.3;
    }

    async function enableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = false
        listButton.style.backgroundColor = "#A500FF";
        listButton.style.opacity = 1;
    }

    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            disableButton();
            updateMessage("Uploading image.. please dont click anything!")
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                enableButton();
                updateMessage("")
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        const {name, description, price} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !price || !fileURL)
        {
            updateMessage("Please fill all the fields!")
            return -1;
        }

        const nftJSON = {
            name, description, price, image: fileURL
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listNFT(e) {
        e.preventDefault();

        //Upload data to IPFS
        try {
            const metadataURL = await uploadMetadataToIPFS();
            if(metadataURL === -1)
                return;
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            disableButton();
            updateMessage("Uploading NFT(takes 5 mins).. please dont click anything!")

            //Pull the deployed contract instance
            let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

            //massage the params to be sent to the create NFT request
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()

            //actually create the NFT
            let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
            await transaction.wait()

            alert("Successfully listed your NFT!");
            enableButton();
            updateMessage("");
            updateFormParams({ name: '', description: '', price: ''});
            window.location.replace("/")
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }

    console.log("Working", process.env);

    return (
      <div>
        <Navigation activePage={activePage} />
        <div>
        <div className="flex justify-center items-center">
         <div className="bg-gray-300 w-28 h-28 sm:w-28 mb-16 sm:h-40 relative top-16 md:w-48 md:h-60 p-2 flex justify-center items-center transition duration-300">
           <img className="w-12 h-12" src={imageadd} alt="Add-image" />
          <br />
          <input className=" bg-black text-white relative rounded-lg" type="file" name="fileToUpload" id="fileToUpload" />
        </div>
      </div>


        <div className='flex flex-col items-center justify-center h-full top-20 relative'>
          <div className='bg-gray-300 p-8 rounded-lg'>


            <form className='flex flex-col gap-4'>  
              <div className='flex flex-col'>
                <label htmlFor='title'>Title:</label>
                <input className='border border-gray-400 rounded' type='text' id='title' required name='title' />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='description'>Description:</label>
                <textarea className='px-4 py-2 border border-gray-400 rounded' id='description' name='description' required></textarea>
              </div>

              <div className='flex flex-col'>
                <label htmlFor='price'>Price:</label>
                <input className='px-4 py-2 border border-gray-400 rounded' id='price' name='price' pattern='[0-9]+(\.[0-9]{1,2})?' />
              </div>

              <div className='flex justify-center'>
                <button className='bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-2xl transition duration-300' type='submit'>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  };

  export default Create;
