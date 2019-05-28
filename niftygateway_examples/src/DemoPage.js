import React, { Component } from 'react';
import './App.css';
import App from "./App";
import ReactDOM from "react-dom";

import NiftyGatewayJS from '../../NiftyGatewayJS';

class DemoPage extends Component {
    constructor(){
      super();
        this.state={
          isLoggedIn: false
        }
    }

    onClickSignIn() {
      //create Nifty Gateway object
      var nftg = new NiftyGatewayJS('rinkeby','WfxvRnV9tn4QYaUJBaf5QVj9SDyxDp')
      //call function to retrieve user info
      nftg.getWalletAndEmailAddress().then(res => {
        console.log(res,'logging res');
      });
    }

    render() {
          return(
            <div className="HoverButton" onClick={()=>{this.onClickSignIn()}} style={{width:'274px',height:'56px',backgroundColor:'white',borderStyle:'solid',borderWidth:'1px',borderColor:'#C7C7C7',borderRadius:'10px',display:"flex",flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
              <img src={'https://s3.amazonaws.com/matterhornphotostorage/FaviconNFTG.png'} style={{marginLeft:'15px',width:'35px',marginRight:'10px'}} />
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}}>
                <text className="BodyMedium" style={{fontSize:'12px',color:'#FF0000'}}>Not Signed In With Nifty Gateway</text>
                <text className="BodyMedium" style={{fontSize:'17px',color:"#333",marginTop:'3px'}}>{"Click here to Sign In"}</text>
              </div>
            </div>
        )
      }
    }

export default DemoPage;
