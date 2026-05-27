const express=require("express")
const router=express.Router()

const pool=require("../db")

//creating a lead
router.post("/",async(req,res)=>{

    try{

        const {name,phone,source}=req.body

        // validation
        if(!name || !phone || !source){

            return res.status(400).json({
                message:"All fields required"
            })

        }

        const newLead=await pool.query(

            `INSERT INTO leads
            (name,phone,source)
            VALUES($1,$2,$3)
            RETURNING *`,

            [name,phone,source]

        )

        res.status(201).json(newLead.rows[0])

    }
    catch(err){

        console.log(err)

        res.status(500).json({
            message:"Server error"
        })

    }

})

//fetching all leads
router.get("/",async(req,res)=>{

    try{

        const leads=await pool.query(

            `SELECT * FROM leads
            ORDER BY id DESC`

        )

        res.status(200).json(
            leads.rows
        )

    }
    catch(err){

        console.log(err)

        res.status(500).json({
            message:"Server error"
        })

    }

})

//Updating lead status
router.put("/:id",async(req,res)=>{

    try{

        const {status}=req.body
        const {id}=req.params

        const validStatus=[
            "Interested",
            "Not Interested",
            "Converted"
        ]

        if(!validStatus.includes(status)){

            return res.status(400).json({
                message:"Invalid status"
            })

        }

        const updatedLead=await pool.query(

            `UPDATE leads
            SET status=$1
            WHERE id=$2
            RETURNING *`,

            [status,id]

        )

        if(updatedLead.rows.length===0){

            return res.status(404).json({
                message:"Lead not found"
            })

        }

        res.status(200).json(
            updatedLead.rows[0]
        )

    }
    catch(err){

        console.log(err)

        res.status(500).json({
            message:"Server error"
        })

    }

})

//deleting lead
router.delete("/:id",async(req,res)=>{

    try{

        const {id}=req.params

        const deletedLead=await pool.query(

            `DELETE FROM leads
            WHERE id=$1
            RETURNING *`,

            [id]

        )

        if(deletedLead.rows.length===0){

            return res.status(404).json({
                message:"Lead not found"
            })

        }

        res.status(200).json({

            message:"Lead deleted",
            lead:deletedLead.rows[0]

        })

    }
    catch(err){

        console.log(err)

        res.status(500).json({
            message:"Server error"
        })

    }

})

module.exports=router