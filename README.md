# pageone

## Project setup
```
npm install
```

## Setup .env fle
```
PORT=5000
DATABASE=pageOne
DB_PORT=3306
USER=<>
PASSWORD=<>
HOST=localhost
```

### Create database 
```
use server/mysql_database_creation_code.sql
```

## Start client
```
npm run serve
```

### Start server 
```
cd server
nodemon server
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
