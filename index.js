import express from "express"
import { Worker } from "worker_threads"

const PORT = 3000
const app = express()

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Health checks !!!" })
})


app.get("/non-blocking", (req, res) => {
    res.status(200).json({ msg: "Non-blocking response" })
})

app.get("/blocking", (req, res) => {
    
    const worker = new Worker("./worker.js");
    worker.on("message", (data)=>{
        return res.status(200).json({ msg: "Computation completed", data })
    })

    worker.on("error", (req, res, error)=>{
        next(error)
    })
   
})




app.use((error, req, res) => {
    if (error) {
        console.log("Error ", error)
        res.status(500).json({ msg: "Server error" })
    }
})

app.listen(PORT, () => {
    console.log("Server is running in the PORT :: ", PORT)
})