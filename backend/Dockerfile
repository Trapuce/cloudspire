FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y --fix-missing \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libpq-dev \
    default-mysql-client \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache \
    && mkdir -p /var/www/storage/logs \
    && chown -R www-data:www-data /var/www/storage/logs \
    && chmod -R 775 /var/www/storage/logs

# Create health check endpoint
RUN echo "<?php http_response_code(200); echo 'OK'; ?>" > /var/www/public/health.php

# Generate Laravel key if not exists
RUN if [ ! -f .env ]; then \
        cp .env.example .env && \
        php artisan key:generate; \
    fi

# Create storage link for public access
RUN php artisan storage:link || true

# Create startup script
RUN echo '#!/bin/bash' > /start.sh && \
    echo 'composer install --no-interaction --optimize-autoloader --no-dev' >> /start.sh && \
    echo 'mkdir -p /var/www/storage/logs' >> /start.sh && \
    echo 'chown -R www-data:www-data /var/www/storage' >> /start.sh && \
    echo 'chmod -R 775 /var/www/storage' >> /start.sh && \
    echo 'php artisan migrate --force' >> /start.sh && \
    echo 'mkdir -p /var/www/storage/app/public/hotels' >> /start.sh && \
    echo 'if [ ! -f /var/www/storage/.seeded ]; then' >> /start.sh && \
    echo '    php artisan db:seed --force' >> /start.sh && \
    echo '    touch /var/www/storage/.seeded' >> /start.sh && \
    echo 'fi' >> /start.sh && \
    echo 'php artisan storage:link' >> /start.sh && \
    echo 'php-fpm' >> /start.sh && \
    chmod +x /start.sh

EXPOSE 9000

CMD ["php-fpm"]