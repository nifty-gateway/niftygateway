"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NiftyGatewayJS = void 0;

var _validationFunctions = require("./validationFunctions.js");

var _promiseFunctions = require("./promiseFunctions.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

function checkCookie() {
  var user = getCookie("username");

  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");

    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

var NiftyGatewayJS =
/*#__PURE__*/
function () {
  function NiftyGatewayJS(network, auth_key) {
    _classCallCheck(this, NiftyGatewayJS);

    if (network == 'main' || network == 'rinkeby') {} else {
      var err = new TypeError("Invalid network - can only be rinkeby or main");
      throw err;
    }

    if (typeof auth_key == 'undefined') {
      var auth_key = 'default';
    }

    this.auth_key = auth_key;
    this.network = network;

    window.messagePopUpWindow = function (popup, counter, number_of_times, seconds_interval, authInfo) {
      //recursion
      if (counter == number_of_times) {
        return "done";
      } else if (window.messageConfirmed == true) {
        return "done";
      } else {
        //wheeeeeee
        setTimeout(function () {
          authInfo.id = "confirmation_message";
          var info = authInfo;
          popup.postMessage(info, '*');
          counter = counter + 1;
          return window.messagePopUpWindow(popup, counter, number_of_times, seconds_interval, info);
        }, seconds_interval);
      }
    };

    window.messagePopUpWindowWithPurchaseForObject = function (popup, counter, number_of_times, seconds_interval, purchaseForObject) {
      //recursion
      if (counter == number_of_times) {
        return "done";
      } else if (window.messageConfirmedPurchaseObj == true) {
        return "done";
      } else {
        //wheeeeeee
        setTimeout(function () {
          var data_obj = {
            id: 'purchase for object',
            data: purchaseForObject
          };
          popup.postMessage(data_obj, '*');
          counter = counter + 1;
          return window.messagePopUpWindowWithPurchaseForObject(popup, counter, number_of_times, seconds_interval, purchaseForObject);
        }, seconds_interval);
      }
    };

    window.messagePopUpWindowWithRegularTxObject = function (popup, counter, number_of_times, seconds_interval, regularTxObject) {
      //recursion
      if (counter == number_of_times) {
        return "done";
      } else if (window.messageConfirmedPurchaseObj == true) {
        return "done";
      } else {
        //wheeeeeee
        setTimeout(function () {
          var data_obj = {
            id: 'regular tx object',
            data: regularTxObject
          };
          popup.postMessage(data_obj, '*');
          counter = counter + 1;
          return window.messagePopUpWindowWithRegularTxObject(popup, counter, number_of_times, seconds_interval, regularTxObject);
        }, seconds_interval);
      }
    };
  }

  _createClass(NiftyGatewayJS, [{
    key: "returnAuthKey",
    value: function returnAuthKey() {
      return this.auth_key;
    }
  }, {
    key: "returnNetwork",
    value: function returnNetwork() {
      return this.network;
    }
  }, {
    key: "getWalletAndEmailAddress",
    value: function getWalletAndEmailAddress(signInObject) {
      var _this = this;

      var prom = (0, _promiseFunctions.getWalletAndEmailAddressPromise)(_this, signInObject);
      return prom;
    }
  }, {
    key: "sendPurchaseForTransaction",
    value: function sendPurchaseForTransaction(purchaseForObject) {
      var _this = this;

      var prom = (0, _promiseFunctions.createPurchaseForPromise)(purchaseForObject, _this);
      return prom;
    }
  }, {
    key: "purchaseFromOpenSea",
    value: function purchaseFromOpenSea(openSeaObject) {
      var _this = this;

      var prom = (0, _promiseFunctions.createOpenSeaPromise)(openSeaObject, _this);
      return prom;
    }
  }, {
    key: "sendRegularTransaction",
    value: function sendRegularTransaction(regularTransactionObject) {
      var _this = this;

      var prom = (0, _promiseFunctions.createRegularTransactionPromise)(regularTransactionObject, _this);
      return prom;
    }
  }, {
    key: "testTransactionObject",
    value: function testTransactionObject(txObject) {
      var res = (0, _validationFunctions.testAndCleanTransactionObject)(txObject);

      if (res.isValid == false) {
        return res.errorsList;
      } else {
        return "Valid object";
      }
    }
  }, {
    key: "getWalletAddressFromStorage",
    value: function getWalletAddressFromStorage() {
      var walletAddress = getCookie('walletAddress');
      return walletAddress;
    }
  }, {
    key: "clearWalletAddressFromStorage",
    value: function clearWalletAddressFromStorage() {
      var walletAddress = setCookie('walletAddress', "", 365);
      return null;
    }
  }]);

  return NiftyGatewayJS;
}();

exports.NiftyGatewayJS = NiftyGatewayJS;
var _default = NiftyGatewayJS; // export default {
//   // Main SDK export:
//   NiftyGatewayJS
// }

exports["default"] = _default;
