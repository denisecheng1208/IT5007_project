# IT5007_project

### Docker Set Up

```
docker run -it -p 3000:3000 --name="front_test" ubuntu:latest
```

### Project Set Up

```
apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# the following operation are done in the front_end package of source code
nvm install 16
nvm alias default 16
npm install -g npm@8
npm install
```

### Express
```
npm start
```
