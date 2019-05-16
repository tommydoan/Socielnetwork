const express=require('express');
const router=express.Router();
const request=require('request');
const config=require('config');
const Profile=require('../../Modal/Profile');
const {check, validationResult}=require('express-validator/check');
const auth=require('../../Middleware/auth');
const User=require('../../Modal/User');
const Post=require('../../Modal/Post');
//get profile for me with token/ private
router.get('/me',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
        if(!profile) return res.status(400).json({msg:"There is no profile for this user"});
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.json("Server error");
    }
})
// Post profile with token/ private
router.post('/',auth,async(req,res)=>{
    //Create profile 
    const { Company,Location,Bio,Skills,Gender,Country,youtube,
        facebook,twitter,instagram,Status,Name } = req.body;
    const profileFields={};
        profileFields.user=req.user.id;
        if(Company) profileFields.Company=Company;
        if(Bio) profileFields.Bio=Bio;
        if(Location) profileFields.Location=Location;
        if(Gender) profileFields.Gender=Gender;
        if(Country) profileFields.Country=Country;
        if(Status) profileFields.Status=Status;
        if(Name) profileFields.Name=Name;
        if(Skills){
            profileFields.Skills=Skills
        }
        //create socila profile
        profileFields.social={};
        if(youtube) profileFields.social.youtube=youtube;
        if(facebook) profileFields.social.facebook=facebook;
        if(twitter) profileFields.social.twitter=twitter;
        if(instagram) profileFields.social.instagram=instagram;
        
        //Edit profile 
        try {
            let profile= await Profile.findOne({user:req.user.id});
            if(profile){
                await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true});
                return res.json(profileFields);
            }
            //Create without profile
            profile=new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(404).json("Server error");
        }
});
//Get user with id no auth/ public
router.get('/:user_id',async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name',['avatar']]);
            return await res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(404).json("Server error here");
    }
})
//Get all profiles
router.get('/',async(req,res)=>{
    const profile= await Profile.find().populate(['name','avatar']);
    res.json(profile);
})

// Delete user and profile/ Private
router.delete('/user&profile',auth,async(req,res)=>{
    try {
        await Post.deleteMany({user:req.user.id})
        await Profile.findOneAndDelete({user:req.user.id});
        await User.findOneAndRemove({_id:req.user.id})
        res.json("success");
    } catch (error) {
        console.error(error.message);
        res.json("server error");
    }
    
})

// Put api, create experience / private
router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','company is required').not().isEmpty(),
    check('from','From is required').not().isEmpty(),
]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    return res.status(404).json({errors:errors.array()});
    //create profile/education
    const {title,company,from,to,description,location}=req.body;
    const newExp={
        title,company,from,to,description,location
    }

    try {
        const profile=await Profile.findOne({user:req.user.id});
        await profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(404).json("Server error");
    }
})
// Delete api/profiles/experience
router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id});
        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
        await profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.json("Server error");
    }
})

// Put api/profiles/education , private
router.put('/addeducation',[auth,[
    check('school','School is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','fieldofstudy is required').not().isEmpty(),
    check('from','from is required').not().isEmpty(),
   // check('to','to is required').not().isEmpty(),
    check('description','description is required').not().isEmpty(),
  //  check('current','Current is required').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    return res.status(404).json({errors:errors.array()});
    //create education
    const {school,degree,fieldofstudy,from,to,current,description}=req.body;
    const newEdu={
        school,degree,fieldofstudy,from,to,current,description
    }
    try {
        const profile=await Profile.findOne({user:req.user.id});
        await profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile)
    } catch (error) {
        console.error(error.message);
        res.json("Server error");
    }
});
    //Delete api/profile/education/:edu_id
router.delete('/education/:edu_id',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id});
        const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id);
        await profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.json("Server error");
    }
})

//Get api/profile for github
router.get('/github/:username',(req,res)=>{
    try {
        const option={
            uri:`http://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=
            ${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
            method:"GET",
            headers:{'user-agent':'node.js'}
        }
        request(option,(error,response,body)=>{
            if(error) return console.error(error);
            if(response.statusCode!==200){
                return res.status(404).json({msg:"No git hub profile found"});
            }
            res.json(JSON.parse(body));
        })
    } catch (error) {
        
    }
})
module.exports=router;