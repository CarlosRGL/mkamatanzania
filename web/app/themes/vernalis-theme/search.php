<?php
/**
 * Search results page
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context            = Timber::context();
$context['texte_bandeau']   = 'Votre recherche : ' . get_search_query();
if(isset($_POST['services'])) {
    $context['only_services'] = true;
} else {
    $context['only_services'] = false;
}

$s = $_POST['s'];
$posts_types = [
    'Agenda' => 'agenda',
    'Page' => 'page',
    'Actualités' => 'actualites',
    'Associations' => 'associations',
    'Professionnels' => 'professionnels',
    'Publications' => 'publications',
    'Les élus' => 'elus',
    'Marchés publics' => 'marches-publics'
];

$args = array(
    's' => $s,
    'order' => 'DESC',
    'post_type' => array('agenda', 'actualites', 'page'),
    'posts_per_page' => -1
);


$context['search_posts']['Tout']['Tout'] =  Timber::get_posts($args);
foreach ($posts_types as $key => $pt) {
    $args = array(
        's' => $s,
        'post_type' => $pt,
        'order' => 'DESC',
        'posts_per_page' => -1
    );
    $posts = Timber::get_posts($args);
    if ($posts) {
        $context['search_posts'][$key][$pt] =  $posts;
    }
}

Timber::render( array('search.twig'), $context );
