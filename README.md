# Lendsqr_Project

This is a Lendsqr node.js typescript express based RESTful Api Project.

# Technologies used
-   Node.js
-   Express.js
-   Restful API
-   Knexjs
-   APIs Authorization (JWT)
-   Typescript
-   Jest


# How to use

## 1. Clone Project into your local machine

```
https://github.com/nelsoniseru/lendsqr_project.git
```



## 2. Connecting to Database

### DATABASE:

Please make sure mySQL Server software is installed.
start your mysql server

> For more details about Mysql, click [here](https://mysql.com).

### And then run the command
> To migrate the tables into the database.

```
 npm run knex:migration
```

## 3. Start project
```
 npm run start:dev
```

# APIs Authorization

## Some APIs are protected by accessToken (JWT), such as:

-   http://localhost:4000/api/v1/fund-account  (POST)
-   http://localhost:4000/api/v1/transfer      (POST)
-   http://localhost:4000/api/v1/withdraw      (POST)
 

## When calling these protected APIs, make sure you add %BearerToken% in `Authorization` request Header.
```
Authorization: Bearer <accessToken>
```

## How to get accessToken ?

When user login sucessfully, a unique accessToken will be returned.

# Level access

## protected routes
 
| APIs                                            | Method | Desc                        | AccessToken |
| ----------------------------------------------- | ------ |------------------------     | ------------|
|  http://localhost:4000/api/v1/fund-account      | POST   | Fund user account           | Required    |
|  http://localhost:4000/api/v1/transfer          | POST   | Transfer to other account   | Required    |
|  http://localhost:4000/api/v1/withdraw          | POST   | Withdraw from account       | Required    |



# Available APIs

## User Auth


| APIs                                  | Method |         Desc          |
|-------------------------------------- |--------|---------------------- |
| http://localhost:4000/api/v1/register |  POST  | Register user account |
| http://localhost:4000/api/v1/login    |  POST  | User Login            |

## Transaction route

| APIs                                            | Method | Desc                        | AccessToken |
| ----------------------------------------------- | ------ |-----------------------------|-------------|
| http://localhost:4000/api/v1/fund-account       | POST   | fund user account           | Required    |
| http://localhost:4000/api/v1/transfer           | POST   |  transfer to another user   | Required    |
| http://localhost:4000/api/v1/withdraw           | POST   | withdraw from account       | Required    |

# Models
## User model
| Field           | Type   | 
|-----------------|--------|
| id              | int    |
| email           | string |
| password        | string | 
| wallet_balance  | int    |  


## Transaction model

| Field           | Type   | 
|-----------------|--------|
| id              | int    |
| email           | string |
| user_id         | int    | 
| amount          | int    | 
| status          | string | 

## E-R Model

> click here to see the E-R model [here](https://app.dbdesigner.net/designer/schema/564966).



