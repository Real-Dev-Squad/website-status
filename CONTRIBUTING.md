# Contributing to RDS Status-Site

- [How to Start](#1.-how-to-start)
- [Yarn Command Reference](#2.-yarn-command-reference)
- [API Contracts](#3.-api-contracts)
- [Setting Up Local System](#4.-setting-up-local-system)

##  **1. How to Start**

Follow this [link](https://github.com/Real-Dev-Squad/website-welcome/blob/main/CONTRIBUTING.md) to understand how to clone,fork and do a PR.




## **2. Yarn Command Reference**

## Set-up

`yarn install`

## Development

To run the project `yarn run dev`.

## Production

To do a production build `yarn run start`.


## **3. Api Contracts**

Api contracts can be found [here](https://github.com/Real-Dev-Squad/website-api-contracts/tree/main/tasks).

## **4. Setting Up Local System**

 
 1. **Get Authenticated cookie**
    
    Click [this](https://github.com/login/oauth/authorize?client_id=c4a84431feaf604e89d1) link to redirect to authenticating page.

 2. **Copy Cookie**
   
    Open developer tool (ctrl+shift+j), open application tab and select cookies.
    
    copy **rds-session-staging** value.

 3. **Add "dev.realdevsquad.com" to localhost**
    
    open terminal and enter
    
    ```
    sudo vim /etc/hosts
    ```

    add **127.0.0.1   dev.realdevsquad.com**, save it & close the terminal.
    
 4. **Testing Changes**   
 
    ping dev.realdevsquad.com

    Now **dev.realdevsquad.com:3000** can be used as **localhost:3000**

 5. **Making it Secure**

    ```
    sudo local-ssl-proxy --source 443 --target <your-port e.g 3000>
    ```
    Now **https://dev.realdevsquad.com** is secure.

    Once you get your development app to run on https://dev.realdevsquad.com, you will be able to access the backend APIs without any CORS issues.
    
    Follow this [link](https://github.com/Real-Dev-Squad/website-code-docs/tree/main/docs/dev/https-dev-url-cors) to understand the above steps in detail.
 6. **Adding Copied Cookie to Secure Local Setup**
    
     Repeat Step 2 and paste the copied cookie value to https://dev.realdevsquad.com **rds-session-staging**.
   
 



