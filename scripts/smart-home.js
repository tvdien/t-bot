module.exports = function(robot) {
  function runCommandAndResponse(cmd, msg) {
    let exec = require('child_process').exec;
    exec(cmd, function(error, stdout, stderr) {
      if (error) {
        msg.send(error);
        msg.send(stderr);
      } else {
        msg.send(stdout);
      }
    });
  }

  robot.hear(/Smart bot turn (on|off) air conditioner/i, function(msg) {
    let airCmdText = msg.match[1];
    let cmd = `cd external-scripts/smart-home && python3 irrp.py -p -g17 -f codes air:${airCmdText}`;
    if (!process.env.SMART_HOME) {
      msg.send('System environment is not defined');
      msg.send(cmd);
      return;
    }

    msg.send(`Sending: Turn ${airCmdText} air conditioner`);
    runCommandAndResponse(cmd, msg);
  });
};
