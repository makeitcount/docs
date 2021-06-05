---
id: backend-config
title: 2. Backend config
hide_title: true
---

# 2. Backend config

## 1) Install supertokens package
```bash
npm i supertokens-node
```

## 2) Create a configuration file (`config.js`)
- Create a `config.js` file in the root directory of your project.
- An example of this file can be found [here](https://github.com/supertokens/supertokens-auth-react/blob/master/examples/with-aws-lambda/backend/config.js).


## 3) Create a backend config function
This function will return the config object used to configure `supertokens-node`:
- Add secrets for your third party login providers.
- All configuration options can be found [here](/docs/nodejs/thirdparty/init).
- You will need to replace the `supertokens` object's `connectionURI` with the location of your core. You may also need to add an `apiKey`.
- Notice the `apiGatewayPath` property in the `appInfo` config. The value of this should be the same as what you set on the frontend.

<!--DOCUSAURUS_CODE_TABS-->
<!--config.js-->
```js

let ThirdParty = require('supertokens-node/recipe/thirdparty');
let Session = reqiure('supertokens-node/recipe/session')

function getBackendConfig() {
  return {
    supertokens: {
      connectionURI: 'https://try.supertokens.io',
    },
    appInfo: {
      // learn more about this on https://supertokens.io/docs/thirdparty/appinfo
      appName: "YOUR APP NAME", // Example: "SuperTokens",
      apiDomain: "YOUR API DOMAIN", // This should be same as the domain name of your API Gateway. Example:  https://0ktsu4mmb6.execute-api.us-east-1.amazonaws.com
      websiteDomain: "YOUR WEBSITE DOMAIN", // Example: "http://localhost:8080",
      apiGatewayPath: "/dev" // same as what's set on the frontend config
    },
    recipeList: [
      ThirdParty.init({
        providers: [
          ThirdParty.Google({
            clientSecret: "TODO ADD SECRET",
            clientId: "TODO ADD SECRET",
          }),
          ThirdParty.Facebook({
            clientSecret: "TODO ADD SECRET",
            clientId: "TODO ADD SECRET",
          }),
        ],
      }),
      Session.init(),
    ],
    isInServerlessEnv: true,
  }
}

module.exports.getBackendConfig = getBackendConfig;

```
<!--END_DOCUSAURUS_CODE_TABS-->

<div class="specialNote" style="margin-bottom: 40px">
Please refer to the corresponding documentations to get your client ids and client secrets for each of the below providers:<br/>
  - <a href="https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials" rel="noopener noreferrer" target="_blank" >Google</a> (callback URL is <code>{websiteDomain}/auth/callback/google</code>)<br/>
  - <a href="https://developers.facebook.com/docs/development/create-an-app" rel="noopener noreferrer" target="_blank" >Facebook</a> (callback URL is <code>{websiteDomain}/auth/callback/facebook</code>)<br/><br/>

In general, the callback URL is `{websiteDomain}{websiteBasePath}/callback/{id}` where `id` is the unique id for the auth provider, and `websiteBasePath` by default is `/auth`.
</div>