<?php

remove_action( 'wp_head', 'rsd_link' ); // remove really simple discovery link.
remove_action( 'wp_head', 'wp_generator' ); // remove WordPress version.
remove_action( 'wp_head', 'feed_links', 2 ); // remove rss feed links (make sure you add them in yourself if youre using feedblitz or an rss service).
remove_action( 'wp_head', 'feed_links_extra', 3 ); // removes all extra rss feed links.
remove_action( 'wp_head', 'index_rel_link' ); // remove link to index page.
remove_action( 'wp_head', 'wlwmanifest_link' ); // remove wlwmanifest.xml (needed to support windows live writer).
remove_action( 'wp_head', 'start_post_rel_link', 10, 0 ); // remove random post link.
remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 ); // remove parent post link.
remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 ); // remove the next and previous post links.
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
// //remove emoji support
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );




/**
 * Theme setup
 */
add_action(
	'after_setup_theme',
	function () {

		/**
		 * Enable plugins to manage the document title
		 *
		 * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
		 */
		add_theme_support( 'title-tag' );
		/**
		 * Register navigation menus
		 *
		 * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
		 */
		register_nav_menus(
			array(
				'menu_principal' => __( 'Menu principal', 'vernalis_theme' ),
				'menu_un_clic'   => __( 'Menu en 1 clic', 'vernalis_theme' ),
				'je_suis'        => __( 'Je suis', 'vernalis_theme' ),
				'pied_page'      => __( 'Pied de page', 'vernalis_theme' ),
			)
		);
		/**
		 * Enable post thumbnails
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );
		/**
		 * Enable HTML5 markup support
		 *
		 * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
		 */
		add_theme_support( 'html5', array( 'caption', 'comment-form', 'comment-list', 'gallery', 'search-form' ) );

	},
	20
);

add_filter(
	'posts_pre_query',
	function( $posts, \WP_Query $q ) {
		if ( $q->is_home() && $q->is_main_query() ) {
			$posts          = array();
			$q->found_posts = 0;
		}
		return $posts;
	},
	10,
	2
);


/**
 * Add body classes
 *
 * @param array $classes array of classes.
 * @return array array of classes.
 */
function add_body_class( $classes ) {
	global $post;
	global $is_IE;
	global $is_safari;

	if ( is_home() ) {
		$key = array_search( 'blog', $classes );
		if ( $key > -1 ) {
			unset( $classes[ $key ] );
		}
	} elseif ( is_page() ) {
		$classes[] = sanitize_html_class( $post->post_name );
		$parents   = get_post_ancestors( $post->name );
		$children  = get_pages( array( 'child_of' => $post->ID ) );
		if ( is_array( $parents ) && 0 < count( $parents ) ) {
			$classes[] = 'master-parent-' . array_pop( $parents );
		}
	} elseif ( is_singular() ) {
		$classes[] = sanitize_html_class( $post->post_name );
	} elseif ( $is_IE ) {
		$classes[] = 'IE';
	} elseif ( $is_safari ) {
		$classes[] = 'safari';
	}
	return $classes;
}
add_filter( 'body_class', 'add_body_class' );
