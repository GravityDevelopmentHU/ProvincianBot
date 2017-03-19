const Discord = require('discord.js');

module.exports = (guild, user) => {

  guild.defaultChannel.sendMessage(`${user.username} un lett banolva!`);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Tevékenység:', 'Unban')
    .addField('Felhasználó:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Modrátor:', `${guild.client.unbanAuth.username}#${guild.client.unbanAuth.discriminator}`)
    .addField('Ok:', guild.client.unbanReason);
  return guild.channels.get(guild.channels.find('name', 'mod-log').id).sendEmbed(embed);

};
