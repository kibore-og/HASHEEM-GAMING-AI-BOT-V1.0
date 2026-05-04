const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "ping",
  aliases: ["pong", "speedtest"],
  reaction: "🏃",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  const start = Date.now();
  
  // Funny loading messages
  const loading = [
    "🏃‍♂️ *Racing to measure speed...*",
    "📡 *Catching signal waves...*",
    "⚡ *Charging lightning bolt...*",
    "🔄 *Calculating nanoseconds...*",
    "🎮 *Gaming mode activated...*"
  ];
  
  const randomLoad = loading[Math.floor(Math.random() * loading.length)];
  const loadMsg = await zk.sendMessage(dest, { text: randomLoad });
  
  const end = Date.now();
  const ping = end - start;
  
  let pingEmoji = ping < 100 ? "🚀" : ping < 300 ? "⚡" : "🐌";
  let pingResponse = ping < 100 ? "FAST AF! 🔥" : ping < 300 ? "Decent 💪" : "Bro, fix your connection! 📡";
  
  await zk.sendMessage(dest, {
    text: `╭━〔 *PONG!* 〕━╮
┃
┃ ${pingEmoji} *${ping}ms*
┃ 📝 ${pingResponse}
┃
┃ 🤖 *HASHEEM GAMING*
┃ 🎮 *Level:* ${ping < 100 ? "PRO" : ping < 300 ? "AMATEUR" : "NOOB"}
┃
╰━━━━━━━━━━╯

> *Powered by JIDENNA HACKER*`,
    edit: loadMsg.key
  });
});
