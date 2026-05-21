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
// ROTA DE TESTE 1
// ============================================
app.get("/api/teste1", (req, res) => {
  res.json({ 
    success: true, 
    message: "✅ Rota de teste 1 funcionando!",
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ROTA DE TESTE 2
// ============================================
app.post("/api/teste2", (req, res) => {
  res.json({ 
    success: true, 
    message: "✅ Rota de teste 2 funcionando!",
    dadosRecebidos: req.body
  });
});

// ============================================
// ROTA DE TESTE 3
// ============================================
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
// IMPORTAR ROTAS REAIS
// ============================================
let trabalhoRoutes;

try {
  trabalhoRoutes = require("./routes/trabalhoRoutes");
  console.log("✅ Rotas de trabalho carregadas com sucesso");
} catch (error) {
  console.error("❌ Erro ao carregar rotas de trabalho:", error.message);
  trabalhoRoutes = null;
}

// ============================================
// USAR ROTAS REAIS
// ============================================
if (trabalhoRoutes) {
  app.use("/api/trabalho", trabalhoRoutes);
  console.log("📌 Rotas /api/trabalho ativadas");
} else {
  console.log("⚠️ Rotas /api/trabalho NÃO foram ativadas");
}

// ============================================
// ROTA PRINCIPAL
// ============================================
app.get("/", (req, res) => {
  res.json({ 
    message: "API NotaAlta funcionando!",
    status: "online",
    endpoints_disponiveis: {
      testes: [
        "GET /api/teste1",
        "POST /api/teste2",
        "POST /api/teste3/gerar"
      ],
      trabalho: trabalhoRoutes ? "/api/trabalho/*" : "❌ NÃO DISPONÍVEL"
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`📚 API NotaAlta pronta para uso`);
});
