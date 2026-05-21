const express = require("express");
const router = express.Router();
const simuladorController = require("../controllers/simuladorController");

// ============================================
// SECUNDÁRIO
// ============================================
router.get("/secundario/avaliacao", simuladorController.getSecundarioAvaliacao);
router.get("/secundario/exame", simuladorController.getSecundarioExame);
router.post("/secundario/corrigir", simuladorController.corrigirSecundario);

// ============================================
// TÉCNICO PROFISSIONAL
// ============================================
router.get("/tecnico/avaliacao", simuladorController.getTecnicoAvaliacao);
router.get("/tecnico/exame", simuladorController.getTecnicoExame);
router.post("/tecnico/corrigir", simuladorController.corrigirTecnico);

// ============================================
// UNIVERSITÁRIO
// ============================================
router.get("/universitario/avaliacao", simuladorController.getUniversitarioAvaliacao);
router.get("/universitario/exame", simuladorController.getUniversitarioExame);
router.post("/universitario/corrigir", simuladorController.corrigirUniversitario);

// ============================================
// PROGRESSO DO USUÁRIO
// ============================================
router.post("/salvar-progresso", simuladorController.salvarProgresso);
router.get("/progresso/:userId", simuladorController.getProgresso);
router.get("/ranking/:nivel", simuladorController.getRanking);

module.exports = router;
