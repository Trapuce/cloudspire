#!/bin/bash

echo "🧪 Test de clone frais - Simulation d'un nouveau développeur"
echo "=============================================================="

# Nettoyer complètement
echo "🧹 Nettoyage complet..."
docker-compose down -v
docker system prune -f

# Supprimer le .env pour simuler un clone frais
echo "🗑️ Suppression du .env (simulation clone frais)..."
rm -f backend/.env

# Démarrer l'application
echo "🚀 Démarrage de l'application..."
docker-compose up -d --build

echo "⏳ Attente de la configuration automatique..."
sleep 60

echo "🧪 Tests des API..."

# Test 1: API GET hotels
echo "📋 Test GET /api/hotels"
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/hotels)
if [ "$response" = "200" ]; then
    echo "✅ GET /api/hotels fonctionne"
else
    echo "❌ GET /api/hotels échoue (code: $response)"
fi

# Test 2: API POST create hotel
echo "➕ Test POST /api/hotels"
response=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8000/api/hotels \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"name":"Test Hotel","address1":"123 Test St","zipcode":"12345","city":"Test City","country":"Test Country","lat":48.8566,"lng":2.3522,"description":"Test description","max_capacity":50,"price_per_night":99.99}')
if [ "$response" = "201" ]; then
    echo "✅ POST /api/hotels fonctionne"
else
    echo "❌ POST /api/hotels échoue (code: $response)"
fi

# Test 3: API DELETE hotel
echo "🗑️ Test DELETE /api/hotels/1"
response=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE http://localhost:8000/api/hotels/1 \
  -H "Accept: application/json")
if [ "$response" = "200" ]; then
    echo "✅ DELETE /api/hotels fonctionne"
else
    echo "❌ DELETE /api/hotels échoue (code: $response)"
fi

# Test 4: Images
echo "🖼️ Test d'accès aux images"
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/storage/hotels/hotel_2_0_1759586752.jpg)
if [ "$response" = "200" ]; then
    echo "✅ Images accessibles"
else
    echo "❌ Images non accessibles (code: $response)"
fi

echo ""
echo "🎯 Résumé des tests:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000/api"
echo "- Base de données: localhost:3306"
echo ""
echo "Si tous les tests sont ✅, l'application fonctionne parfaitement !"
