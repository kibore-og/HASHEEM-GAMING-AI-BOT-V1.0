const { zokou } = require("../framework/zokou");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

zokou({
  nomCom: "url2",
  categorie: "Conversion",
  reaction: "🌚",
  desc: "Téléverse une image, vidéo ou sticker vers Catbox et obtient l'URL",
  alias: ["up"]
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, repondre } = commandeOptions;

  // Vérifie si un message a été mentionné
  if (!msgRepondu) {
    return repondre("⚠️ Tuma picha, video au sticker kwanza kisha reply na amri hii.");
  }

  const mediaMessage =
    msgRepondu.viewOnceMessageV2?.message ||
    msgRepondu.viewOnceMessageV2Extension?.message ||
    msgRepondu.message;

  if (!mediaMessage) {
    return repondre("⚠️ Haiwezekani kusoma media. Jaribu tena.");
  }

  // Gundua aina ya media
  let mediaContent = null;
  let extension = "";

  if (mediaMessage.imageMessage) {
    mediaContent = mediaMessage.imageMessage;
    extension = "jpg";
  } else if (mediaMessage.videoMessage) {
    mediaContent = mediaMessage.videoMessage;
    extension = "mp4";
  } else if (mediaMessage.stickerMessage) {
    mediaContent = mediaMessage.stickerMessage;
    extension = "webp";
  } else {
    return repondre("⚠️ Aina ya media haijulikani. Tuma picha, video au sticker tu.");
  }

  try {
    repondre("⏳ Inapakia... subiri kidogo.");

    // Download media na hifadhi kwenye faili
    const mediaPath = await zk.downloadAndSaveMediaMessage(mediaContent);

    if (!mediaPath || !fs.existsSync(mediaPath)) {
      return repondre("❌ Imeshindwa kupakua media. Jaribu tena.");
    }

    // Tengeneza FormData sahihi kwa Catbox
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", fs.createReadStream(mediaPath), {
      filename: `upload.${extension}`,
      contentType:
        extension === "jpg" ? "image/jpeg" :
        extension === "mp4" ? "video/mp4" :
        "image/webp"
    });

    // Tuma kwa Catbox
    const response = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: {
        ...form.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 60000 // sekunde 60
    });

    // Futa faili ya muda baada ya kupakia
    fs.unlink(mediaPath, () => {});

    const uploadedUrl = response.data?.trim();

    if (!uploadedUrl || !uploadedUrl.startsWith("https://")) {
      return repondre("❌ Catbox haikurejesha URL sahihi. Jaribu tena.");
    }

    repondre(`✅ *Media imepakiwa!*\n\n🔗 URL:\n${uploadedUrl}`);

  } catch (error) {
    console.error("Catbox upload error:", error?.response?.data || error.message);
    repondre("❌ Imeshindwa kupakia media. Angalia muunganiko wa intaneti na ujaribu tena.");
  }
});
