module.exports = (guild, user) => {
  guild.defaultChannel.sendMessage(`${user.username} ki lett banolva!`);
};
