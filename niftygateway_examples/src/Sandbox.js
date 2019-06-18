import React, { Component } from 'react';
import './App.css';
import App from "./App";
import ReactDOM from "react-dom";
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import NiftyGatewayJS from '../../NiftyGatewayJS';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {FaChevronDown} from 'react-icons/fa';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';

var hello = 'someCode';

const code = `import NiftyGatewayJS from 'NiftyGatewayJS';

  function onSubmitPurchase(){
    contractAddress:`+'hello,'+`
    value: .05,
  }
`;

var testText = "Testing Route";
var testText2 = "Paragraph functionality"

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
  return(nftg.clearWalletAddressStoredInStorage());
}

var sampleInputsArray = [
  {'Name':"contract address",'RequiredTrueOrFalse':true,'Description':'This is the contract address of your project.','Value':''},
  {'Name':"value",'RequiredTrueOrFalse':true,'Description':'This is the value of the purchase, in eth.','Value':''},
  {'Name':"purchase for function",'RequiredTrueOrFalse':true,'Description':'This is the function signature of the purchaseFor function of your smart contract.','Value':''},
  {'Name':"args list",'RequiredTrueOrFalse':true,'Description':"This is the list of arguments for your purchaseFor function - it's structure depends on how your purchasefor is structured. If you need to enter a placeholder value for the address the user sends their transacitno to, simply put 'userAddress'",'Value':''},
  {'Name':"display title",'RequiredTrueOrFalse':true,'Description':"This is the title of the purchase that gets displayed in the Nifty popup window. If you change this here, you'll see a change in what gets displayed in the popup window.",'Value':''},
  {'Name':"display image url",'RequiredTrueOrFalse':true,'Description':'This is the image url of the NFT that gets displayed in the popup window.','Value':''},
  {'Name':"create nifty wallet",'RequiredTrueOrFalse':false,'Description':'If this is false, a user will not be prompted to create a Nifty Wallet for this purchase. Should be used if you want the purchase going to a different wallet.','Value':''},
]

function submitPurchaseFunction(contractAddress,value,purchaseForFunction,argsList,displayTitle,displayImageURL,createNiftyWallet,devKey){

  if(devKey===null||devKey===''||devKey===undefined){
    devKey= 'WfxvRnV9tn4QYaUJBaf5QVj9SDyxDp';
  }

  var nftg = new NiftyGatewayJS('main',devKey);

  var purchaseForObject = {
    contractAddress: contractAddress,
    value: value,
    purchaseForFunction: purchaseForFunction,
    argsList: argsList,
    displayTitle: displayTitle,
    displayImageURL: displayImageURL,
    createNiftyWallet: createNiftyWallet,
  }

  nftg.sendPurchaseForTransaction(purchaseForObject).then(res => (
    console.log(res,'logging res')
  ))


}

class DemoPage extends Component {
    constructor(){
      super();
        this.state={
          isLoggedIn: false,
          code: code,
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
            <div style={{display:"flex",width:'100%',flexDirection:"column",alignItems:'center',justifyContent:'center'}}>

                  <div style={{display:"flex",width:'100%',flexDirection:"column",alignItems:'center',justifyContent:'center',marginTop:"20px"}}>


                          <div style={{width:"1150px",borderStyle:'solid',borderWidth:'0px',borderBottomWidth:'1px',borderColor:'#979797',display:'flex',flexDirection:'column',alignItems:"center",justifyContent:'center'}}>

                                <img src={'https://s3-us-west-1.amazonaws.com/nftgimagebucket/NFTGLogo.png'} style={{width:'60px',marginBottom:'10px'}} />

                                <text className="BodyNormal" style={{fontSize:'26px',color:'#2a2a2a',marginBottom:'5px',width:'390px'}}>Nifty Wallet - Developer Sandbox</text>

                                <text className="BodyNormal" style={{fontSize:'15px',color:'#B6B6B6',marginBottom:'10px',width:'1000px'}}>Use this sandbox to preview, demo, and get code for the functions the Nifty Wallet can perform. This page uses the <a style={{color:"#0074DB",textDecoration:'underline'}} href="https://www.npmjs.com/package/niftygateway" target="npmpackagefromsandbox"> Nifty Gateway npm package.</a> </text>


                          </div>


                          <div style={{width:'1050px',display:"flex",flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

                                  <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'flex-start',justifyContent:'center',flex:1,borderStyle:'solid',borderWidth:'0px',borderBottomWidth:'1px',borderColor:'#979797',}}>



                                        <div style={{flex:.5,borderStyle:'solid',borderWidth:'0px',borderColor:'#333',display:'flex',flexDirection:'column',alignItems:"flex-start",justifyContent:'flex-start',alignSelf:'flex-start'}} >

                                            <text className="BodyNormal" style={{marginLeft:'20px',width:"425px",fontSize:"15px",color:'#CCCCCC',marginBottom:'30px',marginTop:"35px"}}>Function: <text className="HoverButton" onClick={()=>{scroll.scrollToBottom()}} style={{color:'#2196F3',marginLeft:'5px',textDecoration:'underline'}}>See all functions <FaChevronDown style={{fontSize:"12px",marginBottom:'-2px'}}/></text> </text>

                                            <text className="BodyNormal" style={{marginLeft:'20px',width:"425px",fontSize:"25px",color:'#333333',marginBottom:'7.5px'}}>Purchase Function:</text>

                                            <text className="BodyNormal" style={{marginLeft:'20px',width:'425px',fontSize:'16px',color:'#666',marginBottom:'25px'}}>This lets a user purchase an NFT from your project using the Nifty Wallet, meaning they can pay with a credit card. This transaction comes from a worker wallet and can include a value transfer of ETH - unlike a regular transaction, which cannot.</text>

                                            {sampleInputsArray.map((l,i) => (
                                              <div style={{alignSelf:'center',width:"455px",display:'flex',flexDirection:"column",alignItems:'flex-start',justifyContent:'flex-start',marginTop:'8px'}}>

                                                  <div style={{marginLeft:'12.5px',display:'flex',flexDirection:'row',alignItems:"flex-start",justifyContent:'flex-start',marginBottom:'1.5px'}}>
                                                    <text className="BodyMedium" style={{textTransform:'uppercase',color:'#AAAAAA',fontSize:'13px'}}>{l.Name} -</text>
                                                    {l.RequiredTrueOrFalse===true?
                                                      <text className="BodyNormal" style={{textTransform:'uppercase',color:'#F72F2F',fontSize:'13px',marginLeft:'2px'}}> Required</text>
                                                      :
                                                      <text className="BodyNormal" style={{textTransform:'uppercase',color:'#079D00',fontSize:'13px',marginLeft:'2px'}}> Optional</text>
                                                    }

                                                </div>

                                                <input style={{fontSize:'15px',borderStyle:'solid',borderColor:'#aaa',borderWidth:'1px',width:'425px',padding:'5px',paddingLeft:'10px',height:'25px',borderRadius:'5px',color:'#666',marginBottom:'.5px'}} />

                                                <text className="BodySemiBold" style={{textAlign:'center',color:'#333',fontSize:'11px',alignSelf:'center',marginBottom:'16px'}}>{l.Description}</text>


                                              </div>
                                            ))}

                                            <div style={{height:'40px'}} />

                                        </div>


                                        <div style={{width:'525px',flex:.5,borderStyle:'solid',borderWidth:'0px',borderColor:'red',display:'flex',flexDirection:'column',alignItems:"flex-start",justifyContent:'flex-start'}} >

                                            <text className="BodyNormal" style={{alignSelf:"flex-start",marginLeft:'20px',width:"425px",fontSize:"15px",color:'#CCCCCC',marginBottom:'3.5px',marginTop:"35px"}}>Code:</text>

                                            <Editor
                                              value={this.state.code}
                                              onValueChange={code => this.setState({ code:code })}
                                              highlight={code => highlight(code, languages.js)}
                                              padding={10}
                                              style={{
                                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                                fontSize: 15,
                                                width:'600px',
                                                height:'600px',
                                                backgroundColor:"#fff",
                                                borderStyle:'solid',
                                                borderWidth:'1px',
                                                borderColor:'#acacac',
                                                borderRadius:'5px',
                                                marginLeft:'25px',
                                                marginTop:'30px',
                                                overflow:'scroll',
                                              }}
                                            />


                                        </div>

                                  </div>

                                  <div style={{marginTop:'20px',display:"flex",flexDirection:"column",alignItems:'flex-start',justifyContent:'flex-start',marginBottom:'10px'}}>

                                    <div style={{display:"flex",flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',marginLeft:'40px'}}>

                                        <text className="BodySemiBold" style={{fontSize:'35px',color:"#333",alignSelf:'flex-start',marginBottom:'15px',marginTop:'25px'}}>All Functions</text>

                                        <text className="BodyNormal" style={{fontSize:'20px',color:"#CCCCCC",alignSelf:'flex-start',marginBottom:'35px'}}>Pick a function to preview code and demo functionality:</text>

                                        <div style={{display:"flex",flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',marginBottom:'30px'}}>
                                            <text className="BodyNormal" style={{fontSize:'25px',color:"#333",alignSelf:'flex-start',marginBottom:'7.5px'}}>Getting a User’s Info:</text>

                                            <text className="BodyNormal" style={{fontSize:'16px',color:'#666',marginBottom:'15px'}}>These are the functions that prompt a user to sign in with Nifty Gateway, giving your project access to their wallet
address and email. After they’ve signed in, we’ll store their wallet address for you and you can retrieve it.</text>

                                            <div style={{marginBottom:'15px',display:'flex',flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',}}>
                                                <Button variant="contained" color="primary" style={{marginRight:'30px'}}>
                                                  Prompt Sign In With Nifty Gateway
                                                </Button>

                                                <Button variant="contained" color="primary" style={{marginRight:'30px'}}>
                                                  Retrieve Wallet info from storage
                                                </Button>

                                                <Button variant="contained" color="primary" style={{marginRight:'0px'}}>
                                                  Clear Wallet info from storage
                                                </Button>

                                            </div>

                                        </div>

                                        <div style={{display:"flex",flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',marginBottom:'30px'}}>
                                        <text className="BodyNormal" style={{fontSize:'25px',color:"#333",alignSelf:'flex-start',marginBottom:'7.5px'}}>Purchasing Functions - Have your users purchase NFTs with Nifty Gateway, letting them pay with just a credit card</text>

                                        <text className="BodyNormal" style={{fontSize:'16px',color:'#666',marginBottom:'15px'}}>These are functions that let people purchase your NFTs using a credit card through Nifty Gateway. This comes from a worker wallet, and can include a value transfer of ETH.</text>

                                        <div style={{marginBottom:'15px',display:'flex',flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',}}>
                                            <Button variant="contained" color="primary" style={{marginRight:'30px'}}>
                                              Purchase Function
                                            </Button>

                                            <Button variant="contained" color="primary" style={{marginRight:'0px'}}>
                                              Purchase From Open Sea Function
                                            </Button>

                                        </div>
                                        </div>

                                        <div style={{display:"flex",flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',marginBottom:'0px'}}>
                                            <text className="BodyNormal" style={{fontSize:'25px',color:"#333",alignSelf:'flex-start',marginBottom:'7.5px'}}>Regular Transaction Functions - Send any blockchain transaction with Nifty Gateway, we cover gas fees</text>

                                            <text className="BodyNormal" style={{fontSize:'16px',color:'#666',marginBottom:'15px'}}>These are the functions that let you have a user call any transaction with their Nifty Wallet. All transaction fees
are funded by Nifty Gateway, so your user will not have to pay them. Comes from the User’s Nifty Wallet. Unlike a Purchasing Function, these cannot involve a value transfer of Ethereum. However, you can still call any regular transaction from the Nifty Wallet. This transaction will come from a user's Nifty wallet, whereas a purchasing function will come from a Nifty Gateway worker wallet.</text>

                                            <div style={{marginBottom:'15px',display:'flex',flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',}}>
                                                <Button variant="contained" color="primary" style={{marginRight:'30px'}}>
                                                  Send Transaction
                                                </Button>


                                            </div>

                                        </div>

                                    </div>

                                  </div>

                          </div>

                  </div>

            </div>
        )
      }
    }

export default DemoPage;
