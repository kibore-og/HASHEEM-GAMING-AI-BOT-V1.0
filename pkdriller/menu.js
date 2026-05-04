const { zokou } = require("../framework/zokou");
const os = require("os");

zokou({
  nomCom: "menu",
  aliases: ["help", "commands", "list"],
  reaction: "🔥",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage, arg, prefixe } = commandeOptions;
  
  // Uptime
  const uptime = process.uptime();
  const d = Math.floor(uptime / 86400);
  const h = Math.floor((uptime % 86400) / 3600);
  const m = Math.floor((uptime % 3600) / 60);
  const s = Math.floor(uptime % 60);
  
  const uptimeStr = `${d}d ${h}h ${m}m ${s}s`;
  
  // Commands count
  const totalCmds = evt.cm.length;
  
  // Group commands by category
  const cmdGroups = {};
  for (const cmd of evt.cm) {
    const cat = cmd.categorie || "Uncategorized";
    if (!cmdGroups[cat]) cmdGroups[cat] = [];
    cmdGroups[cat].push(cmd);
  }
  
  // Menu image
  const imgUrl = "https://files.catbox.moe/ghxrv1.jpg";
  
  // Build menu
  let menuText = `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃       ✨ *${"HASHEEM GAMING AI"}* ✨
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃
┃ ⚡ *STATUS:* 🟢 ONLINE
┃ 🤖 *BOT:* HASHEEM GAMING V1.0
┃ 👑 *OWNER:* HASHEEM GAMING
┃ 📊 *COMMANDS:* ${totalCmds}
┃ ⏱️ *UPTIME:* ${uptimeStr}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃            📋 *MENU* 📋
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
`;
  
  for (const [cat, cmds] of Object.entries(cmdGroups)) {
    menuText += `┃ 📁 *${cat.toUpperCase()}* [${cmds.length}]
┃ ┌─────────────────────
`;
    for (const cmd of cmds.slice(0, 5)) {
      menuText += `┃ │ ✦ ${prefixe}${cmd.nomCom}
`;
    }
    if (cmds.length > 5) {
      menuText += `┃ │ ... and ${cmds.length - 5} more
`;
    }
    menuText += `┃ └─────────────────────
┃
`;
  }
  
  menuText += `┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃ 💡 *HOW TO USE:*
┃ ${prefixe}menu → Show all commands
┃ ${prefixe}menu <category> → Show category
┃
┃ 📌 *EXAMPLES:*
┃ ${prefixe}menu owner
┃ ${prefixe}menu group
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🎮 *HASHEEM GAMING AI BOT*
┃ 🔥 *POWERED BY JIDENNA HACKER*
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> *THANK YOU FOR USING HASHEEM GAMING AI*`;

  await zk.sendMessage(dest, {
    image: { url: imgUrl },
    caption: menuText,
    mentions: [auteurMessage]
  });
});
