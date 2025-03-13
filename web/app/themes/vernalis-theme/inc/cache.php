<?php

add_filter( 'wp_kses_allowed_html', 'allow_iframes_for_editor', 1 );

/**
 * Add cache clear button to admin toolbar
 *
 * @param WP_Admin_Bar $wp_admin_bar WP_Admin_Bar instance.
 */
function add_cache_clear_button( $wp_admin_bar ) {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$args = array(
		'id'    => 'clear-cache',
		'title' => '<span class="ab-icon dashicons dashicons-trash"></span>' . __( 'Vider le cache', 'teamtreize' ),
		'href'  => wp_nonce_url( admin_url( 'admin-post.php?action=clear_cache' ), 'clear_cache_nonce' ),
		'meta'  => array(
			'class' => 'clear-cache-button',
			'title' => __( 'Vider toutes les pages en cache', 'teamtreize' ),
		),
	);

	$wp_admin_bar->add_node( $args );
}
add_action( 'admin_bar_menu', 'add_cache_clear_button', 100 );

/**
 * Handle cache clearing action
 */
function handle_cache_clear() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( __( 'Vous n\'avez pas les permissions nécessaires pour effectuer cette action.', 'teamtreize' ) );
	}

	if ( ! wp_verify_nonce( $_GET['_wpnonce'], 'clear_cache_nonce' ) ) {
		wp_die( __( 'Vérification de sécurité échouée.', 'teamtreize' ) );
	}

	// Get current site URL and remove '/wp' if it exists
	$site_url = get_site_url();
	$site_url = str_replace( '/wp', '', $site_url );
	// remove https://
	$site_url = str_replace( 'https://', '', $site_url );

	// Execute WP-CLI commands
	$output = array();
	$return_var = 0;

	// Execute surge flush command
	exec( 'wp surge flush 2>&1', $output, $return_var );

	// Execute varnish purge command
	exec( "awh_purge_varnish {$site_url} 2>&1", $output, $return_var );
	// log output
	// dump( $output );
	// die;
	// Redirect back to previous page
	wp_safe_redirect( wp_get_referer() . '?clear_cache=success' );
	exit;
}
add_action( 'admin_post_clear_cache', 'handle_cache_clear' );

/**
 * Add admin notice for cache clearing results
 */
function display_cache_clear_notice() {
	if ( isset( $_GET['clear_cache'] ) && $_GET['clear_cache'] === 'success' ) {
				add_settings_error(
					'clear_cache',
					'clear_cache_success',
					__( 'Cache vidé avec succès.', 'teamtreize' ),
					'success'
				);
		settings_errors( 'clear_cache' );
	}
}
add_action( 'admin_notices', 'display_cache_clear_notice' );

// Add styles for the cache clear button
function add_cache_clear_styles() {
	if ( is_admin_bar_showing() ) {
		?>
		<style>
			#wp-admin-bar-clear-cache .ab-icon:before {
				top: 2px;
			}
			#wp-admin-bar-clear-cache .ab-icon {
				margin-right: 5px;
			}
		</style>
		<?php
	}
}
add_action( 'wp_head', 'add_cache_clear_styles' );
add_action( 'admin_head', 'add_cache_clear_styles' );
