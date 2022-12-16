const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const User = require("../../models/users");
const { createError } = require("../../helpers/createError");
const avatarsDirPth = path.join(__dirname, "..", "..", "public", "avatars");
async function updateAvatar(req, res) {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const extension = path.extname(originalname);
  const filename = `${_id}${extension}`;
  const targetAvatarPath = path.join(avatarsDirPth, filename);
  try {
    Jimp.read(tempPath, (_, image) => {
      image.resize(250, 250).quality(60).write(targetAvatarPath);
    });
  } catch (error) {
    throw createError({ status: 400, message: "Something went wrong!" });
  }

  await fs.rename(tempPath, targetAvatarPath);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
}

module.exports = updateAvatar;
