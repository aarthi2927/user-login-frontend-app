import express from "express";
const router=express.Router();
import{getfilesById,deletefiles ,getAllfiles,updatefiles,createfiles} from '../helper.js';
import { auth } from "./auth.js";
import multer from "multer";
import path from "path";
const filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(filename);
let BASE_URL = process.env.Backend_url;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
        cb(null,'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
 })
 const uploadStorage = multer({ storage: storage,
limits:{
  fileSize: 12 * 1024 * 1024,
}})

router.post("/add",auth,uploadStorage.single("filedata",'text'),async(req,res)=>{
    //const filedata =req.file;
    //`${process.env.Backend_url}/${req.file.filename}`
    try{
     const heading =req.body.heading;
      const subheading =req.body.subheading;
      const description =req.body.description;
      const userId=req.user.userid;
      const data1 ={heading,subheading,description,
        filedata: {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          filename:req.file.filename,
          path: req.file.path, // This might be useful in some scenarios
          size: req.file.size,
      },userId};
      console.log(heading)
      const result=await createfiles(data1);
    res.status(200).send(result);
    console.log(data1);
    }
    catch (error) {
      res.status(500).send({ error: error.message });
    }
     })


router.get("/view",auth,async function (req, res) {
    const files=await getAllfiles();
    console.log(files);
    res.send(files);
     })
 
  router.get("/:id",auth, async function (req, res) {
      console.log(req.params);
      const{id}=req.params;
      const file=await getfilesById(id);
      console.log(file);
     res.send(file)
          })
     //delete
     router.delete("/:id",auth, async function (req, res) {
     console.log(req.params);
      const{id}=req.params;
      const result=await deletefiles(id);
      console.log(result);
      res.send(result);
      })
     
  router.put("/:id", auth,async function (req, res) {
    try{
      console.log(req.params);
      const{id}=req.params;
      const updateData=req.body;
      const result=await updatefiles(id, updateData);
      console.log(result);
      res.send(result);
    }
    catch (error) {
      console.error('Error updating file:', error);
      res.status(500).send('Internal Server Error');
    }

     })
      //
 
      
      export const filesRouter=router;