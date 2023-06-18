//install packages
// npm i cors express nodemon

//run frontend and backend
//npm run start:frontend

//open another tab in terminal run backend
//npm run start:backend

//use env
//npm i dotenv
const PORT = 8000
const express = require('express')
const cors = require('cors')
//added
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY
app.post('/completions',async (req,res)=>{
    const options = {
        method:"POST",
        headers:{
            "Authorization":`Bearer  ${API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user",content:req.body.message}], // SENT TO OPENAI
            max_tokens:100,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const data = await response.json()
        res.send(data)//send data to port
    }catch(error){
        console.error(error)
    }
})
app.listen(PORT,() => console.log('Your Server is Running on PORT'+PORT))