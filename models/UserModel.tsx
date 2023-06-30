const { Schema,model } =require("mongoose");
// import { Schema,model } from "mongoose";


const UserBankSchema=new Schema({
  name:{
    type:String,
    required:true,
  },
email:{
  type:String,
  required:true
}
});

// export const UserModel=model('UserModel',UserBankSchema);

module.exports=model('UserModel',UserBankSchema);