module.exports = member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Köszönjetek el ${member.user.username} -tól/től!`);
};
