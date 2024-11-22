const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");

router.post("/create", (req, res) => {
    console.log("Request Body:", req.body);

const { First_name, Middle_name, Last_name, Email, PhoneNo1, PhoneNo2, Adress } = req.body;

    // Log each field for debugging
   
    if (!First_name || !Middle_name || !Last_name || !Email || !PhoneNo1 || !PhoneNo2 || !Adress) {
        console.error("Validation Error: Missing required fields.");
        return res.status(422).json("Please fill in all required data.");
    }
    try {
        conn.query("SELECT * FROM contacts WHERE Email = ?", Email, (err, result) => {
            if (result.length) {
                res.status(422).json("This Data is Already Exist")
            } else {
                conn.query("INSERT INTO contacts SET ?", { First_name, Middle_name, Last_name, Email, PhoneNo1, PhoneNo2, Adress}, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }


   // res.status(200).json("Data is valid.");
});

// get contacts
router.get("/get",(req,res)=>{

    conn.query("SELECT * FROM contacts ORDER BY CONCAT(First_name, ' ', Middle_name, ' ', Last_name)",(err,result)=>{
        if(err){
            res.status(422).json("nodata available");
        }else{
            res.status(201).json(result);
        }
    })
});

// delete contact api
router.delete("/delete/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("DELETE FROM contacts WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});

// get single contact
router.get("/viewcontact/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("SELECT * FROM contacts WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});

// update contact
router.patch("/updatecontact/:id",(req,res)=>{

    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE contacts SET ? WHERE id = ? ",[data,id],(err,result)=>{
        if(err){
            res.status(422).json({message:"error"});
        }else{
            res.status(201).json(result);
        }
    })
});



module.exports = router;