# eprotect-iframeEnhancements
Replaces the typical litle_api3.js file with litle-mock.js
The iframe should behave the same in all other ways. 
Mocking the litle api allows us to test the behavior of the iframe when various errors are returned.
For successful calls the iframe has no special behavior other than passing the reponse on to the client side.

## Behaviors to test
The account number drives the response from the mock api. 
If the account number is 871, 872, 874, 876, 881, or 882, the api will trigger the error behavior for each of the respective codes.
If the account number has length 4, the timeout error behavior will be triggered.
Any other length will trigger the success response.

## Triggering the mock litle api
Actions in the iframe are triggered by passing a JSON request string to window.postMessage
1) Enter the account number matching the scenario you want to test.

2) Build the request message
```
var msg = JSON.stringify({action: "getPaypageRegistrationId"});
```

3) Post the message
```
window.postMessage(msg, "*");
```
