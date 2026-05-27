require("dotenv").config()

const express=require("express")
const cors=require("cors")
const pool=require("./db")

const app=express()

app.use(cors())
app.use(express.json())

const leadRoutes=require("./routes/leadRoutes")

app.use("/api/leads",leadRoutes)

//testing db connection
const testDB=async()=>{

    try{

        const result=await pool.query(
            "SELECT NOW()"
        )

        console.log("Database connected")
        console.log(result.rows)

    }
    catch(err){

        console.log(err)

    }

}

testDB()

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{

    console.log(`Server running on ${PORT}`)

})
