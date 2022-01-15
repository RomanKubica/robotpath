const Robot = require('./robot.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getRobotPosition(robotData) {
  x = robotData.x;
  y = robotData.y;
  d = robotData.direction;
  path = robotData.path;

  //TODO null checks
  let robot = new Robot(x,y,d);
  for (var i = 0; i < path.length; i++) {
    robot.command(path[i]);

    // console.log(robot.getRobotPosition())
  }
  return robot.getRobotData();

}

app.post('/getPath', (req, res) => {
  let robotPosition = getRobotPosition(req.body);
  res.json({robotPosition});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
