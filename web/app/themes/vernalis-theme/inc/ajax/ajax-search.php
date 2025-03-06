<?php 

add_action('wp_ajax_search_posts', 'search_posts');
add_action('wp_ajax_nopriv_search_posts', 'search_posts');

function search_posts() {
    $text = sanitize_text_field($_POST["text"]);

    if ($text && $text != "") {
        Vernalis_Tools::save_search_words($text);
    }

    $postType =  array('agenda', 'actualites', 'associations', 'professionnels', 'page', 'elus', 'marches-publics');

    $args = [
        'post_type'         => $postType,
        'post_status'       => 'publish',
        'order'             => "ASC",
        'orderby'           => 'title',
        's'                 => $text,
        'numberofposts'     => -1
    ];

    $posts  = Timber\Timber::get_posts(new WP_Query($args));

    $context['posts_searched'] = $posts;

    Timber\Timber::render('ajax/ajax-search.twig', $context);
    die;
}