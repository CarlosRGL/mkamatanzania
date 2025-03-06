<?php

/**
 * Configuration overrides for WP_ENV === 'production'
 */

use Roots\WPConfig\Config;

Config::define( 'WP_CACHE', true );

Config::define( 'SAVEQUERIES', false );
Config::define( 'WP_DEBUG', true );
Config::define( 'WP_DEBUG_DISPLAY', false );
Config::define( 'WP_DEBUG_LOG', true );
Config::define( 'WP_DISABLE_FATAL_ERROR_HANDLER', false );
Config::define( 'SCRIPT_DEBUG', false );
Config::define( 'WP_POST_REVISIONS', 5 );


// Enable plugin and theme updates and installation from the admin
Config::define( 'DISALLOW_FILE_MODS', false );
