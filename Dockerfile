# 1. On utilise une image professionnelle prête pour Laravel
FROM serversideup/php:8.2-fpm-nginx

# 2. On passe en mode administrateur pour installer Node.js 20
USER root
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 3. On copie les fichiers de l'application dans le conteneur et on change le propriétaire pour www-data
COPY --chown=www-data:www-data . /var/www/html

# 4. On revient sur l'utilisateur sécurisé
USER www-data

# 5. On installe les paquets PHP de production
RUN composer install --no-dev --optimize-autoloader

# 6. On installe Node et on compile Vite/React
RUN npm install
RUN npm run build


#CMD php artisan optimize:clear && \
#    php artisan migrate --force && \
#    apache2-foreground

ENV WEB_DOCUMENT_ROOT=/app/public
EXPOSE 8080

