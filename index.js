import markersRoute from "./routes/markers.route";

const express = require('express')
const bodyParser = require('body-parser');
export const index = express()
const port = 3005


index.use(bodyParser.json());
index.get('/', (req, res) => {
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

index.use('/markers',markersRoute);


index.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


