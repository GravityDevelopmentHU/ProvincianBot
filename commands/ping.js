exports.run = (client, message) => {
  message.channel.sendMessage('Ping?')
    .then(msg => {
      msg.edit(`Pong! (took: ${msg.createdTimestamp - message.createdTimestamp}ms)`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong parancs. Vajon mit is csinálhat? (_SZARKAZMUS_)',
  usage: 'ping'
};
