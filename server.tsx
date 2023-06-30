const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const data=require('./data/accounts.json');
const bodyparser=require('body-parser');
// const AccountSchema=require('./models/AccountSchema')
// const BankUser=require('./models/BankUser');
// const {UserModel}=require('./models/UserModel')



const port = process.env.PORT || 5000;

const app=express();

app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://mohini:mohinimohini@cluster0.sqdke.mongodb.net/test')
.then(()=>console.log('DB Connected'));


  const AccountSchema=mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: [100, "Name can not be more than 100 characters"],
      },
      email: {
        type: String,
    
        required: [true, "Please provide email"],
      },
      pancard: {
        type: String,
        required: [true, "Please provide pancard"],
        minlength: 10,
        maxlength: 10,
      },
    
      bankName: {
        type: String,
        required: [true, "Please provide bankName"],
      },
      AccountType: {
        type: String,
        enum: ["Savings", "Salary"],
      },
      FixedDeposits: {
        type: Number,
        default: 0,
      },
      Balance: {
        type: Number,
      },
      isFlagged:{
        type:Boolean,
        default:false,
      }
});



module.exports=mongoose.model('AccountSchema',AccountSchema);
app.post('/addaccount',async(req,res)=>{
    try{
        const newData=await new AccountSchema({
            name:"mohini",
            email:"mohini@gmail.com",
            pancard:'ABCDEFGHJ',
            bankName:'SBI',
            FixedDeposits:2,
            Balance:240000,
            isFlagged:true,
        })
        newData.save();
        return res.json(await AccountSchema.find());
    }
    catch(err){
        console.log(err);
        
    }
})  
const BankSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required:true,
    },
  });
  module.exports = mongoose.model("BankSchema",BankSchema);
app.post('/adduser',async(req,res)=>{
    // const {name,email}=req.body;
    try{
        const newData=await new BankSchema({
            name:"mohini",
            email:"mohini@gmail.com"
        })
        newData.save();
        return res.json(await BankSchema.find());
    }
    catch(err){
        console.log(err);
        
    }
})


app.get('/getAccounts',async(req,res)=>{
    try{
        return await res.json(data);
    }
    catch(err){
        console.log(err);
        
    }
})

app.use(cors({
    origin:'*'
}))


app.get('/',(req,res)=>{
    res.send('Hi There!');
});


app.listen(port,()=>console.log(`App Running on Server ${port}`)
);