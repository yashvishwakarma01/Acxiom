const mongoose=require('mongoose')

const Schema=new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    date:{
        type:String
    },
    subject:{
        type:String
    },
    description:{
        type:String
    },
    email:{
        type:String
    },
    contact:{
        type:String
    },
    sms:{
        type:String
    }
})

module.exports=mongoose.model('Reminder',Schema);