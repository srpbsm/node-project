'use strict';

const express = require('express');
const cors = require('cors')


// Constants
const PORT = 8080;


// App
const app = express();

app.use(cors())
app.get('/', (req, res) => {
  res.send({message:'travis auto bipingingingingignig',
  port:JSON.stringify(PORT),
  testing_env:JSON.stringify(process.env.TAG)
});
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
