import {AbiCoder} from 'web3-eth-abi';
import * as Utils from 'web3-utils';

const abiCoder = new AbiCoder();

export function testAndCleanOpenSeaObject(TxObject) {
    var retDict = {}
    retDict.isValid = true
    retDict.errorsList = []
    //must have contract address
    if (typeof(TxObject.contractAddress) == 'undefined') {
      retDict.isValid = false
      retDict.errorsList.push("No contract address - please include one")
    }
    if (typeof(TxObject.tokenID) == 'undefined') {
      retDict.isValid = false
      retDict.errorsList.push("No tokenID found - please include one")
    }
    return(retDict)
}

export function testAndCleanPurchaseForObject(TxObject) {
    var retDict = {}
    retDict.isValid = true
    retDict.errorsList = []
      //must have contract address
      if (typeof(TxObject.contractAddress) == 'undefined') {
        retDict.isValid = false
        retDict.errorsList.push("No contract address - please include one")
      }
      if (typeof(TxObject.value) == 'undefined') {
        retDict.isValid = false
        retDict.errorsList.push("No value field found - please include one")
      }
      //check for purchaseFor signature or transactionData
      if (typeof(TxObject.purchaseForFunction) == 'undefined' &&
      typeof(TxObject.transactionData) == 'undefined') {
        retDict.isValid = false
        retDict.errorsList.push("Please include either a function signature or transaction data.")
      } else if (typeof(TxObject.purchaseForFunction == 'string')) {
        //check cosmetic info
        var cos = checkForDisplayInfoReplaceDefaults(TxObject)
        if (cos.errorsOccurred == true) {
          retDict.isValid = false
          retDict.errorsList.push(cos.errorsList)
        } else {
          TxObject = cos.obj
        }
        //purchaseFor function with signature given
        var url = 'https://devportalbackend.niftygateway.com/utils/get-generic-abi'
          //make contract from data
          //const contract = new Eth.Contract(res.data, purchaseForObject.contractAddress);
          TxObject.purchaseForFunction = TxObject.purchaseForFunction.replace(/ /g,'')
          var fun_sig = TxObject.purchaseForFunction
          //check for function
          var sigExists = generateJSONInterfaceFromSig(fun_sig)
          if (sigExists.sigExists == true) {
            //valid function signature, move on
            //any user address will do, this is a test
            var userAdd = Utils.toChecksumAddress('0x0000000000000000000000000000000000000000');
            //prep args
            var prepArgsRes = prepareArgs(TxObject.argsList, sigExists.inputs, userAdd)
            if (prepArgsRes.errorsOccurred == true) {
              //errors found in args
              retDict.isValid = false
              retDict.errorsList.push(prepArgsRes.errors_list)
            } else {
              //everything is good - try to get tx data
              var res_dict = prepareArgsFakeCall(TxObject.argsList, sigExists.inputs, userAdd)
              var fake_args = res_dict.new_args
              var fakeDataRetDict = testEncoding(sigExists, fun_sig,fake_args)
              if (fakeDataRetDict.didWork == false) {
                retDict.isValid = false
                var new_msg = "While using web3 to encode your function, an error was encountered. Message is: " + fakeDataRetDict.message
                retDict.errorsList.push(new_msg)
                return(retDict)
              } else {
                // retDict.isValid = true
                retDict.validObject = TxObject
                return(retDict)
              }
            }
          } else {
            retDict.isValid = false
            retDict.errorsList.push("Whoops, we can't interpret your function signature. Check again to make sure it is valid.")
            return(retDict)
          }
      }
      return(retDict)
    }

export function testAndCleanTransactionObject(TxObject) {
    var retDict = {}
    retDict.isValid = true
    retDict.errorsList = []
      //must have contract address
      if (typeof(TxObject.contractAddress) == 'undefined') {
        retDict.isValid = false
        retDict.errorsList.push("No contract address - please include one")
      }
      //check for purchaseFor signature or transactionData
      if (typeof(TxObject.regularTransactionFunction) == 'undefined' &&
      typeof(TxObject.transactionData) == 'undefined') {
        retDict.isValid = false
        retDict.errorsList.push("Please include either a function signature or transaction data.")
      } else if (typeof(TxObject.regularTransactionFunction == 'string')) {
        //check cosmetic info
        var cos = checkForDisplayInfoReplaceDefaults(TxObject)
        if (cos.errorsOccurred == true) {
          retDict.isValid = false
          retDict.errorsList.push(cos.errorsList)
        } else {
          TxObject = cos.obj
        }
        //purchaseFor function with signature given
        var url = 'https://devportalbackend.niftygateway.com/utils/get-generic-abi'
          //make contract from data
          //const contract = new Eth.Contract(res.data, purchaseForObject.contractAddress);
          TxObject.regularTransactionFunction = TxObject.regularTransactionFunction.replace(/ /g,'')
          var fun_sig = TxObject.regularTransactionFunction
          //check for function
          var sigExists = generateJSONInterfaceFromSig(fun_sig)
          if (sigExists.sigExists == true) {
            //valid function signature, move on
            //any user address will do, this is a test
            var userAdd = Utils.toChecksumAddress('0x0000000000000000000000000000000000000000');
            //prep args
            var prepArgsRes = prepareArgs(TxObject.argsList, sigExists.inputs, userAdd)
            if (prepArgsRes.errorsOccurred == true) {
              //errors found in args
              retDict.isValid = false
              retDict.errorsList.push(prepArgsRes.errors_list)
            } else {
              //everything is good - try to get tx data
              var res_dict = prepareArgsFakeCall(TxObject.argsList, sigExists.inputs, userAdd)
              var fake_args = res_dict.new_args
              var fakeDataRetDict = testEncoding(sigExists, fun_sig,fake_args)
              if (fakeDataRetDict.didWork == false) {
                retDict.isValid = false
                var new_msg = "While using web3 to encode your function, an error was encountered. Message is: " + fakeDataRetDict.message
                retDict.errorsList.push(new_msg)
                return(retDict)
              } else {
                retDict.isValid = true
                retDict.validObject = TxObject
                return(retDict)
              }
            }
          } else {
            retDict.isValid = false
            retDict.errorsList.push("Whoops, we can't interpret your function signature. Check again to make sure it is valid.")
            return(retDict)
          }
      }
      return(retDict)
    }

export function testEncoding(inputs, function_sig, args) {
  var retDict = {}
  try {
    var retData = abiCoder.encodeFunctionCall(inputs, args);
    retDict.didWork = true
    return(retDict)
  } catch (error) {
    retDict.didWork = false
    retDict.message = (error.message)
    return(retDict)
  }
}

export function generateJSONInterfaceFromSig(fun_sig) {
    var encodingDict = {}
    var fun_sig = fun_sig.replace(/ /g,'')
    //get location of ()
    var indexOfFirst = fun_sig.indexOf('(');
    if (indexOfFirst == -1) {
      encodingDict.sigExists = false
      return(encodingDict)
    }
    var indexOfLast = fun_sig.indexOf(')');
    if (indexOfLast == -1) {
      encodingDict.sigExists = false
      return(encodingDict)
    }
    var argLocs = []
    argLocs.push(indexOfFirst)
    var i = 0
    var current = 0
    while (true) {
      i = fun_sig.indexOf(',',current)
      if (i==-1) {
        break;
      } else {
        argLocs.push(i)
        current = i+1
      }
    }
    argLocs.push(indexOfLast)
    var inputsAsList = []
    for (var j = 0; j < (argLocs.length-1); j++) {
      var inputDict = {}
      inputDict.name = String(j)
      inputDict.type = fun_sig.substring((argLocs[j]+1),argLocs[j+1])
      // var input = fun_sig.substring((argLocs[j]+1),argLocs[j+1])
      inputsAsList.push(inputDict)
    }
    var name = fun_sig.substring(0,indexOfFirst)
    encodingDict.name = name
    encodingDict.type = 'function'
    encodingDict.inputs = inputsAsList
    encodingDict.sigExists = true
    return(encodingDict)
}

export function prepareArgsFakeCall(arg_list, abi_inputs, user_address) {
  //errors encountered
  var errors_encountered = false
  //prepare new list to return - errors or preapred args
  var new_args_list = []
  var errors_list = []
  //check to make sure enough args were submitted
  if (arg_list.length != abi_inputs.length) {
    var retDict = {}
    retDict.errorsOccurred = true
    var msg = "Not enough arguments provided. Expected " + String(abi_inputs.length) + " but got " + String(arg_list.length) + "!";
    errors_list.push(msg)
    retDict.errors_list = errors_list
    return(retDict);
  }
  for (var i = 0; i< abi_inputs.length; i++) {
    var type_of_input = abi_inputs[i].type;
    var input_arg = arg_list[i]
    if (input_arg == 'userAddress') {
      //replace the string 'userAddress' with the users wallet address
      var cs = (user_address);
      new_args_list.push(cs);
    } else {
      //compare abi type to arg given to make sure it will work
      var new_arg = castArg(type_of_input, input_arg)
      if (new_arg.errorOccurred == true) {
        errors_encountered = true
        var mes = " Error on Arg with index " + String([i]) + " in list. Message: " + new_arg.message
        errors_list.push(mes)
      } else {
        new_args_list.push(new_arg)
      }
    }
  }
  if (errors_encountered) {
    //send backs errors
    var retDict = {}
    retDict.errorsOccurred = true
    retDict.errors_list = errors_list
    return(retDict);
  } else {
    //send back new args
    var retDict = {}
    retDict.errorsOccurred = false
    retDict.new_args = new_args_list
    return(retDict);
  }
}

export function locateJSONInterface(_jsonInterface, function_sig) {
  var returnObj = {wasLocated: false, inputs: null}
  var sig_encoded = abiCoder.encodeFunctionSignature(function_sig)
  var abiLength = _jsonInterface.length;
    for (var i = 0; i < abiLength; i++) {
      var abi_sig =  abiCoder.encodeFunctionSignature({
            name: _jsonInterface[i].name,
            type: _jsonInterface[i].type,
            inputs: _jsonInterface[i].inputs
        })
        if (abi_sig == sig_encoded) {
          //located the function in the ABI
          returnObj.wasLocated = true
          returnObj.inputs = _jsonInterface[i].inputs
          return(returnObj)
        }
        //Do something
    }
  return(returnObj);
}

function castArg(input_abi_type, arg) {
  switch (input_abi_type) {
    case 'address':
      try {
        var new_arg = Utils.toChecksumAddress(arg);
        return new_arg;
      } catch (e) {
        var retDict = {}
        retDict.errorOccurred = true
        retDict.message = "Expected eth address, could not checksum provided input. Double check if address."
        return (retDict);
      }
    case ('uint256'):
        if (Number.isInteger(arg) == true) {
          return (arg)
        } else {
        var retDict = {}
        retDict.errorOccurred = true
        retDict.message = "Expected int, but got " + String(typeof(arg)) + " instead."
        return (retDict);
      }
      break;
    case ('uint'):
        if (Number.isInteger(arg) == true) {
          return (arg)
        } else {
        var retDict = {}
        retDict.errorOccurred = true
        retDict.message = "Expected int, but got " + String(typeof(arg)) + " instead."
        return (retDict);
      }
        break;
    default:
      var retDict = {}
      retDict.errorOccurred = false
      retDict.arg = arg
      return(retDict);
  }
}

export function checkForDisplayInfoReplaceDefaults(object) {
  var errorsList = []
  var title = object.displayTitle
  var imageURL = object.displayImageURL
  if (typeof(title) == 'undefined') {
    errorsList.push("No title found")
  }
  if (typeof(imageURL) == 'undefined') {
    errorsList.push("No image URL found")
  }
  if (imageURL == 'transfer') {
    object.displayImageURL = 'https://s3-us-west-1.amazonaws.com/nftgimagebucket/send.jpg'
  }
  if (imageURL == 'approve') {
    object.displayImageURL = 'https://s3-us-west-1.amazonaws.com/nftgimagebucket/approve.jpg'
  }
  var retDict  = {}
  retDict.errorsOccurred = false
  if (errorsList.length==0) {
    retDict.obj = object
    return(retDict)
  } else {
    retDict.errorsOccurred = true
    retDict.errorsList = errorsList
    return(retDict)
  }

}

export function prepareArgs(arg_list, abi_inputs, user_address) {
  //errors encountered
  var errors_encountered = false
  //prepare new list to return - errors or preapred args
  var new_args_list = []
  var errors_list = []
  //check to make sure enough args were submitted
  if (arg_list.length != abi_inputs.length) {
    var retDict = {}
    retDict.errorsOccurred = true
    var msg = "Not enough arguments provided. Expected " + String(abi_inputs.length) + " but got " + String(arg_list.length) + "!";
    errors_list.push(msg)
    retDict.errors_list = errors_list
    return(retDict);
  }
  for (var i = 0; i< abi_inputs.length; i++) {
    var type_of_input = abi_inputs[i].type;
    var input_arg = arg_list[i]
    if (input_arg == 'userAddress') {
      //replace the string 'userAddress' with the users wallet address
      var cs = 'userAddress';
      new_args_list.push(cs);
    } else {
      //compare abi type to arg given to make sure it will work
      var new_arg = castArg(type_of_input, input_arg)
      if (new_arg.errorOccurred == true) {
        errors_encountered = true
        var mes = " Error on Arg with index " + String([i]) + " in list. Message: " + new_arg.message
        errors_list.push(mes)
      } else {
        new_args_list.push(new_arg)
      }
    }
  }
  if (errors_encountered) {
    //send backs errors
    var retDict = {}
    retDict.errorsOccurred = true
    retDict.errors_list = errors_list
    return(retDict);
  } else {
    //send back new args
    var retDict = {}
    retDict.errorsOccurred = false
    retDict.new_args = new_args_list
    return(retDict);
  }
}
