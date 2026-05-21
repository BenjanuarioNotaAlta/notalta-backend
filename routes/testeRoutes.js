const express = require("express");
const router = express.Router();
const testeController = require("../controllers/testeController");

// ============================================
// MÚLTIPLA ESCOLHA (tcme.html)
// ============================================
router.get("/multipla/perguntas/:nivel", testeController.getPerguntasMultipla);
router.post("/multipla/verificar", testeController.verificarMultipla);
router.get("/multipla/ranking", testeController.getRankingMultipla);

// ============================================
// VERDADEIRO OU FALSO (tcvf.html)
// ============================================
router.get("/vf/perguntas/:nivel", testeController.getPerguntasVF);
router.post("/vf/verificar", testeController.verificarVF);
router.get("/vf/ranking", testeController.getRankingVF);

// ============================================
// ESTATÍSTICAS DO USUÁRIO
// ============================================
router.post("/salvar-resultado", testeController.salvarResultado);
router.get("/estatisticas/:userId", testeController.getEstatisticas);
router.get("/historico/:userId", testeController.getHistorico);

module.exports = router;
