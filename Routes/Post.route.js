const express = require('express')
const postRouter = express.Router()
const Post = require('../Models/Post')


// post Create Method

postRouter.post('/add',async(req,res)=>{
    const payload = req.body
    try{
        const newPost = new Post(payload)
        await newPost.save()
        res.status(200).send({"msg":"Post Created Success"})
    }
    catch(err){
        console.log(err)
        res.status(400).send({'err':"Something went wrong"})
    }
})

// All Post Here

postRouter.get('/',async(req,res)=>{
    try{
        const posts = await Post.find()
        res.status(200).send({"msg":"All Todos",posts})
    }
    catch(err){
        console.log(err)
        res.status(400).send({'err':"Something went wrong"})
    }
})

// Post Update Method Here

postRouter.patch('/update/:postID',async(req,res)=>{
    const postID = req.params.postID
    const userID = req.body.userID
    const todos = await Post.findOne({_id:postID})
    if(userID !== todos.userID){
        res.status(400).send({"msg":'User is Not Authorized'})
    }
    try{
        await Post.findByIdAndUpdate({_id:postID},req.body)
        res.status(200).send({"msg":"Note Updated Successfully"})
    }
    catch(err){
        console.log(err)
        res.status(400).send({'err':"Something went wrong"})
    }
})

// Post Deleted Method Here

postRouter.delete("/delete/:postID",async(req,res)=>{
    const postID = req.params.postID
    const userID = req.body.userID
    const posts = await Post.findOne({_id:postID})
    if(userID !== posts.userID){
        res.status(400).send({"msg":'User is Not Authorized'})
    }else{
        await Post.findByIdAndDelete({_id:postID})
        res.status(200).send({"msg":"Note Deleted Successfully"})
    }
})

module.exports={
    postRouter
}