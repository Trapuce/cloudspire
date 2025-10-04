FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    nginx \
    supervisor \
    mysql-client \
    oniguruma-dev \
    libxml2-dev \
    bash \
    curl \
    git

RUN docker-php-ext-install \
    bcmath \
    ctype \
    fileinfo \
    mbstring \
    pdo_mysql \
    xml \
    pdo

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ENV APP_ENV=local
WORKDIR /var/www

COPY backend/ .

RUN composer install --no-interaction --optimize-autoloader --prefer-dist --no-dev

COPY backend/docker/dev/nginx.conf /etc/nginx/http.d/default.conf
COPY backend/docker/dev/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY backend/docker/dev/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir -p storage/framework/sessions \
    storage/framework/views \
    storage/framework/cache \
    storage/framework/cache/data \
    storage/logs \
    bootstrap/cache

RUN chown -R www-data:www-data /var/www
RUN chmod -R 755 /var/www
RUN chmod -R 775 /var/www/storage

COPY backend/docker/dev/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
