<?php
Timber\Timber::init();
add_filter(
	'timber/context',
	function ( $context ) {
		$context['img_folder']      = get_stylesheet_directory_uri() . '/assets/build/images/';
		$context['svg_folder']      = get_stylesheet_directory_uri() . '/assets/src/svg-no-sprite/';
		$context['svg_sprite']      = get_stylesheet_directory_uri() . '/assets/build/icons.svg';
		$context['is_home']         = is_front_page();
		$context['main_menu']       = Timber\Timber::get_menu( 'menu_principal' );
		$context['footer_menu']     = Timber\Timber::get_menu( 'pied_page' );
		$context['homepage']       = get_field( 'homepage', 'option' );
		return $context;
	}
);
Timber\Timber::$dirname = array( 'views' );
