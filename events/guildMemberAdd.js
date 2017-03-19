module.exports = member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Üdv ${member.user.username} a szerveren!`);
};
