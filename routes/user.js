const express = require('express');
const { authenticate } = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.get('/user', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.Nickname}` });
});

router.put('/update-level', authenticate, async (req, res) => {

  const { Nickname, Level } = req.body;

  if (!Nickname || !Level) {
    return res.status(400).json({ error: "Request body is wrong." });
  }

  try {
    const updatedPlayer = await User.findOneAndUpdate(
      { Nickname: req.body.Nickname }, 
      { $set: { Level: req.body.Level } }, 
      { new: true } 
    );

    if (updatedPlayer) {
      return res.status(200).json({ message: "Player level updated", player: updatedPlayer });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Güncelleme Hatası:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

router.put('/update-highScore', authenticate, async (req, res) => {
  const { Nickname, HighScore } = req.body;

  if (!Nickname || !HighScore) {
    return res.status(400).json({ error: "Request body is wrong." });
  }

  try {
    const updatedPlayer = await User.findOneAndUpdate(
      { Nickname: req.body.Nickname }, 
      { $set: { HighScore: req.body.HighScore } }, 
      { new: true } 
    );

    if (updatedPlayer) {
      return res.status(200).json({ message: "Player highscore updated", player: updatedPlayer });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    console.error("Güncelleme Hatası:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

router.put('/change-password', authenticate, async (req, res) => {
  const { CurrentPassword, NewPassword } = req.body;

  if (!CurrentPassword || !NewPassword) {
    return res.status(400).json({ error: "Request body is wrong." });
  }

  try {
    const player = await User.findById(req.user.id);

    if (!player) {
      return res.status(404).json({ error: "Player not found." });
    }

    const passwordMatch = await bcrypt.compare(CurrentPassword, player.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    player.Password = NewPassword;
    await player.save();

    return res.status(200).json({ message: "Password is updated" });
  } catch (error) {
      console.error("Wrong password:", error);
      return res.status(500).json({ error: "Server error." });
  }
});


module.exports = router;