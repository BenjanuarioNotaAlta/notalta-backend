const express = require("express");
const router = express.Router();
const perfilController = require("../controllers/perfilController");

// Perfil do usuário (home.html)
router.post("/salvar", perfilController.salvarPerfil);
router.get("/buscar", perfilController.buscarPerfil);
router.put("/atualizar/:userId", perfilController.atualizarPerfil);
router.delete("/deletar/:userId", perfilController.deletarPerfil);

module.exports = router;
