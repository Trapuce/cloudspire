# 🏨 CloudSpire - Système de Gestion d'Hôtels

## 🚀 Démarrage Rapide

### Prérequis
- Docker
- Docker Compose

### Une Seule Commande pour Tout Démarrer

```bash
docker-compose up -d
```

C'est tout ! Le projet se lance automatiquement avec :
- ✅ Base de données MySQL
- ✅ API Backend Laravel  
- ✅ Frontend Next.js

### 🌐 Accès aux Applications

- **Frontend** : http://localhost:3000
- **API Backend** : http://localhost:8000
- **Base de données** : localhost:3306

### 📋 Commandes Utiles

```bash
# Voir l'état des services
docker-compose ps

# Voir les logs
docker-compose logs

# Arrêter le projet
docker-compose down

# Redémarrer le projet
docker-compose restart

# Reconstruire les images
docker-compose up -d --build
```

### 🔧 En Cas de Problème

```bash
# Nettoyer et redémarrer
docker-compose down
docker system prune -f
docker-compose up -d --build
```

### 📊 Endpoints API

- `GET /api/hotels` - Liste des hôtels
- `GET /api/hotels/{id}` - Détails d'un hôtel
- `POST /api/hotels` - Créer un hôtel
- `PUT /api/hotels/{id}` - Modifier un hôtel
- `DELETE /api/hotels/{id}` - Supprimer un hôtel

### 🎯 Test Rapide

```bash
# Tester l'API
curl http://localhost:8000/api/hotels

# Tester le frontend
curl http://localhost:3000
```

---
**Développé avec ❤️ par Daouda Traoré**
