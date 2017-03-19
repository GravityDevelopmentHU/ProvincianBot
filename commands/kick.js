const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'mod-log');
  if (!modlog) return message.reply('[HIBA]Nem találom a "mod-log" text csatornát!');
  if (reason.length < 1) return message.reply('[HIBA]Kell egy ok is a kickeléshez!');
  if (message.mentions.users.size < 1) return message.reply('[HIBA]Valakit meg kell nevezned a banoláshoz (MENTION | @username)!').catch(console.error);

  if (message.author.id !== '224883648170557440') return message.reply('[HIBA]Nincs engedélyed!');
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setAuthor('ProvinciaBot', 'http://i64.tinypic.com/2re46s9.jpg')
    .setThumbnail('http://i64.tinypic.com/2re46s9.jpg')
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Tevékenyslg:', 'kick')
    .addField('Felhasználó:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Modrátor:', `${message.author.username}#${message.author.discriminator}`)
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
  name: 'kick',
  description: 'Kickeli a megnevezett felhasznalot! (MENTION | @username)',
  usage: 'kick [@username] [Ok]'
};
