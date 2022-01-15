const Robot = require('./robot.js');

test('move forward South', () => {
    let robot = new Robot(1,1,'S');
    robot.command('F');
    expect(robot.getPositionY()).toBe(2);
    robot.command('R');
    expect(robot.getPositionY()).toBe(2);
    expect(robot.getDirection()).toBe('W');
  });
