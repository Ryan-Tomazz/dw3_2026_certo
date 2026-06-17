# ==========================================
# SETUP.ps1 - Script de inicialização (Windows)
# ==========================================
# Execute no PowerShell: .\setup.ps1

Write-Host "🚀 Iniciando setup do Roteiro 13..." -ForegroundColor Green
Write-Host ""

# Verificar se Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não encontrado. Instale em: https://nodejs.org" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js versão: $(node --version)" -ForegroundColor Green
Write-Host ""

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "✅ Dependências instaladas!" -ForegroundColor Green
Write-Host ""

# Criar arquivo .env
if (-not (Test-Path .env)) {
    Write-Host "📝 Criando arquivo .env..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠️  IMPORTANTE: Edite .env com seus dados de PostgreSQL" -ForegroundColor Red
    Write-Host ""
}

Write-Host "=========================================="
Write-Host "🎯 PRÓXIMOS PASSOS:" -ForegroundColor Green
Write-Host ""
Write-Host "1️⃣  Edite .env com sua CONNECTION STRING do PostgreSQL" -ForegroundColor Cyan
Write-Host ""
Write-Host "2️⃣  Execute o script SQL:" -ForegroundColor Cyan
Write-Host "    - Abra seu editor SQL (Neon, pgAdmin, etc)" -ForegroundColor Gray
Write-Host "    - Execute todo o conteúdo de: scripts/schema.sql" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Inicie a aplicação:" -ForegroundColor Cyan
Write-Host "    npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  Teste as APIs usando requests.http" -ForegroundColor Cyan
Write-Host ""
Write-Host "=========================================="
