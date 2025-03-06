<?php


/**
 * Template Name: Home
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber\Timber::context();

// delete cookie salle

$args = array(
	'post_type' => 'actualites',
	'posts_per_page' => -1,
	'order' => 'DESC',
	'orderby' => 'publish_date',
	'post_status' => array( 'publish' ),
);

$context['actualites'] = Timber\Timber::get_posts( $args );

Timber\Timber::render( 'home.twig', $context );
