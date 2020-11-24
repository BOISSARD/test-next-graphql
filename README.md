# test-next-graphql

Subject : 

![Subject](./images/Technical_exercise_Full_Stack_sans_nom.png)

See a demo on [test-react.boissard.info](http://test-react.boissard.info)
for the specific graphql api see on [api.test-react.boissard.info](http://api.test-react.boissard.info)

## Launch in development mode

### The next client :
This first one will start a server on port 3000 for the client app
```
cd app
npm install
npm run dev
```

### The graphql server :
This second one will start a server on port 4000 for the API app
```
cd api
npm install
npm run dev
```

## Deploy in production mode

### The next client :
With pm2
```
cd app
npm install
npm run build
pm2 start npm --watch --name "test-next-graphql" -- start
```

### The node client :
With pm2
```
cd api
npm install
pm2 start npm --watch --name "test-node-graphql" -- start
```