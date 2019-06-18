import React, { Component } from 'react';
import './App.css';
import App from "./App";
import ReactDOM from "react-dom";

import NiftyGatewayJS from '../../NiftyGatewayJS';


var testText = "Testing Route";
var testText2 = "Paragraph functionality"
var RinkebyLegendsContractAddress = '0x37C89ba5EA1Ba5887D711FF041C9910FED56DffA'

function displayUserWalletAddress(){
  //create Nifty Gateway Object
  var nftg = new NiftyGatewayJS('main','WfxvRnV9tn4QYaUJBaf5QVj9SDyxDp')
  //call function to retrieve user info
  return(nftg.getWalletAddressFromStorage());
}

function clearUserWalletAddress(){
  //create Nifty Gateway Object
  var nftg = new NiftyGatewayJS('main','WfxvRnV9tn4QYaUJBaf5QVj9SDyxDp')
  //call function to retrieve user info
  nftg.clearWalletAddressFromStorage();
}

class DemoPage extends Component {

    constructor(){
      super();
        this.state={
          isLoggedIn: false
        }
    }

    onClickSignIn() {
      //create Nifty Gateway object
      var nftg = new NiftyGatewayJS('main','WfxvRnV9tn4QYaUJBaf5QVj9SDyxDp')

      var signInObject = {
        signingMessage:'0x123',
        isRinkeby:'false',
      }
      //call function to retrieve user info
      nftg.getWalletAndEmailAddress(signInObject).then(res => {
        console.log(res,'logging res');

      });
    }

    submitBuyFromOpenSea(){
      //create Nifty Gateway object
      var nftg = new NiftyGatewayJS('main','WfxvRnV9tn4QYaUJBaf5QVj9SDyxDp')

      var openSeaObject = {
        contractAddress: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
        tokenID: 1392934,
        createNiftyWallet: true,
        useWeb3WalletIfAvailable: true,

      }
      //call function to retrieve user info
      nftg.purchaseFromOpenSea(openSeaObject).then(res => {
        console.log('promise resolved')
        console.log(res);
      })

    }

    displayUserWalletAddress(){
      //create Nifty Gateway object

    }

    handleSubmitRinkebyLegendsBuy(){


        console.log('sendPurchaseForTransaction',RinkebyLegendsContractAddress,'RinkebyLegendsContractAddress')
        var nftg = new NiftyGatewayJS('rinkeby','WfxvRnV9tn4QYaUJBaf5QVj9SDyxDp');
        var tokenAddress = RinkebyLegendsContractAddress
        var fun_sig = ('purchaseFor(address)')
        var ex_address = ('0x9c05aC66e0F709BfCa556cbcc57CE189C00CdCcd')
        var user_add = ('0x73E3D5240ea617057c056DfDD6bD000a1949ba')
        var args = ['userAddress']
        var purchaseForObject = {
          value: '0',
          contractAddress: tokenAddress,
          purchaseForFunction: fun_sig,
          argsList: args,
          displayTitle: 'Rinkeby Legends Pack',
          displayImageURL:'https://s3.amazonaws.com/matterhornphotostorage/JCR.png',
          useWeb3WalletIfAvailable: true,
        }

      nftg.sendPurchaseForTransaction(purchaseForObject).then(res => {
        console.log('promise resolved')
        console.log(res);
      })


    }

    render() {
      var nftg = new NiftyGatewayJS('main','WfxvRnV9tn4QYaUJBaf5QVj9SDyxDp');
      var userWalletAddress = nftg.getWalletAddressFromStorage();
          return(
            <div style={{display:"flex",width:'100%',flexDirection:"column",alignItems:'center',justifyContent:'center',marginTop:"100px"}}>

            <div className="HoverButton" onClick={()=>{this.onClickSignIn()}} style={{width:'274px',height:'56px',backgroundColor:'white',borderStyle:'solid',borderWidth:'1px',borderColor:'#C7C7C7',borderRadius:'10px',display:"flex",flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
              <img src={'https://s3.amazonaws.com/matterhornphotostorage/FaviconNFTG.png'} style={{marginLeft:'15px',width:'35px',marginRight:'10px'}} />
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}}>
                <text className="BodyMedium" style={{fontSize:'12px',color:'#FF0000'}}>Not Signed In With Nifty Gateway</text>
                <text className="BodyMedium" style={{fontSize:'17px',color:"#333",marginTop:'3px'}}>{"Click here to Sign In"}</text>
              </div>
            </div>

            <text className="bodyNormal" style={{marginTop:"50px"}}>User wallet address is: {userWalletAddress}</text>

            <p style={{marginTop:"20px",textAlign:'right',alignSelf:"left"}}>{testText}</p>
            <p style={{marginTop:"0px",textAlign:'left',alignSelf:"left"}}>{testText2}</p>

            <text onClick={()=>{clearUserWalletAddress();window.location.reload()}}>Clear Cookie</text>

            <div className="HoverButton" onClick={()=>{this.submitBuyFromOpenSea()}} style={{marginTop:'20px',width:'274px',height:'56px',backgroundColor:'white',borderStyle:'solid',borderWidth:'1px',borderColor:'#C7C7C7',borderRadius:'10px',display:"flex",flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                <text className="BodyMedium" style={{fontSize:'15px',color:'#333'}}>Buy from Open Sea</text>

            </div>

            <div className="HoverButton" onClick={()=>{this.handleSubmitRinkebyLegendsBuy()}} style={{marginTop:'20px',width:'274px',height:'56px',backgroundColor:'white',borderStyle:'solid',borderWidth:'1px',borderColor:'#C7C7C7',borderRadius:'10px',display:"flex",flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                <text className="BodyMedium" style={{fontSize:'15px',color:'#333'}}>Purhcase For Buy</text>

            </div>

            </div>
        )
      }

    }

export default DemoPage;
