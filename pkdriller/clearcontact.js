const { zokou } = require("../framework/zokou");
const fs = require("fs-extra");

zokou({
  nomCom: "clearcontacts",
  aliases: ["deletecontacts", "resetcontacts"],
  reaction: "🗑️",
  categorie: "Owner"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage, arg } = commandeOptions;
  
  // Owner only
  const ownerJid = conf.NUMERO_OWNER + "@s.whatsapp.net";
  if (auteurMessage !== ownerJid) {
    return repondre("❌ *Owner only command!*");
  }
  
  const saveFile = "./saved_contacts.json";
  
  if (!arg || arg[0] !== "confirm") {
    return repondre("⚠️ *Are you sure?*\n\nType: `.clearcontacts confirm` to delete all saved contacts.");
  }
  
  if (fs.existsSync(saveFile)) {
    fs.writeFileSync(saveFile, JSON.stringify([], null, 2));
    repondre("✅ *All saved contacts have been cleared!*");
  } else {
    repondre("❌ *No saved contacts found!*");
  }
});
