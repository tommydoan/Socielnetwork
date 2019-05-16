const express=require('express');
const router=express.Router();
const auth=require('../../Middleware/auth');
const User=require('../../Modal/User');
const jwt=require('jsonwebtoken');
const config=require('config');
const bcrypt=require('bcryptjs');
//get user with token
router.get('/',auth,async (req,res)=>{
    try {
        const user=await User.findById(req.user.id)
        .select('-password');
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error');
    }
})
//post user with auth
router.post('/',(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password)
    return res.status(404).json({msg:"Please fill all field"});
    User.findOne({email})
    .then(user=>{
        if(!user) return res.status(404).json({msg:"User does not exist"});
        bcrypt.compare(password, user.password)
        .then(isMath=>{
            if(!isMath) return res.status(401).json({msg:"Invalid Credential"});
            jwt.sign(
                {id:user.id},
                config.get('jwtSecret'),
                {expiresIn:36000},
                (err,token)=>{
                    if(err) throw err;
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

module.exports=router;