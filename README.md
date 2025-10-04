# CloudSpire

Application de gestion d'hôtels avec Laravel (backend) et Next.js (frontend).

## 🚀 Démarrage rapide

```bash
# Cloner le projet
git clone <url-du-repo>
cd cloudspire

# Démarrer l'application (tout se configure automatiquement)
docker-compose up -d --build
```

**C'est tout !** 🎉 

L'application se configure automatiquement :
- ✅ Base de données créée et migrée
- ✅ Données de test insérées (seeders)
- ✅ Permissions configurées
- ✅ Images générées automatiquement
- ✅ Liens de stockage créés

## 🌐 Accès à l'application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Base de données**: localhost:3306

## 🔧 Services

- **Frontend**: Next.js sur le port 3000
- **Backend**: Laravel API sur le port 8000  
- **Base de données**: MySQL sur le port 3306
- **Nginx**: Serveur web pour le backend

## 🧪 Tests

### Tests Laravel
```bash
# Tous les tests
docker exec cloudspire_api php artisan test

# Tests spécifiques
docker exec cloudspire_api php artisan test --filter=HotelControllerTest
docker exec cloudspire_api php artisan test --filter=HotelPictureControllerTest

# Tests avec environnement dédié
docker exec cloudspire_api php artisan test --env=testing
```

### Tests Frontend
```bash
# Tests Next.js
docker exec cloudspire_frontend npm test
```

## 🛠️ Développement

### Backend (Laravel)
```bash
# Accéder au conteneur backend
docker exec -it cloudspire_api bash

# Commandes Laravel utiles
php artisan migrate
php artisan db:seed
php artisan test
php artisan route:list
php artisan config:cache
```

### Frontend (Next.js)
```bash
# Accéder au conteneur frontend
docker exec -it cloudspire_frontend bash

# Commandes Next.js
npm install
npm run dev
npm run build
```

## 📊 API Endpoints

### Hôtels
- `GET /api/hotels` - Liste des hôtels
- `POST /api/hotels` - Créer un hôtel
- `GET /api/hotels/{id}` - Détails d'un hôtel
- `PUT /api/hotels/{id}` - Modifier un hôtel
- `DELETE /api/hotels/{id}` - Supprimer un hôtel

### Images d'hôtels
- `POST /api/hotels/{id}/pictures` - Upload d'une image
- `POST /api/hotels/{id}/pictures/multiple` - Upload multiple
- `PATCH /api/hotels/{id}/pictures/{picture}` - Modifier position
- `DELETE /api/hotels/{id}/pictures/{picture}` - Supprimer image

## 🐛 Résolution de problèmes

### Problèmes courants après un clone

1. **Images ne s'affichent pas**
   ```bash
   docker exec cloudspire_api php artisan storage:link
   docker exec cloudspire_api chown -R www-data:www-data /var/www/storage
   ```

2. **API retourne des erreurs 500**
   ```bash
   docker exec cloudspire_api php artisan migrate --force
   docker exec cloudspire_api php artisan db:seed --force
   ```

3. **Permissions refusées**
   ```bash
   docker exec cloudspire_api chown -R www-data:www-data /var/www/storage
   docker exec cloudspire_api chmod -R 775 /var/www/storage
   ```

4. **Base de données vide**
   ```bash
   docker exec cloudspire_api php artisan db:seed --force
   ```

## 📝 Commandes utiles

```bash
# Voir les logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart api
docker-compose restart frontend

# Arrêter l'application
docker-compose down

# Nettoyer complètement
docker-compose down -v
docker system prune -f
```