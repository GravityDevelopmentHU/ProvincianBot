exports.run = (client, message, args) => {
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.sendMessage(`Nincs ilyen parancs: ${args[0]}`);
  } else {
    message.channel.sendMessage(`Újratöltés: ${command}`)
      .then(m => {
        client.reload(command)
          .then(() => {
            m.edit(`Sikeresen újratöltve: ${command}`);
          })
          .catch(e => {
            m.edit(`Újratöltés nem sikerült: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 4
};

exports.help = {
  name: 'reload',
  description: 'Parancs újratöltése',
  usage: 'reload <JavaScript modul => ./commands/parancs.js>'
};
