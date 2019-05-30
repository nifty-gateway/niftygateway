import React, { Component } from 'react';
import './App.css';
import App from "./App";
import ReactDOM from "react-dom";

import NiftyGatewayJS from '../../NiftyGatewayJS';


var testText = "Testing Route";
var testText2 = "Paragraph functionality"

function displayUserWalletAddress(){
  //create Nifty Gateway Object
  var nftg = new NiftyGatewayJS('main','WfxvRnV9tn4QYaUJBaf5QVj9SDyxDp')
  //call function to retrieve user info
  return(nftg.getWalletAddressFromStorage());
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
      //call function to retrieve user info
      nftg.getWalletAndEmailAddress().then(res => {
        console.log(res,'logging res');
      });
    }

    displayUserWalletAddress(){
      //create Nifty Gateway object

    }

    render() {
          return(
            <div style={{display:"flex",width:'100%',flexDirection:"column",alignItems:'center',justifyContent:'center',marginTop:"100px"}}>

            <div className="HoverButton" onClick={()=>{this.onClickSignIn()}} style={{width:'274px',height:'56px',backgroundColor:'white',borderStyle:'solid',borderWidth:'1px',borderColor:'#C7C7C7',borderRadius:'10px',display:"flex",flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
              <img src={'https://s3.amazonaws.com/matterhornphotostorage/FaviconNFTG.png'} style={{marginLeft:'15px',width:'35px',marginRight:'10px'}} />
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}}>
                <text className="BodyMedium" style={{fontSize:'12px',color:'#FF0000'}}>Not Signed In With Nifty Gateway</text>
                <text className="BodyMedium" style={{fontSize:'17px',color:"#333",marginTop:'3px'}}>{"Click here to Sign In"}</text>
              </div>
            </div>

            <text onClick={()=>{alert("User wallet address is:" + displayUserWalletAddress())}} className="bodyNormal" style={{marginTop:"50px"}}>User wallet address is: {displayUserWalletAddress()}</text>

            <p style={{marginTop:"20px",textAlign:'right',alignSelf:"left"}}>{testText}</p>
            <p style={{marginTop:"0px",textAlign:'left',alignSelf:"left"}}>{testText2}</p>

            </div>
        )
      }
    }

export default DemoPage;
