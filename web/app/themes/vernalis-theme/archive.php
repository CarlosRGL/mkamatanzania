<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.2
 */

$context = Timber::context();
$today = date('Ymd');

$args_agenda = array(
    'post_type'  => 'agenda',
    'order'      => 'ASC',
    'meta_key'   => 'date_de_debut',
    'orderby'    => 'meta_value',
    'meta_query' => array(
        array(
            'key'     => 'date_de_fin',
            'value'   => $today,
            'compare' => '>=',
            'type'    => 'DATE'
        ),
    ),
);

$args_actualites = array(
    'post_type' => 'actualites',
    'order'     => 'DESC',
);
$context['archive_type'] = get_queried_object()->name;

if (is_post_type_archive('agenda')) {
    $context['posts']              = Timber::get_posts($args_agenda);
    $context['title']              = 'Agenda';
    $context['cats'] = Timber::get_terms('categorie-agenda', array('hide_empty' => true));

} elseif (is_post_type_archive('actualites')) {
    $context['posts']          = Timber::get_posts($args_actualites);
    $context['title']              = 'Actualites';
    $context['cats'] = Timber::get_terms('categorie-actualites', array('hide_empty' => true));
}
$templates = array( 'archive.twig', 'index.twig' );
Timber::render( $templates, $context );
