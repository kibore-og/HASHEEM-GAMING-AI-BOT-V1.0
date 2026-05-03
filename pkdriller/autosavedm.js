const { zokou } = require("../framework/zokou");
const fs = require("fs-extra");

zokou({
  nomCom: "autosavedm",
  aliases: ["autosave", "savedmtoggle"],
  reaction: "⚙️",
  categorie: "Owner"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage, arg } = commandeOptions;
  
  // Owner only
  const ownerJid = conf.NUMERO_OWNER + "@s.whatsapp.net";
  if (auteurMessage !== ownerJid) {
    return repondre("❌ *Owner only command!*");
  }
  
  const configFile = "./auto_save_config.json";
  let config = { enabled: true };
  
  if (fs.existsSync(configFile)) {
    config = JSON.parse(fs.readFileSync(configFile, "utf8"));
  }
  
  if (!arg || arg[0] === "") {
    const status = config.enabled ? "✅ ENABLED" : "❌ DISABLED";
    return repondre(`⚙️ *AUTO-SAVE DM STATUS*\n\n📊 *Status:* ${status}\n\n📝 *Commands:*\n└─ .autosavedm on  - Enable\n└─ .autosavedm off - Disable`);
  }
  
  if (arg[0].toLowerCase() === "on") {
    config.enabled = true;
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    repondre("✅ *Auto-save DM ENABLED!*\n\nNew contacts will be saved automatically.");
  } 
  else if (arg[0].toLowerCase() === "off") {
    config.enabled = false;
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    repondre("❌ *Auto-save DM DISABLED!*\n\nNew contacts will NOT be saved.");
  } 
  else {
    repondre("❌ Invalid option!\n\nUse: `.autosavedm on` or `.autosavedm off`");
  }
});
