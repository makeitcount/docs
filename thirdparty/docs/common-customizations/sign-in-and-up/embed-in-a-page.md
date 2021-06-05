---
id: embed-in-page
title: Embed in a page
hide_title: true
---

# Embed in a page 📑

Two steps to achieving this:
- First we disable the full page default implementation
- Then we render the Sign-up / Sign-in UI wherever we like


## Step 1: Disable default implementation 🔐

<!--DOCUSAURUS_CODE_TABS-->
<!--ReactJS--> 
```js
SuperTokens.init({
    appInfo: {...},
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
__HIGHLIGHT__                disableDefaultImplementation: true, __END_HIGHLIGHT__
                (...)
            },
            (...)
        }),
        (...)
    ]
});
```
<!--END_DOCUSAURUS_CODE_TABS-->

If you navigate to `/auth`, you should not see the widget anymore.

## Step 2: Add component 📃

For example if you would like to add the Sign-up / Sign-in widget at the very end of a landing page, before the footer, simply import the `SignInAndUp` component and render it:


<!--DOCUSAURUS_CODE_TABS-->
<!--ReactJS--> 
```js

__HIGHLIGHT__ import {SignInAndUp} from 'supertokens-auth-react/recipe/thirdparty'; __END_HIGHLIGHT__

class MyLandingPage extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <FirstSection/>
                <AnotherSection/>

                (...)

                __HIGHLIGHT_PHRASE__ <SignInAndUp/> __END_HIGHLIGHT_PHRASE__
                <Footer/>
            </div>
        )
    }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->