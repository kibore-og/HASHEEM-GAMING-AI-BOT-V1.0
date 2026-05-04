const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "menu",
  aliases: ["help", "commands", "list"],
  reaction: "🎮",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  const { auteurMessage, prefixe } = commandeOptions;
  
  // Uptime
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  
  // Group commands
  const groups = {};
  for (const cmd of evt.cm) {
    const cat = cmd.categorie || "General";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(cmd);
  }
  
  const menuImage = "https://files.catbox.moe/ghxrv1.jpg";
  
  let output = `╔════════════════════════════╗
║     🎮 *GAMING MENU* 🎮
║════════════════════════════
║
║ 🎮 *PLAYER:* @${auteurMessage.split('@')[0]}
║ 🤖 *BOT:* HASHEEM GAMING
║ ⏱️ *ONLINE:* ${hours}h ${minutes}m ${seconds}s
║
`;
  
  for (const [cat, cmds] of Object.entries(groups)) {
    const emoji = cat === "Owner" ? "👑" : cat === "Group" ? "👥" : cat === "General" ? "📋" : cat === "Download" ? "📥" : "🎮";
    output += `║ ${emoji} *${cat.toUpperCase()}*
║ ──────────────────────
`;
    for (const cmd of cmds.slice(0, 4)) {
      output += `║  ✦ ${prefixe}${cmd.nomCom}
`;
    }
    if (cmds.length > 4) {
      output += `║  ✦ +${cmds.length - 4} more
`;
    }
    output += `║
`;
  }
  
  output += `║════════════════════════════
║
║ 💡 *COMMANDS:*
║ ${prefixe}menu → Main menu
║ ${prefixe}menu owner → Owner cmds
║
╚════════════════════════════╝

🔥 *JIDENNA HACKER*`;

  await zk.sendMessage(dest, {
    image: { url: menuImage },
    caption: output,
    mentions: [auteurMessage]
  });
});
