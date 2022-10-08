import supertest from "supertest"
import express from 'express'
var app = express();
import {accessToken} from '../middleware/jwt_helper'


import {findExistingUser, createUser,encryptpass,comparePass} from './service/user.service'


const userInput = {
    id:1,
    email:"nelsoniseru08@gmail.com",
    password:"nelsoniseru@2022"
}
const userInput2 = {
    id:2,
    email:"nelsoniseru02@gmail.com",
    password:"nelsoniseru@2022"
}
// beforeEach(async()=>{
//    await connection('users').del()
// })


describe('user register',()=>{
describe("given the email and password are valid",()=>{
   it('should return the user payload ',async()=>{
       supertest(app)
      .post("/api/auth/register")
      .send(userInput)
      .expect(200)
   })
})
describe("if the email already exist",()=>{
    it('should return a 422',async()=>{
       let emailExist = await findExistingUser(userInput.email)
       supertest(app)
      .post("/api/auth/register")
      .expect(422)
    })
 })

 describe("create user",()=>{
    describe("given the email and password are valid",()=>{
    it('should return a signed accessToken',async()=>{
   var hash = await encryptpass(userInput['password'])   
   userInput['password'] = hash
     let user = await createUser(userInput)
     supertest(app)
     .post("/api/v1/register")
     .send(user)
     .expect(200)
    })
})
 })
})

describe('user login',()=>{
    describe("given the email and password are valid",()=>{
        it('should return the user payload ',async()=>{
            supertest(app)
           .post("/api/v1/login")
           .send(userInput)
           .expect(200)
        })
     })
     describe("given that the email invalid",()=>{
        it('should return a 400',async()=>{
            let user = await findExistingUser(userInput2.email)
            supertest(app)
           .post("/api/v1/login")
           .send(userInput)
           .expect(400)
        })
     })
     describe("given that the password does not match",()=>{
        it('should return a 400 ',async()=>{
            let user = await findExistingUser(userInput.email)
                       await  comparePass("nelsoniser",user[0].password) 
            supertest(app)
           .post("/api/v1/login")
           .expect(400)
        })
     })

     describe("login user",()=>{
        describe("given the email and password are valid",()=>{
        it('should return a signed accessToken and login the user',async()=>{
            let id = userInput['id']
             let jwt = await accessToken(id)
      
         supertest(app)
         .post("/api/v1/login")
         .set('Authorization',`Bearer ${jwt}`)
         .send(userInput)
         .expect(200)
        })
    })
})
})