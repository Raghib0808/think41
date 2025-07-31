import express from 'express';
import dbconnect from './utils/db.connect.js';
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


dbconnect().
then( ()=>{app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})}
)

