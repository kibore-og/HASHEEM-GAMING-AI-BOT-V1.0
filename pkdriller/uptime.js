const { zokou } = require("../framework/zokou");
const os = require("os");

zokou({
  nomCom: "uptime",
  aliases: ["live", "online", "status"],
  reaction: "🟢",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage, ms } = commandeOptions;
  
  // Pata uptime
  const uptimeSec = process.uptime();
  const d = Math.floor(uptimeSec / 86400);
  const h = Math.floor((uptimeSec % 86400) / 3600);
  const m = Math.floor((uptimeSec % 3600) / 60);
  const s = Math.floor(uptimeSec % 60);
  
  // Make it look nice
  const daysStr = d.toString().padStart(2, '0');
  const hoursStr = h.toString().padStart(2, '0');
  const minutesStr = m.toString().padStart(2, '0');
  const secondsStr = s.toString().padStart(2, '0');
  
  // Picha ya hasheem
  const imageUrl = "https://files.catbox.moe/ghxrv1.jpg";
  
  // Tuma
  await zk.sendMessage(dest, {
    image: { url: imageUrl },
    caption: `┏━━━━━━━━━━━━━━━━━━┓
┃   🤖 *BOT STATUS* 🤖
┣━━━━━━━━━━━━━━━━━━┛
┃
┃ 🟢 *ONLINE* - ACTIVE
┃
┃ ⏱️ *UPTIME*
┃ ┌────────────────
┃ │ ${daysStr} Days
┃ │ ${hoursStr} Hours  
┃ │ ${minutesStr} Minutes
┃ │ ${secondsStr} Seconds
┃ └────────────────
┃
┃ 🎮 *HASHEEM GAMING AI*
┃ 💫 *VERSION 1.0*
┃
┃ 👑 *Request:* @${auteurMessage.split('@')[0]}
┃
┃ 🕐 *${new Date().toLocaleTimeString()}*
┃
┗━━━━━━━━━━━━━━━━━━

> *⚡ DEVELOPED BY JIDENNA HACKER*`,
    mentions: [auteurMessage]
  });
});
