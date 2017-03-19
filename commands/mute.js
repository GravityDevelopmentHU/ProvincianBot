const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'mod-log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'MUTED');
  if (!modlog) return message.reply('[HIBA]Nem találom a "mod-log" text csatornát!').catch(console.error);
  if (!muteRole) return message.reply('[HIBA]Nincs `MUTED` nevű role!').catch(console.error);
  if (reason.length < 1) return message.reply('[HIBA]Kell egy ok is a némításhoz!').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('[HIBA]Valakit meg kell nevezned a banoláshoz (MENTION | @username)!').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setAuthor('ProvinciaBot', 'http://i64.tinypic.com/2re46s9.jpg')
    .setThumbnail('http://i64.tinypic.com/2re46s9.jpg') 
    .setTimestamp()
    .addField('Tevékenység:', 'Un/Mute')
    .addField('Felhasználó:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Modrátor:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Ok', reason);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('[HIBA]Nincs hozzá engedélyem :3 (MANAGE_ROLES_OR_PERMISSIONS)').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description: 'Lenémítja a megnevezett felhasznalot! (MENTION | @username)',
  usage: 'un/mute [@Username] [Ok]'
};
