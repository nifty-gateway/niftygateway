import { testAndCleanTransactionObject } from './validationFunctions.js'

import {createPurchaseForPromise, createRegularTransactionPromise,
getWalletAndEmailAddressPromise, createOpenSeaPromise} from './promiseFunctions.js'

// export var niftyGatewayOrigin = "http://localhost:3001";
// export var niftyGatewayRinkebyOrigin = 'http://localhost:3001';
// export var niftyGatewayRinkebyOriginNew = 'http://localhost:3001/#/purchase/rinkeby.niftygateway.com'

export class NiftyGatewayJS {

  constructor(network, auth_key) {
    if (network == 'main' || network == 'rinkeby') {
    } else {
      const err = new TypeError("Invalid network - can only be rinkeby or main")
      throw(err)
    }
    if (typeof(auth_key) == 'undefined') {
      var auth_key = 'default';
    }
    this.auth_key = auth_key;
    this.network = network;

    window.messagePopUpWindow = function(popup, counter, number_of_times, seconds_interval, authInfo){
      //recursion
      if (counter==number_of_times) {
        return("done");
      } else if (window.messageConfirmed==true) {
        return("done");
      } else {
        //wheeeeeee
        setTimeout(function() {
          authInfo.id = "confirmation_message"
          var info = authInfo
          popup.postMessage(info, '*');
          counter = counter+1;
          return(window.messagePopUpWindow(popup, counter, number_of_times, seconds_interval, info));
        }, seconds_interval)
      }
    }

    window.messagePopUpWindowWithPurchaseForObject = function(popup, counter, number_of_times, seconds_interval, purchaseForObject){
      //recursion
      if (counter==number_of_times) {
        return("done");
      } else if (window.messageConfirmedPurchaseObj==true) {
        return("done");
      } else {
        //wheeeeeee
        setTimeout(function() {
          var data_obj = {id: 'purchase for object', data: purchaseForObject}
          popup.postMessage(data_obj, '*');
          counter = counter+1;
          return(window.messagePopUpWindowWithPurchaseForObject(popup, counter, number_of_times, seconds_interval, purchaseForObject));
        }, seconds_interval)
      }
    }

    window.messagePopUpWindowWithRegularTxObject = function(popup, counter, number_of_times, seconds_interval, regularTxObject){
      //recursion
      if (counter==number_of_times) {
        return("done");
      } else if (window.messageConfirmedPurchaseObj==true) {
        return("done");
      } else {
        //wheeeeeee
        setTimeout(function() {
          var data_obj = {id: 'regular tx object', data: regularTxObject}
          popup.postMessage(data_obj, '*');
          counter = counter+1;
          return(window.messagePopUpWindowWithRegularTxObject(popup, counter, number_of_times, seconds_interval, regularTxObject));
        }, seconds_interval)
      }
    }

  }

  returnAuthKey() {
    return (this.auth_key);
  }

  returnNetwork() {
    return (this.network);
  }

  getWalletAndEmailAddress() {
    var _this = this
    var prom = getWalletAndEmailAddressPromise(_this)
    return(prom)
  }

  sendPurchaseForTransaction(purchaseForObject) {
    var _this = this
    var prom = createPurchaseForPromise(purchaseForObject, _this)
    return(prom)
  }

  purchaseFromOpenSea(openSeaObject) {
    var _this = this
    var prom = createOpenSeaPromise(openSeaObject, _this)
    return(prom)
  }

  sendRegularTransaction(regularTransactionObject) {
    var _this = this
    var prom = createRegularTransactionPromise(regularTransactionObject, _this)
    return(prom)
  }

  testTransactionObject(txObject) {
    var res = testAndCleanTransactionObject(txObject);
    if (res.isValid == false) {
      return res.errorsList
    } else {
      return ("Valid object")
    }

  }

}

export default NiftyGatewayJS

// export default {
//   // Main SDK export:
//   NiftyGatewayJS
// }
