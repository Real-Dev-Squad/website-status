### Install mkcert
## Install mkcert in Mac OS and Linux
```bash 
brew install mkcert
```
**Note:** If you don't have brew, you can install it from [here](https://brew.sh/).

### Install mkcert in Windows

```bash
choco install mkcert
```

**Note:** If you don't have choco, you can install it from [here](https://chocolatey.org/install).

## Generate certificate

```bash
cd /path/to/your/project
mkdir certificate
cd certificate
mkcert -install
mkcert dev.realdevsquad.com localhost
```

**Note:** You can generate certificate for any domain name. Here, I have generated certificate for **dev.realdevsquad.com** and **localhost**.

## Add certificate in project

Create a folder named **certificate** in your project's root directory. And then, Copy both the **dev.realdevsquad+1.com.pem** and **dev.realdevsquad.com+1-key.pem** files to the **certificate** folder.

## References

- https://mswjs.io/docs/recipes/using-local-https
- https://nextjs.org/docs/advanced-features/custom-server
- https://github.com/FiloSottile/mkcert