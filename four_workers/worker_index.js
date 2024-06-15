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


// worker creation
const THREAD_COUNT = 4
function createWorker() {
    return new Promise((resolve, reject) => {

        const worker = new Worker("./worker-helper.js", {
            workerData: { thread_count: THREAD_COUNT }
        })

        worker.on("message", (data) => {
            resolve(data)
        })

        worker.on("error", (req, res, error) => {
            reject("Error occured")
        })
    })
}

app.get("/blocking", async (req, res) => {

    const workerPromise = []
    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromise.push(createWorker())
    }

    const thread_result = await Promise.all(workerPromise)
    const total = thread_result[0] + thread_result[1] + thread_result[2] + thread_result[3]

    res.status(200).json({ msg: "computation result", data: total })
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
