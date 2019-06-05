"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWalletAndEmailAddressPromise = getWalletAndEmailAddressPromise;
exports.createRegularTransactionPromise = createRegularTransactionPromise;
exports.createOpenSeaPromise = createOpenSeaPromise;
exports.createPurchaseForPromise = createPurchaseForPromise;

var _web3EthAbi = require("web3-eth-abi");

var Utils = _interopRequireWildcard(require("web3-utils"));

var _windowFunctions = _interopRequireDefault(require("./window/windowFunctions.js"));

var _validationFunctions = require("./validationFunctions.js");

var _config = require("./util/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var abiCoder = new _web3EthAbi.AbiCoder();

function getWalletAndEmailAddressPromise(_this,signInObject) {
  // url to open
  var url = _config.niftyGatewayOrigin + '/#/loginwithniftygateway/';

  if (_this.network == 'rinkeby') {
    var url = _config.niftyGatewayRinkebyOrigin + '/#/loginwithniftygateway/';
  }

  var timestampOriginal = new Date();
  var timestampInUnixTime = timestampOriginal.getTime();
  var popup = window.open(url, timestampInUnixTime, 'width=500,height=800'); // message Nifty Gateway so it can store this window location

  var counter = 0;
  var seconds_interval = 1500;
  var number_of_times = 30;
  var signingMessage = signInObject!==undefined?signInObject.signingMessage:null;
  var isRinkeby = signInObject!==undefined?signInObject.isRinkeby:null;

  var authInfo = {
    network: _this.network,
    authKey: _this.auth_key,
    signingMessage: signingMessage,
    isRinkeby: isRinkeby,
  };
  window.messageConfirmed = false; //messaging is recursive

  window.messagePopUpWindow(popup, counter, number_of_times, seconds_interval, authInfo); //once contact has been made, wait for wallet info to be returned

  var promise1 = new Promise(function (resolve, reject) {
    window.addEventListener("message", function (event) {
      if (checkEventOrigin(event.origin) == false) return;

      if (event.data.msg_id == "confirmation") {
        window.messageConfirmed = true;
        return;
      }

      if (event.data.msg_id == 'wallet') {
        var wallet_info = {
          didSucceed: event.data.didSucceed,
          emailAddress: event.data.emailAddress,
          walletAddress: event.data.walletAddress,
          signedMessage: event.data.signedMessage,
        };
        setCookie("walletAddress", event.data.walletAddress, 365)
      }

      resolve(wallet_info);
    }, false);
  });
  return promise1;
}

function createRegularTransactionPromise(regularTransactionObject, _this) {
  return new Promise(function (resolve, reject) {
    regularTransactionObject.network = _this.network;
    regularTransactionObject.authKey = _this.auth_key;
    var ret = (0, _validationFunctions.testAndCleanTransactionObject)(regularTransactionObject);

    if (ret.isValid == false) {
      reject(ret.errorsList);
    } //get url


    var url = _config.niftyGatewayOrigin + '/#/tx';

    if (_this.network == 'rinkeby') {
      url = _config.niftyGatewayRinkebyOrigin + '/#/tx/';
    }

    var timestampOriginal = new Date();
    var timestampInUnixTime = timestampOriginal.getTime();
    var popup = window.open(url, timestampInUnixTime, 'width=400,height=800'); // message Nifty Gateway with purchase object

    var counter = 0;
    var seconds_interval = 1500;
    var number_of_times = 10;
    window.messageConfirmedPurchaseObj = false; //messaging is recursive

    window.messagePopUpWindowWithRegularTxObject(popup, counter, number_of_times, seconds_interval, regularTransactionObject); //once contact has been made, wait for res to be returned

    window.addEventListener("message", function (event) {
      if (checkEventOrigin(event.origin) == false) {
        return;
      }

      if (event.data.msg_id == 'tx_res') {
        var info = event.data.response;
        resolve(info);
      }
    });
  });
}

function createOpenSeaPromise(openSeaObject, _this) {

      return new Promise(function(resolve, reject) {
        openSeaObject.network = _this.network
        openSeaObject.authKey = _this.auth_key
        openSeaObject.isOpenSea = true

        //test and clean
        var ret = (0, _validationFunctions.testAndCleanOpenSeaObject)(openSeaObject);

        if (ret.isValid == false) {
          reject(ret.errorsList);
          return;
        }
        // url to open
        var timestampOriginal = new Date();
        var timestampInUnixTime = timestampOriginal.getTime();

        if(openSeaObject.openInSameWindow===true){

            var url = _config.niftyGatewayOrigin + '/#/purchase/isURLData=true&isOpenSea=true&contractAddress='+openSeaObject.contractAddress+'&tokenID='+openSeaObject.tokenID+'&useweb3walletifavailable='+openSeaObject.useWeb3WalletIfAvailable+'&createNiftyWallet='+openSeaObject.createNiftyWallet+'&';
            if (_this.network == 'rinkeby') {
              url = 'https://rinkeby.niftygateway.com/#/purchase/isURLData=true&isOpenSea=true&contractAddress='+openSeaObject.contractAddress+'&tokenID='+openSeaObject.tokenID+'&';
            }
            window.location.replace(url);
        } else {
          var url = _config.niftyGatewayOrigin + '/#/purchase';

        

          if (_this.network == 'rinkeby') {
            url = 'https://rinkeby.niftygateway.com/#/purchase';
          }
          var popup = window.open(url,timestampInUnixTime,'width=400,height=800');
        }

        // message Nifty Gateway so it can store this window location
        var counter = 0
        var seconds_interval = 1500
        var number_of_times = 10

        if(openSeaObject.openInSameWindow!==true){

          window.messageConfirmedPurchaseObj = false
          //messaging is recursive
          window.messagePopUpWindowWithPurchaseForObject(popup, counter, number_of_times, seconds_interval, openSeaObject);
          //once contact has been made, wait for wallet info to be returned
          window.addEventListener("message", function(event) {
              if (checkEventOrigin(event.origin) == false) {
                return;
              }
              if (event.data.msg_id == 'purchase_res') {
                var info = event.data.response
                var info_res = {
                  didSucceed: event.data.didSucceed,
                  transactionURL: event.data.transactionURL
                }
                resolve(info_res);
              }
            });

      };

    });
}

function createPurchaseForPromise(purchaseForObject, _this) {
  return new Promise(function (resolve, reject) {
    purchaseForObject.network = _this.network;
    purchaseForObject.authKey = _this.auth_key; //test and clean

    var ret = (0, _validationFunctions.testAndCleanPurchaseForObject)(purchaseForObject);

    if (ret.isValid == false) {
      reject(ret.errorsList);
      return;
    } // url to open


    var url = _config.niftyGatewayOrigin + '/#/purchase';

    if (_this.network == 'rinkeby') {
      url = _config.niftyGatewayRinkebyOrigin + '/#/purchase/';
    }

    var timestampOriginal = new Date();
    var timestampInUnixTime = timestampOriginal.getTime();
    var popup = window.open(url, timestampInUnixTime, 'width=400,height=800'); // message Nifty Gateway so it can store this window location

    var counter = 0;
    var seconds_interval = 1500;
    var number_of_times = 10;
    window.messageConfirmedPurchaseObj = false; //messaging is recursive

    window.messagePopUpWindowWithPurchaseForObject(popup, counter, number_of_times, seconds_interval, purchaseForObject); //once contact has been made, wait for wallet info to be returned

    window.addEventListener("message", function (event) {
      if (checkEventOrigin(event.origin) == false) {
        return;
      }

      if (event.data.msg_id == 'purchase_res') {
        var info = event.data.response;
        var info_res = {
          didSucceed: event.data.didSucceed,
          transactionURL: event.data.transactionURL
        };
        resolve(info_res);
      }
    });
  });
}

function checkEventOrigin(origin) {
  if (origin == "http://localhost:3001" | origin == _config.niftyGatewayOrigin | origin == _config.niftyGatewayRinkebyOrigin) {
    return true;
  } else {
    return false;
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
