# niftygateway

NiftyGatewayJS is our Javascript package that allows you to integrate the Nifty Gateway wallet into your NFT project or game. 

Check out our [documentation](https://docs.niftygateway.com) for a full guide on how to use NiftyGatewayJS.

Get started with:

```
npm install niftygateway
```
Then, initialize a Nifty Gateway object with a dev key you get from our Dev portal: https://niftygateway.com/#/getapikey)

You must also specify the network, rinkeby or main:

```
var nftg = new NiftyGatewayJS('rinkeby','yourDevKeyHere');
```

From there, you can use the Nifty Gateway object to call functions, such as getUserWalletAndEmailAddress(), which will ask a user if they are ok sharing their information with you, and then tell you their wallet and email address if they are:

```
nftg.getWalletAndEmailAddress().then(res => {
    //this function returns a promise which will resolve to a data object
    if (res.didSucceed == true) {
        console.log(res); //now a you can access the wallet of a user
     }
 });
 ```

# Examples

Check out sample guides on our Medium Page: https://medium.com/nifty-gateway.

The 'niftygateway_examples' directory has implemetation of the functions from NiftyGatewayJS in React.
