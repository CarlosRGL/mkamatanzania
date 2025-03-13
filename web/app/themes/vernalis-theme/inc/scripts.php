<?php

/**
 * Enqueue scripts and styles
 */
function page_type() {
	global $wp_query;
	if ( $wp_query->is_page || $wp_query->is_single ) {
		$page_type = 'main';
	} elseif ( $wp_query->is_home ) {
		$page_type = 'home';
	} elseif ( $wp_query->is_archive ) {
		$page_type = 'archive';
	} elseif ( $wp_query->is_search ) {
		$page_type = 'search';
	} else {
		$page_type = 'main';
	}
	return $page_type;
}

add_action( 'wp_enqueue_scripts', 'wpm_jquery' );

function wpm_jquery() {
}

add_action(
	'wp_enqueue_scripts',
	function () {
		$page_type = page_type();
		wp_enqueue_script(
			'fontawesome',
			'https://kit.fontawesome.com/ef7f72cf64.js',
			array(),
			'ef7f72cf64',
			true
		);
		wp_enqueue_script(
			'mkamatanzania_js_manifest',
			VS_THEME_URL . '/assets/build/js/manifest.js',
			array( 'jquery' ),
			filesize( VS_DIR . '/assets/build/js/manifest.js', ),
			true
		);
		wp_enqueue_script(
			'mkamatanzania_js_vendor',
			VS_THEME_URL . '/assets/build/js/vendor.js',
			array( 'jquery', 'mkamatanzania_js_manifest' ),
			filesize( VS_DIR . '/assets/build/js/vendor.js', ),
			true
		);
		wp_enqueue_script(
			'mkamatanzania_js',
			VS_THEME_URL . '/assets/build/js/' . $page_type . '.js',
			array( 'jquery', 'mkamatanzania_js_manifest', 'mkamatanzania_js_vendor' ),
			filesize( VS_DIR . '/assets/build/js/' . $page_type . '.js', ),
			true
		);

		wp_enqueue_style(
			'mkamatanzania_css',
			VS_THEME_URL . '/assets/build/css/' . $page_type . '.css',
			array(),
			filesize( VS_DIR . '/assets/build/css/' . $page_type . '.css', ),
			''
		);
	}
);

function my_custom_login() {
	echo '<link rel="stylesheet" type="text/css" href="' . get_template_directory_uri() . '/login.css" />';
}
add_action( 'login_head', 'my_custom_login' );

function my_admin_style() {
	wp_enqueue_style( 'admin-style', get_stylesheet_directory_uri() . '/css/admin-style.css' );
	wp_enqueue_script( 'populate-area', get_stylesheet_directory_uri( __FILE__ ) . '/js/admin-js.js' );
	wp_enqueue_style( 'jquery-ui', '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.min.css' );
	wp_enqueue_script( 'jquery-ui-datepicker' );
}
add_action( 'admin_enqueue_scripts', 'my_admin_style' );

function dequeue_jquery_migrate( $scripts ) {
	if ( ! is_admin() && ! empty( $scripts->registered['jquery'] ) ) {
		$scripts->registered['jquery']->deps = array_diff(
			$scripts->registered['jquery']->deps,
			array( 'jquery-migrate' )
		);
	}
}
add_action( 'wp_default_scripts', 'dequeue_jquery_migrate' );

function custom_dequeue() {
	if ( is_home() && ! is_admin() ) {
		wp_dequeue_script( 'wp-embed' );
		wp_dequeue_script( 'comment-reply' );
		wp_dequeue_script( 'underscore' );
		wp_dequeue_script( 'comarquage' );
		wp_dequeue_script( 'wpgmza_data' );
	}
}

add_action( 'wp_enqueue_scripts', 'custom_dequeue', 9999 );
add_action( 'wp_head', 'custom_dequeue', 9999 );
