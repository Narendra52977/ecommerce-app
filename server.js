require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const cookieParser=require('cookie-parser')
const router = require('./routes/userRouter')

const app=express()
app.use(express.json())
app.use(cookieParser());
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

app.use('/user',router)
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/productRouter'))


const URI=process.env.MONGO_DB_URL
mongoose.connect(URI,{useNewUrlParser: true},err=>{
    if(err) throw err
    console.log('connected to Mongodb')
})



const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log("server running")
})



