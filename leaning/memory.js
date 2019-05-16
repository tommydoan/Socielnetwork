//PROFILE 
const express=require('express');
const router=express.Router();
const auth=require('../../Middleware/auth');
const {check, validationResult}=require('express-validator/check');
const Profile=require('../../Modal/Profile');
const User=require('../../Modal/User');
//get me with token // Private
router.get('/me',auth,async (req,res)=>{
    const profile=await Profile.findOne({user:req.user.id});
    if(!profile) return res.status(400).json({msg:"There is no profile for this user"});
    res.json(profile);
})
// post profile with token// Private
router.post('/',[auth,[
    check('Gender','Gender is required').not().isEmpty(),
    check('Skills','Skill is required').not().isEmpty(),
    check('Country','Country is so important to required').not().isEmpty(),
    check('Name','Name is so important to required').not().isEmpty()
]],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    return res.status(500).json({errors:errors.array()});
    // Create profile
   

        const profileFields={};
        profileFields.user=req.user.id;
        
        if(Skills){
            profileFields.Skills=Skills.split(',').map(skill=>skill.trim());
        }
        // Create Social 
        profileFields.social={};
        
        //Edit profile
        try {
            let profile=await Profile.findOne({user:req.user.id});
            if(profile){
                await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true});
                return res.json(profileFields);
            }
            // If not , create profile
             profile=new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).json("Server error");
        }
});

// get all profiles / public
router.get('/',async(req,res)=>{
    const profile=await Profile.find().populate('user',['name','avatar']);
    res.json(profile);
})

// get 1 profile with user_id/ public
router.get('/user/:user_id',async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile) return res.status(404).json({msg:'User not found'});
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind=='ObjectId') return res.status(404).json({msg:"User not found"});
    }
})
// Delete profile & user with auth/private
router.delete('/',auth,async(req,res)=>{
    //delete profile (user)
    try {
        await Profile.findOneAndDelete({user:req.user.id});
        await User.findOneAndDelete({_id:req.user.id})
        res.json("User deleted");
    } catch (error) {
        console.error(error.message);
        res.json("Server error");
    }
})

module.exports=router;

// post 
router.get('/allposts',async(req,res)=>{
    const post=await Post.find();
    res.json(post);
})

// post api/post private
router.post('/',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()});
    }
    // create post
    try {
        const user=await User.findById(req.user.id);     
        const newPost=new Post({
        name:user.name,
        text:req.body.text,
        avatar:user.avatar,
        user:user.id
        });
        await newPost.save();
        res.json(newPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("serer error");
    }
});
//Get api post for a user , private
router.get('/:user_id',auth,async(req,res)=>{
    try {
        const post=await Post.find({user:req.params.user_id});
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("serer error");
    }
})
//Get api post for a user , private option 2
/**router.get('/',auth,async(req,res)=>{
    try {
        const post=await Post.find({user:req.user.id});
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("serer error");
    }
}) */
//Delete api posts
router.delete('/:id',auth,async(req,res)=>{
    try {
              const  post=await Post.findById(req.params.id);  
              if(post.user.toString!==req.user.id){
                  return res.status(401).json({msg:"User not authorized"})
              }
              await  post.remove();
              return res.json("success");                           
    } catch (error) {
        if(error.kind=='ObjectId')
        console.error(error.message);
        res.status(500).json("USer not found");
    }
})
// Put api/posts/likes
router.put('/likes/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(404).json({msg:"This post already liked"});
        }
        await post.likes.unshift({user:req.user.id});
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("USer not found");
    }
});
// Put api/posts/unlike/:id /// private
router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(404).json({msg:"user has not yet been liked"});
        }
        const removeIndex= post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("USer not found");
    }
})