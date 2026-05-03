const { zokou } = require("../framework/zokou");
const fs = require("fs-extra");

zokou({
  nomCom: "contactscount",
  aliases: ["savedcount", "dmcount"],
  reaction: "🔢",
  categorie: "Owner"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage } = commandeOptions;
  
  // Owner only
  const ownerJid = conf.NUMERO_OWNER + "@s.whatsapp.net";
  if (auteurMessage !== ownerJid) {
    return repondre("❌ *Owner only command!*");
  }
  
  const saveFile = "./saved_contacts.json";
  
  if (!fs.existsSync(saveFile)) {
    return repondre("📊 *0 contacts saved*");
  }
  
  const contacts = JSON.parse(fs.readFileSync(saveFile, "utf8"));
  repondre(`📊 *Total saved contacts:* ${contacts.length}`);
});
