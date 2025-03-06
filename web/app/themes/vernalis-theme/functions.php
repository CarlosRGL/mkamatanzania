<?php
define( 'VS_HOST', get_site_url() );
define( 'VS_DIR', __DIR__ );
define( 'VS_THEME_URL', get_template_directory_uri() );

$composer_autoload = VS_DIR . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;


	// charger tous les scripts et configs du dossier /inc
	\A7\autoload( __DIR__ . '/inc' );
} else {
	echo 'Le fichier autoload.php n\'est pas present dans le theme';
}
