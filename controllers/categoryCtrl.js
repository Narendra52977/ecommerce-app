const Category = require("../models/categoryModel")

const catagoryCtrl={
    getCategories:async(req,res)=>{
       try{
           const categories=await Category.find()
           res.json(categories)

       }catch(err){
           return res.status(500).json({msg:err.message})
       }
    },
    createCategory:async (req,res)=>{
        try{
            //const categories=await Catagory.find()
            const {name}=req.body
            const category=await Category.findOne({name})
            console.log(category)
            if(category) return res.status(400).json({msg:"Category already Exists"})
            const newCategory=new Category({name})
            await newCategory.save()
            return  res.json({msg:"Created Category Successfully"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    deleteCategory:async(req,res)=>{
        try{
            console.log(req.params.id)
            await Category.findOneAndDelete({_id:req.params.id})
            res.json({msg:"deleted successfully"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }

    },
   updateCategory:async(req,res)=>{
        try{
            const {name}=req.body
            await Category.findOneAndUpdate({_id:req.params.id},{name})
            res.json({msg:"Updated a Category"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }

    }
}

module.exports=catagoryCtrl