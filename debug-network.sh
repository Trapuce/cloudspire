#!/bin/bash

echo "🔍 Diagnostic réseau Docker pour CloudSpire"
echo "=============================================="

echo ""
echo "📊 Statut des conteneurs :"
docker-compose ps

echo ""
echo "🌐 Test de connectivité API :"
echo "  - Test localhost:8000..."
curl -s -w "Status: %{http_code}\n" http://localhost:8000/api/hotels | head -1

echo ""
echo "🔗 Test de communication interne :"
echo "  - Test nginx -> api..."
docker exec cloudspire_nginx wget -qO- http://api:9000/health.php 2>/dev/null || echo "❌ Échec communication nginx->api"

echo ""
echo "📡 Test frontend -> nginx :"
echo "  - Test frontend -> nginx..."
docker exec cloudspire_frontend wget -qO- http://nginx/api/hotels 2>/dev/null | head -c 50 || echo "❌ Échec communication frontend->nginx"

echo ""
echo "🗄️ Test base de données :"
docker exec cloudspire_api php artisan tinker --execute="echo 'DB: ' . config('database.default') . ' - ' . config('database.connections.mysql.database');"

echo ""
echo "🔧 Solutions possibles :"
echo "  1. Redémarrer Docker Desktop"
echo "  2. docker-compose down -v && docker-compose up -d --build"
echo "  3. Vérifier que les ports 3000 et 8000 sont libres"
echo "  4. Sur Windows/Mac : Désactiver le mode WSL2/Hyper-V si problème"
