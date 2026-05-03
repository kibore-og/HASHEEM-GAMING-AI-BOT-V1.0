const { zokou } = require("../framework/zokou");
const fs = require("fs-extra");

zokou({
  nomCom: "sendcontacts",
  aliases: ["exportcontacts", "dmcontactslist"],
  reaction: "📤",
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
    return repondre("❌ *No contacts saved yet!*");
  }
  
  const contacts = JSON.parse(fs.readFileSync(saveFile, "utf8"));
  
  if (contacts.length === 0) {
    return repondre("❌ *No contacts saved yet!*");
  }
  
  let message = "📋 *ALL SAVED CONTACTS*\n\n";
  for (let i = 0; i < contacts.length; i++) {
    message += `${i+1}. ${contacts[i].name} - ${contacts[i].number}\n`;
  }
  message += `\n_Total: ${contacts.length} contacts_\n_Date: ${new Date().toLocaleString()}_`;
  
  await zk.sendMessage(ownerJid, { text: message });
  repondre(`✅ *Contacts sent to your DM!*\n\nTotal: ${contacts.length} contacts`);
});
