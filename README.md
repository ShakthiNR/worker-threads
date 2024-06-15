## worker-threads

# In this repo for,
1. Multi-threading in same process,
2. Use to handle CPU intensive works,
3. Give works to each core of cpu.
4. Why? -> Node js is super good for i/o intensive through thread we make multithreading and CPU intensive operations
# Basic Example
```js
 import { Worker } from "worker_threads"
 const worker = new Worker("./worker.js");

 /* Worker js (Have CPU intensive works)
 
    let counter = 0;
    for (let i = 0; i <= 20_000_000_000; i++) {
        counter++;
    }

    parentPort.postMessage(counter)
 */

// Event listener
 worker.on("message", (data)=>{
     return res.status(200).json({ msg: "Computation completed", data })
 })
worker.on("error", (req, res, error)=>{
    next(error)
})
 ```

# Assign work for each core
1. refer four_workers folder