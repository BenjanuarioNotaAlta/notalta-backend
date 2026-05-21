const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configurado APENAS para o Firebase
app.use(cors({ 
  origin: "https://notaalta.web.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ============================================
// ROTAS DE TESTE
// ============================================
app.get("/api/teste1", (req, res) => {
  res.json({ 
    success: true, 
    message: "✅ Rota de teste 1 funcionando!",
    timestamp: new Date().toISOString()
  });
});

app.post("/api/teste2", (req, res) => {
  res.json({ 
    success: true, 
    message: "✅ Rota de teste 2 funcionando!",
    dadosRecebidos: req.body
  });
});

app.post("/api/teste3/gerar", (req, res) => {
  const { tema, disciplina, paginas } = req.body;
  
  console.log("📥 Recebido:", { tema, disciplina, paginas });
  
  const prompt = `Tema: ${tema}, Disciplina: ${disciplina}, Páginas: ${paginas}`;
  const chatURL = `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;
  
  res.json({ 
    success: true, 
    url: chatURL,
    mensagem: "Teste funcionando!"
  });
});

// ============================================
// IMPORTAR TODAS AS ROTAS
// ============================================
let trabalhoRoutes, simuladorRoutes, testeRoutes, chatRoutes, chatIARoutes, perfilRoutes;

try {
  trabalhoRoutes = require("./routes/trabalhoRoutes");
  console.log("✅ Rotas de trabalho carregadas");
} catch (error) {
  console.error("❌ Erro ao carregar rotas de trabalho:", error.message);
  trabalhoRoutes = null;
}

try {
  simuladorRoutes = require("./routes/simuladorRoutes");
  console.log("✅ Rotas de simulador carregadas");
} catch (error) {
  console.error("❌ Erro ao carregar rotas de simulador:", error.message);
  simuladorRoutes = null;
}

try {
  testeRoutes = require("./routes/testeRoutes");
  console.log("✅ Rotas de teste carregadas");
} catch (error) {
  console.error("❌ Erro ao carregar rotas de teste:", error.message);
  testeRoutes = null;
}

try {
  chatRoutes = require("./routes/chatRoutes");
  console.log("✅ Rotas de chat carregadas");
} catch (error) {
  console.error("❌ Erro ao carregar rotas de chat:", error.message);
  chatRoutes = null;
}

try {
  chatIARoutes = require("./routes/chatIARoutes");
  console.log("✅ Rotas de chat IA carregadas");
} catch (error) {
  console.error("❌ Erro ao carregar rotas de chat IA:", error.message);
  chatIARoutes = null;
}

try {
  perfilRoutes = require("./routes/perfilRoutes");
  console.log("✅ Rotas de perfil carregadas");
} catch (error) {
  console.error("❌ Erro ao carregar rotas de perfil:", error.message);
  perfilRoutes = null;
}

// ============================================
// USAR ROTAS (se existirem)
// ============================================
if (trabalhoRoutes) app.use("/api/trabalho", trabalhoRoutes);
if (simuladorRoutes) app.use("/api/simulador", simuladorRoutes);
if (testeRoutes) app.use("/api/teste", testeRoutes);
if (chatRoutes) app.use("/api/chat", chatRoutes);
if (chatIARoutes) app.use("/api/chat-ia", chatIARoutes);
if (perfilRoutes) app.use("/api/perfil", perfilRoutes);

// ============================================
// ROTA PRINCIPAL
// ============================================
app.get("/", (req, res) => {
  res.json({ 
    message: "API NotaAlta funcionando!",
    status: "online",
    versao: "2.0.0",
    endpoints_disponiveis: {
      testes: [
        "GET /api/teste1",
        "POST /api/teste2", 
        "POST /api/teste3/gerar"
      ],
      trabalho: trabalhoRoutes ? "/api/trabalho/*" : "❌ INDISPONÍVEL",
      simulador: simuladorRoutes ? "/api/simulador/*" : "❌ INDISPONÍVEL",
      teste: testeRoutes ? "/api/teste/*" : "❌ INDISPONÍVEL",
      chat: chatRoutes ? "/api/chat/*" : "❌ INDISPONÍVEL",
      chatIA: chatIARoutes ? "/api/chat-ia/*" : "❌ INDISPONÍVEL",
      perfil: perfilRoutes ? "/api/perfil/*" : "❌ INDISPONÍVEL"
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`📚 API NotaAlta v2.0 pronta para uso`);
  console.log(`🔗 https://notalta-backend.onrender.com`);
});
