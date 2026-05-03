const { zokou } = require("../framework/zokou");
const fs = require("fs-extra");

zokou({
  nomCom: "savedcontacts",
  aliases: ["savedlist", "dmcontacts"],
  reaction: "📋",
  categorie: "Owner"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage, arg } = commandeOptions;
  
  // Owner only
  const ownerJid = conf.NUMERO_OWNER + "@s.whatsapp.net";
  if (auteurMessage !== ownerJid) {
    return repondre("❌ *Owner only command!*");
  }
  
  const saveFile = "./saved_contacts.json";
  
  if (!fs.existsSync(saveFile)) {
    return repondre("❌ *No contacts saved yet!*\n\nWhen someone DMs you, they will be saved here.");
  }
  
  const contacts = JSON.parse(fs.readFileSync(saveFile, "utf8"));
  
  if (contacts.length === 0) {
    return repondre("❌ *No contacts saved yet!*");
  }
  
  let message = "📋 *SAVED CONTACTS LIST*\n\n";
  for (let i = 0; i < contacts.length; i++) {
    message += `${i+1}. *${contacts[i].name}*\n   📱 ${contacts[i].number}\n   🕐 ${contacts[i].date}\n\n`;
  }
  message += `\n_Total: ${contacts.length} contacts_`;
  
  await zk.sendMessage(dest, { text: message });
});
