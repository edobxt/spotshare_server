import markersRoute from "./routes/markers.route";

const express = require('express')
const bodyParser = require('body-parser');
export const app = express()
const port = 3005


app.use(bodyParser.json());
app.get('/', (req, res) => {
  try{
      console.log(req.body.movie);
      return res.json({
          status: 200,
          success: true,
      });
  }catch (e) {
      console.log(e)
      return res.json({
            status: 400,
            success: false,
        });

  }
})

app.use('/markers',markersRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


