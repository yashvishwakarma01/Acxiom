const express=require('express');
const cors=require('cors')
require('./config')
const path=require('path')
const Login=require('./Collections/Login')
const Reminder=require('./Collections/Reminder')
const app=express();

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','login.html'))
})

app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','register.html'))
})
app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    if(username && password){
        let data=await new Login({userName:username,password:password})
        data=await data.save()
        console.log(data);
        res.sendStatus(201)
    }else{
        res.sendFile(path.join(__dirname,'public','failed.html'))
    }
})

let username=""
let password="";

app.post('/login',async(req,res)=>{
    // {username,password}=req.body;
    username=req.body.username;
    password=req.body.password;
    if(username && password){
       const data=await Login.findOne({userName:username})
        if(data==null){
            res.sendFile(path.join(__dirname,'public','failed.html'))
        }
       else if(data.userName===username && data.password===password){
        res.sendFile(path.join(__dirname,'public','dashboard.html'))
       }else{
        res.sendFile(path.join(__dirname,'public','failed.html'))
       }
    }else{
        res.sendFile(path.join(__dirname,'public','failed.html'))
    }
   
})


app.post('/newReminder',async(req,res)=>{
       let data=req.body;
       console.log(data);
       data=await new Reminder({username:username,
        password:password,
        date:req.body.date,
        subject:req.body.subject,
        description:req.body.description,
        email:req.body.email,
        contact:req.body.contact,
        sms:req.body.sms,
    })
       data=await data.save()
       console.log(data);
       res.sendFile(path.join(__dirname,'public','dashboard.html'))
})

app.post('/newReminderr',async (req,res)=>{
       const data=await Reminder.findOne({username:username,password:password})
       console.log(data);
       if(data){
         const {date,subject,description,email,contact,sms}=req.body;
          let update=await Reminder.updateOne({username:username},{$set:{
            date:date,
            subject:subject,
            description:description,
            email:email,
            contact:contact,
            sms:sms
          }})
       }
       res.redirect('./viewReminder.html')
})
app.get('/logout',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','logout.html'))
})
app.get('/dashboard',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','dashboard.html'))
})

app.get('/viewReminder',async(req,res)=>{
    const data=await Reminder.findOne({username:username});
    res.send(data)
})

app.delete('/delete',async(req,res)=>{
    const data=await Reminder.deleteOne({username:username})
    res.redirect('./dashboard.html')
  

})
const PORT=5000;
app.listen(PORT)