# IT5007_project


### Project Set Up

port 3000 should be open for front end, port 5000 for back end.

```
apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# the following operation are done in the front_end package of source code
nvm install 16
nvm alias default 16
npm install -g npm@8
```

### Front End
```
cd front_end
npm install
npm start
```

### Back End
```
cd back_end
npm install
node server.js
```