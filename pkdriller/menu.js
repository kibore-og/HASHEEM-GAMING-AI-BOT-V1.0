const { zokou } = require("../framework/zokou");
const os = require("os");
const fs = require("fs-extra");

zokou({
  nomCom: "menu",
  aliases: ["help", "commands", "list", "cmds"],
  reaction: "🎮",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage, arg, prefixe, ms } = commandeOptions;
  
  // Pata uptime ya bot
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / 86400);
  const hours = Math.floor((uptimeSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
  let uptimeString = "";
  if (days > 0) uptimeString += `${days}d `;
  if (hours > 0) uptimeString += `${hours}h `;
  if (minutes > 0) uptimeString += `${minutes}m `;
  uptimeString += `${seconds}s`;
  
  // Picha ya menu
  const menuImage = "https://files.catbox.moe/ghxrv1.jpg";
  
  // Kategoria za commands
  const categories = {
    "👑 OWNER": [],
    "👥 GROUP": [],
    "📋 GENERAL": [],
    "📥 DOWNLOAD": [],
    "🎮 FUN": [],
    "⚙️ OTHER": []
  };
  
  // Pangusa commands kulingana na kategoria
  for (const cmd of evt.cm) {
    const cat = cmd.categorie || "OTHER";
    if (cat === "Owner" || cat === "owner") categories["👑 OWNER"].push(cmd);
    else if (cat === "Group" || cat === "group") categories["👥 GROUP"].push(cmd);
    else if (cat === "General" || cat === "general") categories["📋 GENERAL"].push(cmd);
    else if (cat === "Download" || cat === "download") categories["📥 DOWNLOAD"].push(cmd);
    else if (cat === "Fun" || cat === "fun") categories["🎮 FUN"].push(cmd);
    else categories["⚙️ OTHER"].push(cmd);
  }
  
  // Angalia kama kuna argument ya kategoria
  if (arg && arg[0]) {
    const requestedCat = arg[0].toLowerCase();
    let foundCat = null;
    let catKey = null;
    
    for (const [key, cmds] of Object.entries(categories)) {
      if (key.toLowerCase().includes(requestedCat) || requestedCat.includes(key.toLowerCase())) {
        foundCat = cmds;
        catKey = key;
        break;
      }
    }
    
    if (foundCat && foundCat.length > 0) {
      let catMsg = `╭━━━━━━━━━━━━━━━━━━━━╮\n`;
      catMsg += `┃   📁 *${catKey}* 📁\n`;
      catMsg += `┃━━━━━━━━━━━━━━━━━━━━┛\n`;
      catMsg += `┃\n`;
      
      for (const cmd of foundCat) {
        const aliases = cmd.aliases ? ` (${cmd.aliases.join(", ")})` : "";
        catMsg += `┃ 📌 *${prefixe}${cmd.nomCom}*${aliases}\n`;
        if (cmd.description) {
          catMsg += `┃    └─ ${cmd.description}\n`;
        }
        catMsg += `┃\n`;
      }
      catMsg += `┃━━━━━━━━━━━━━━━━━━━━\n`;
      catMsg += `┃ 📊 *Total:* ${foundCat.length} commands\n`;
      catMsg += `┃ 🎮 *HASHEEM GAMING*\n`;
      catMsg += `╰━━━━━━━━━━━━━━━━━━━━╯`;
      
      return await zk.sendMessage(dest, {
        image: { url: menuImage },
        caption: catMsg,
        mentions: [auteurMessage]
      });
    }
  }
  
  // Menu kuu
  let menuCaption = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃       🎮 *HASHEEM GAMING* 🎮
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃
┃ 🤖 *Bot:* HASHEEM GAMING AI V1.0
┃ 👑 *Owner:* HASHEEM GAMING
┃ 📡 *Prefix:* ${prefixe}
┃ ⏱️ *Uptime:* ${uptimeString}
┃ 📊 *Total Cmds:* ${evt.cm.length}
┃ 👤 *User:* @${auteurMessage.split('@')[0]}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃        📋 *COMMAND LIST* 📋
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
`;

  for (const [cat, cmds] of Object.entries(categories)) {
    if (cmds.length > 0) {
      menuCaption += `┃ 📁 *${cat}* [${cmds.length}]
┃ ┌─────────────────────
`;
      // Onyesha commands za kwanza 3 tu kwenye menu kuu
      const displayCmds = cmds.slice(0, 3);
      for (const cmd of displayCmds) {
        menuCaption += `┃ │ ✦ ${prefixe}${cmd.nomCom}
`;
      }
      if (cmds.length > 3) {
        menuCaption += `┃ │ ... and ${cmds.length - 3} more
`;
      }
      menuCaption += `┃ └─────────────────────
┃
`;
    }
  }

  menuCaption += `┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃ 💡 *HOW TO USE:*
┃ ┌─────────────────────
┃ │ ${prefixe}menu → Show all commands
┃ │ ${prefixe}menu owner → Owner commands
┃ │ ${prefixe}menu group → Group commands
┃ │ ${prefixe}menu general → General commands
┃ └─────────────────────
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🎮 *HASHEEM GAMING AI BOT*
┃ 🔥 *POWERED BY HASHEEM*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

> *THANK YOU FOR USING HASHEEM GAMING AI*`;

  await zk.sendMessage(dest, {
    image: { url: menuImage },
    caption: menuCaption,
    mentions: [auteurMessage]
  });
});
