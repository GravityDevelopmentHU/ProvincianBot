exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  let modlog = client.channels.find('name', 'mod-log');
  if (!modlog) return message.reply('[HIBA]Nem találom a "mod-log" text csatornát!');
  if (reason.length < 1) return message.reply('[HIBA]Kell egy ok is az unbanoláshoz!');
  if (!user) return message.reply('[HIBA]Rossz @Mentation|Megnevezés').catch(console.error);
  if (message.author.id !== '224883648170557440') return message.reply('[HIBA]Nincs engedélyed!');{

  
  message.guild.unban(user);
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'unban',
  description: 'Ban feloldása.',
  usage: 'unban [@Username] [Ok]'
};
