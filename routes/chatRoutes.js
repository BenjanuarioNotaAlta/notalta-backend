const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Chat público (já existente)
router.post("/enviar", chatController.enviarMensagem);
router.get("/mensagens", chatController.buscarMensagens);
router.delete("/mensagens/:userId", chatController.limparMensagens);

module.exports = router;
