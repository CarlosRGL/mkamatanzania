<?php

add_action( 'acf/init', 'my_acf_init' );

function my_acf_init() {
	if ( function_exists( 'acf_add_options_page' ) ) {

		$parent = acf_add_options_page(
			array(
				'page_title' => 'Pagina de inicio',
				'menu_title' => 'Pagina de inicio',
				'menu_slug'  => 'pagina-inicio',
				'capability' => 'edit_posts',
				'icon_url'   => 'dashicons-admin-generic',
				'redirect'   => true,
				'position'   => 3,
				2,
			)
		);

	}
}
