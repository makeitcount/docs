---
id: signinup
title: signInUp
hide_title: true
---

# `signInUp(thirdPartyId, thirdPartyUserId, email: { id, isVerified })`

### Parameters
- `thirdPartyId`
  - type: `string`
  
- `thirdPartyUserId`
  - type: `string`

- `email`
  - `id`
    - type: `string`
    
  - `isVerified`
    - type: `boolean`

### Returns
- `Promise<{createdNewUser: boolean, user: User}>` on successful sign in/sign up. To know about the `User` object click [here](https://github.com/supertokens/core-driver-interface/wiki#third-party-user)
 
### Throws
- [GENERAL_ERROR](./../errors/general_error)
- [NO_EMAIL_GIVEN_BY_PROVIDER](./errors/no_email_given_by_provider)