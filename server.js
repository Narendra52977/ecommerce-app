require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const cookieParser=require('cookie-parser')
const router = require('./routes/userRouter')
const path=require('path')

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
app.use('/api',require('./routes/paymentRouter'))


const URI=process.env.MONGO_DB_URL
mongoose.connect(URI,{useNewUrlParser: true},err=>{
    if(err) throw err
    console.log('connected to Mongodb')
})

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','index.html'))
    })
}


const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log("server running")
})



