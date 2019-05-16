const express=require('express');
const router=express.Router();
const Post=require('../../Modal/Post');
const {check, validationResult} =require('express-validator/check');
const auth=require('../../Middleware/auth');
const User=require('../../Modal/User');
//Post api post
router.post('/',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()});
    }
    try {
        const user=await User.findById(req.user.id);
    const newPost=new Post({
        user:user.id,
        name:user.name,
        email:user.email,
        avatar:user.avatar,
        text:req.body.text
    });
    await newPost.save();
    res.json(newPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});
//get api post for all post
router.get('/allposts',async(req,res)=>{
    try {
        const post=await Post.find();
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});
//Get api post by user id 2 option 
router.get('/me/:id',async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
})
/**router.get('/me',auth,async(req,res)=>{
    try {
        const post=await Post.find({user:req.user.id});
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
}) */

// Delete post of user/id private
router.delete('/:id',auth,async(req,res)=>{
    const post=await Post.findById(req.params.id);
    if(post.user.toString()!==req.user.id){
        return res.status(401).json("No authorized");
    }
    await post.remove();
    await post.save();
    res.json(post);
});

// put post/likes private
router.post('/likes/:id/:userId',async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        //const postUser=await Post.findOne({user:req.params.userId})
        //const user=await User.findById(req.user.id);
        if(post.likes.filter(like=>like.user.toString()===req.params.userId).length>0){
            return res.status(404).json({msg:"This post already liked"});
        }else{
            newUser={
                user:req.params.userId,
                
            }
            await post.likes.unshift(newUser);
         
            await post.save();
            res.json(post.likes);
        }
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("USer not found here");
    }
    
});
// Put post/unlikes // private 
router.delete('/unlikes/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(500).json({msg:"Post has not still been liked"});
        }
        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        await post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});
//Post api/posts/comment/:id private
router.post('/comments/:id',[auth,[
    check('text','Text is requied').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()});
    }
    try {
        const user=await User.findById(req.user.id);
        const newComments={
            user:user.id,
            text:req.body.text,
            name:user.name,
            avatar:user.avatar
        }

        const post=await Post.findById(req.params.id);
        await post.comments.unshift(newComments);
        await post.save();
        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});
// Delete api/posts/comments/:id/:comment_id // the owner of post can delete the others comment'user 
router.delete('/comments/:id/:comment_id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        //check comment
       const user=await User.findById(req.user.id)
        if(post.user.toString()===req.user.id )
        {
            const removeIndex= post.comments.map(comment=>comment.id).indexOf(req.params.comment_id);
            await post.comments.splice(removeIndex,1);
            await post.save();
            return res.json(post.comments);
        }else {
            return res.status(500).json({msg:"No authorized"});
        }
        //check user
       
        
    //delete comment
            const removeIndex= post.comments.map(comment=>comment.id).indexOf(req.params.comment_id);
                await post.comments.splice(removeIndex,1);
                await post.save();
                 res.json(post.comments);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});
// delete comment with token owner of posts
/**router.delete('/comments/owner/:id/:comment_id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.user.toString()===req.user.id)
        {
            const removeIndex= post.comments.map(comment=>comment.id).indexOf(req.params.comment_id);
            await post.comments.splice(removeIndex,1);
            await post.save();
            return res.json(post.comments);
        }
        res.json("No authorized")
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
}) */
module.exports=router;