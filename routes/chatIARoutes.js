const express = require("express");
const router = express.Router();
const chatIAController = require("../controllers/chatIAController");

// Chat com IA (chatai.html)
router.post("/perguntar", chatIAController.perguntar);
router.get("/historico/:userId", chatIAController.getHistorico);
router.delete("/historico/:userId", chatIAController.limparHistorico);
router.post("/feedback", chatIAController.salvarFeedback);

module.exports = router;
