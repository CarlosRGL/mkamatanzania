<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber\Timber::context();
$post = Timber\Timber::get_post();



Timber\Timber::render( array('base/base-' . $post->post_type . '.twig','base/base-int.twig' ), $context );
