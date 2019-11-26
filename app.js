"use strict"

const express = require("express")
const cors = require("cors")

// Constants
const PORT = 8080

// App
const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

app.use(cors())
app.get("/", (req, res) => {
  res.send({
    message: "travis auto bipingingingingignig",
    port: JSON.stringify(PORT),
    testing_env: JSON.stringify(process.env.TAG),
    kube: "deployment to kubernetes cluster",
    working: 'testing second deployment in develop branch',
    develop:"only develop branch"
  })
})

app.listen(PORT)
console.log(`Running on http://localhost:${PORT}`)
