const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'mod-log');
  if (!modlog) return message.reply('[HIBA]Nem találom a "mod-log" text csatornát!');
  if (reason.length < 1) return message.reply('[HIBA]Kell egy ok is a figyelmeztetéshez!');
  if (message.mentions.users.size < 1) return message.reply('[HIBA]Valakit meg kell nevezned a banoláshoz (MENTION | @username)!').catch(console.error);
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setAuthor('ProvinciaBot', 'http://i64.tinypic.com/2re46s9.jpg')
  .setThumbnail('http://i64.tinypic.com/2re46s9.jpg')
  .setTimestamp()
  .addField('Tevékenység:', 'Warning')
  .addField('Felhasználó:', `${user.username}#${user.discriminator}`)
  .addField('Moderátor:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Ok', reason);
  return client.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'warn',
  description: 'Figyelmeztetés',
  usage: 'warn [@Username] [Ok]'
};
