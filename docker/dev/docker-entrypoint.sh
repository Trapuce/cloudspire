#!/bin/bash
set -e

# Copier le fichier d'environnement
cp -f /var/www/.env.example /var/www/.env

# Terminer l'installation de Composer
#composer dump-autoload

# Créer les répertoires de stockage
mkdir -p /var/www/storage/framework/sessions
mkdir -p /var/www/storage/framework/views
mkdir -p /var/www/storage/framework/cache
mkdir -p /var/www/storage/framework/cache/data
mkdir -p /var/www/storage/logs

# Définir les permissions
chown -R www-data:www-data /var/www/storage
chmod -R 775 /var/www/storage

php artisan storage:link

exec "$@"
