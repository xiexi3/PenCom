FROM php:8.1-apache

# Instalar extensiones necesarias para Laravel
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo pdo_mysql

# Habilitar el módulo de reescritura de Apache
RUN a2enmod rewrite

# Copiar configuración personalizada de Apache
COPY docker/laravel.conf /etc/apache2/sites-available/000-default.conf

# Copiar archivos del proyecto
COPY . /var/www/html

# Asegúrate de que tu Dockerfile tenga este paso después de copiar los archivos:
RUN ln -sfn /var/www/html/storage/app/public /var/www/html/public/storage

# Establecer permisos para Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Nuevooo Cambiar los permisos para que el grupo www-data pueda escribir
# RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Exponer el puerto 80
EXPOSE 80

# Iniciar Apache
CMD ["apache2-foreground"]