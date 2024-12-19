import userSchema from "./models/user.model.js";
import profileSchema from './models/profile.model.js';
import postSchema from './models/post.model.js';
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer";
const {sign}=pkg;
const transporter = nodemailer.createTransport({
   service:"gmail",
    auth: {
      user: "Chikkuuzzzz@gmail.com",
      pass: "sgfa ctqc sqsv fjry",
    },
});

export async function home(req,res) {
    try {
        const _id=req.user.userId;
        const user=await userSchema.findOne({_id});
        const profile=await profileSchema.findOne({userId:_id});
        if(!user)
            return res.status(403).send({msg:"Unauthorized acces"});
        res.status(200).send({username:user.username,profile,id:_id})
        
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}

export async function profile(req,res) {
    try {
        const _id=req.user.userId;
        const user=await userSchema.findOne({_id});
        if(!user)
            return res.status(403).send({msg:"Unauthorized acces"});
        const profile=await profileSchema.findOne({userId:_id})
        res.status(200).send({username:user.username,profile})
        
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}

export async function editUser(req,res) {
    try {
    const {...user}=req.body;
    const id=req.user.userId
    const check=await profileSchema.findOne({userId:id})
    if(check){
        const data=await profileSchema.updateOne({userId:user.userId},{$set:{...user}});
    }else{
        const data=await profileSchema.create({userId:id,...user});
    }
    res.status(201).send({msg:"updated"});
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
    
}

export async function verifyEmail(req,res) {
    const {email}=req.body;
    
 try {
     // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Hai 👻" <hai@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Verify Mail ID", // Subject line
        text: "Confirm your account", // plain text body
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .btn {
            display: inline-block;
            background-color: #4CAF50;
            color: #fff;
            text-decoration: none;
            padding: 15px 30px;
            margin-top: 20px;
            border-radius: 4px;
            font-size: 18px;
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <p>Hello,</p>
        <p>Please verify your email address by clicking the button below.</p>
        <a href="http://localhost:5173/register" class="btn">Verify Your Account</a>
    </div>

</body>
</html>`, // html body
    });
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

        return res.status(201).send({msg:"Confirmation mail succefully sent",email});
    } catch (error) {
    
    }


}
export async function signUp(req,res) {
    try {
        const {email,username,password,cpassword}=req.body;
        if(!(email&&username&&password&&cpassword))
            return res.status(404).send({msg:"fields are empty"});
        if(password!==cpassword)
            return res.status(404).send({msg:"password not matched"})
        bcrypt.hash(password,10).then((hashedPassword)=>{
            userSchema.create({email,username,password:hashedPassword}).then(()=>{
                return res.status(201).send({msg:"success"});
            }).catch((error)=>{
                return res.status(404).send({msg:"Not registered"})
            })
        }).catch((error)=>{
            return res.status(404).send({msg:error}); 
        })
    } catch (error) {
        return res.status(404).send({msg:error});
    }
}

export async function signIn(req,res) {
    const {email,password}=req.body;
    if(!(email&&password))
        return res.status(404).send({msg:"feilds are empty"})
    const user=await userSchema.findOne({email})
    if(user===null)
        return res.status(404).send({msg:"invalid email"})
    //convert to hash and compare using bcrypt
    const success=await bcrypt.compare(password,user.password);
    console.log(success);
    if(success!==true)
        return res.status(404).send({msg:"email or password is invalid"})
    //generate token using sign(JWT key)
    const token=await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
    console.log(token);
    return res.status(200).send({msg:"Succefully logged in",token})
}
export async function addPost(req,res) {
    try {
    const {...post}=req.body;
    const likes=[];
    const data=await postSchema.create({...post,likes});
    return res.status(201).send({msg:"Post Added"});
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}
export async function getPost(req,res) {
    try {
        const id=req.user.userId;
        const post=await postSchema.find({userId:id});
        return res.status(200).send(post);
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}

export async function ser(req,res) {
    const {email}=req.body
    const user=await userSchema.deleteOne({email})
    console.log(user);
    
}

export async function postDetails(req,res) {
    try {
        const id=req.user.userId;
        const {_id}=req.params;
        const post=await postSchema.findOne({_id});
        const user=await userSchema.findOne({_id:id},{username:1})
        const profile=await profileSchema.findOne({userId:id},{profile:1})
        return res.status(200).send({username:user.username,profile:profile.profile,post});
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}

export async function getPosts(req,res) {
    try {
        const post=await postSchema.find({});
        return res.status(200).send(post);
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}
export async function addLike(req,res) {
    const {id}=req.body;
    const uid=req.user.userId;
    const update=await postSchema.updateOne( { _id: id },  { $push: { likes: uid } })
    return res.status(201).send({msg:"success"})
}