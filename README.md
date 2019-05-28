# niftygateway

NiftyGatewayJS is our Javascript package that allows you to integrate the Nifty Gateway wallet into your NFT project or game. 

Check out our [documentation](https://docs.niftygateway.com) for a full guide on how to use NiftyGatewayJS.

Get started with:

```
npm install niftygatewayjs
```

Then, initialize a Nifty Gateway object. 

All you have to do is specify the network:

```
var nftg = new NiftyGatewayJS('rinkeby');
```

From there, you can use the Nifty Gateway object to call functions, such as getUserWalletAndEmailAddress(), which will ask a user if they are ok sharing their information with you, and then tell you their wallet and email address if they are:

```
nftg.getWalletAndEmailAddress().then(res => {
    //this function returns a promise which will resolve to a data object
    if (res.didSucceed == true) {
          setUserEmailAddressRS(res.emailAddress) //these are redux functions
          setUserWalletAddressRS(res.walletAddress)
          this.setState({isLoggedIn: true, walletAddress: res.walletAddress})
     }
 });
 ```

# Examples

The 'niftygateway_examples' directory has implemetation of the functions from NiftyGatewayJS in React. 
