#!/bin/bash
set -e

echo "🚀 Démarrage de CloudSpire Hotel API..."

# Attendre un peu que MySQL soit prêt
echo "⏳ Attente de la base de données..."
sleep 15
echo "✅ Continuation du démarrage..."

# Créer le fichier d'environnement s'il n'existe pas
if [ ! -f /var/www/.env ]; then
    echo "📝 Création du fichier .env..."
    cat > /var/www/.env << 'EOF'
APP_NAME=CloudSpire
APP_ENV=local
APP_KEY=base64:7c88554c-b944-458d-893f-4f4c618f76d0
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=hotel_management
DB_USERNAME=hotel_user
DB_PASSWORD=hotel_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
EOF
fi

# Créer les répertoires de stockage
echo "📁 Création des répertoires de stockage..."
mkdir -p /var/www/storage/framework/sessions
mkdir -p /var/www/storage/framework/views
mkdir -p /var/www/storage/framework/cache
mkdir -p /var/www/storage/framework/cache/data
mkdir -p /var/www/storage/logs
mkdir -p /var/www/storage/app/public
mkdir -p /var/www/bootstrap/cache

# Définir les permissions
echo "🔐 Configuration des permissions..."
chown -R www-data:www-data /var/www/storage
chown -R www-data:www-data /var/www/bootstrap/cache
chmod -R 775 /var/www/storage
chmod -R 775 /var/www/bootstrap/cache

# Créer le lien symbolique pour le stockage
echo "🔗 Création du lien symbolique de stockage..."
php artisan storage:link || echo "⚠️  Le lien de stockage existe déjà"

# Exécuter les migrations (sans forcer)
echo "🗄️  Exécution des migrations..."
php artisan migrate || echo "⚠️  Les migrations sont déjà à jour"

echo "✅ CloudSpire Hotel API est prêt!"
echo "🌐 API disponible sur: http://localhost:8000"
echo "📊 Base de données: MySQL sur le port 3306"

exec "$@"
