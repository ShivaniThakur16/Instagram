import { uploadFile } from "../services/storage.service.js"
import { generateCaption } from "../services/ai.service.js"
import {v4 as uuidv4} from "uuid";
import { createpost , getPosts } from "../dao/post.dao.js"

export async function createpostcontroller(req,res){
    const {mention} = req.body

    const {file , caption} = await Promise.all([
        uploadFile(req.file,uuidv4()),
        generateCaption(req.file)

    ])
    const post = await createpost({
        mentions,
        url:file.url,
        caption,
        user:req.user._id
    })

    res.status(201).json({
        message:"Post created successfully",
        post
        
    })
}
export async function getPostsController(req, res) {
    const posts = await getPosts(req.query.skip, req.query.limit && req.query.limit>20 ? 20 : req.query.limit);
    
return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    });

}