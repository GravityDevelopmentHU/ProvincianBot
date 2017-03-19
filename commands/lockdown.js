const ms = require('ms');
exports.run = (client, message, args) => {
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('[HIBA]Meg kell adnod egy időtartamot a zárlathoz!');

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.sendMessage('Zárlat feloldva.');
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.sendMessage(`Csatorna lezárva: ${ms(ms(time), { long:true })}`).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.sendMessage('Zárlat feloldva.')).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ld'],
  permLevel: 2
};

exports.help = {
  name: 'lockdown',
  description: 'Zárlat egy csatornára',
  usage: 'lockdown <időtartam>'
};
