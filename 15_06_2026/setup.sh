#!/bin/bash
# ==========================================
# SETUP.sh - Script de inicialização
# ==========================================
# Execute: bash setup.sh
# Ou no PowerShell: .\setup.ps1

echo "🚀 Iniciando setup do Roteiro 13..."
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale em: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js versão: $(node --version)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

echo ""
echo "✅ Dependências instaladas!"
echo ""

# Criar arquivo .env
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    echo "⚠️  IMPORTANTE: Edite .env com seus dados de PostgreSQL"
    echo ""
fi

echo "==========================================
"
echo "🎯 PRÓXIMOS PASSOS:"
echo ""
echo "1️⃣  Edite .env com sua CONNECTION STRING do PostgreSQL"
echo ""
echo "2️⃣  Execute o script SQL:"
echo "    - Abra seu editor SQL (Neon, pgAdmin, etc)"
echo "    - Execute todo o conteúdo de: scripts/schema.sql"
echo ""
echo "3️⃣  Inicie a aplicação:"
echo "    npm run dev"
echo ""
echo "4️⃣  Teste as APIs usando requests.http"
echo ""
echo "==========================================
"
