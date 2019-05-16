const express=require('express');
const router=express.Router();
const {check, validationResult}=require('express-validator/check');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const User=require('../../Modal/User');
const config=require('config');
const jwt=require('jsonwebtoken');

//get user 
router.get('/',(req,res)=>{
    User.find().then(user=>res.json(user));
})
// post users
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
   
  
],(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    return res.status(404).json({errors:errors.array()});
    //check exist users
    const {email,name,password,confirmPassword}=req.body;
    if(!name||!email||!password||!confirmPassword)
    return res.status(404).json({msg:"please fill all field"});
    User.findOne({email})
    .then(user=>{
        if(user) return res.status(404).json({msg:'User already exist'});
        if(req.body.password!==req.body.confirmPassword) return res.status(401).json({msg:"Password does not match"});
        if(password.length < 6 ) return res.status(404).json({msg:"Password at least 6 characters "})
        const avatar=gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });  
        const newUSer=new User({
            name,
            email,
            avatar,
            password
        })
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUSer.password,salt,(err,hash)=>{
                newUSer.password=hash;
                newUSer.save().then(user=>{
                    jwt.sign(
                        {id:user.id},
                        config.get('jwtSecret'),
                        {expiresIn:36000},
                        (err,token)=>{
                            res.json({
                                token,
                                user:{
                                    _id:user.id,
                                    name:user.name,
                                    email:user.email,
                                
                                }
                            })
                        }
                    )
                })
            })
        })
    })
})
module.exports=router;
