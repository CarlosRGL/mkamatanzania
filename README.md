# Teamtreize Starter WP

## Version 1.0.0

- Usage de bedrock
- Views avec Twig en utilisant [Timber v2](https://timber.github.io/docs/) dans le dossier `views/`
- Utilisation de [Tailwind](https://tailwindcss.com/docs) et SASS par default
- Gestion des assets avec Laravel Mix
- lazyload images et background-images avec le module [Lazyload](https://github.com/verlok/vanilla-lazyload)

## Installation


## Lancer le développement

1. `composer install` a la racine du theme pour installer [Timber](https://timber.github.io/docs/) et [Timber ACF Blocks](https://github.com/palmiak/timber-acf-wp-blocks)
2. creer un fichier `.htaccess` dans le dossier `web` et coller la config suivante :
   ```bash
    # BEGIN WordPress
    # Les directives (lignes) entre « BEGIN WordPress » et « END WordPress » sont générées
    # dynamiquement, et doivent être modifiées uniquement via les filtres WordPress.
    # Toute modification des directives situées entre ces marqueurs sera surchargée.
    <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
    RewriteBase /
    RewriteRule ^index\.php$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.php [L]
    </IfModule>
    # END WordPress
   ```
3. `cp .env.example .env` et renseigner les variables d'environnement
4. `make dev` a la racine
# mkamatanzania
