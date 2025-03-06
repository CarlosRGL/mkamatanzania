<?php

add_action('wp_ajax_filter_posts', 'filter_posts');
add_action('wp_ajax_nopriv_filter_posts', 'filter_posts');

function filter_posts() {

    $postType  = $_POST['post_type'];
    $tdObject  = new DateTime();
    $today     = date('Ymd');
    $paged     = $_POST['pagination_id'];
    $catId     = $_POST['catId'];
    $text      = $_POST['textSearched'];

    $posts_per_pages = $_POST['perPages'];
    if (!$posts_per_pages) $posts_per_pages = 10;

    $args = array(
        'post_type'         => $postType,
        'post_status'       => 'publish',
        'order'             => ($text != "" ? "ASC" : "DESC"),
        'orderby'           => 'title',
        'page'              => $paged,
        'paged'             => $paged,
        'posts_per_page'    => $posts_per_pages
    );

    if ($text && $text != "") {
        $args['s'] = $text;
    }

    if (isset($catId) && !empty($catId) && $catId != -1) {
        $args['tax_query'][] = [
            'relation' => 'AND',
            [
                'taxonomy' => 'categorie-' . $postType,
                'field' => 'term_id',
                'terms' => $catId
            ],
        ];
    }

    if ($postType == "agenda") {
        $args['meta_key'] = 'next_event_date';
        $args['order_by'] = 'meta_value';
        $args['order'] = 'ASC';
        $args['meta_query'][] = [
            'key' => 'event_dates_$_end_date',
            'value' => $today,
            'compare' => '>=',
            'type' => 'DATE',
        ];
    }

    $posts                      = Timber::get_posts(new WP_Query($args));

    $context['posts']           = $posts;
    $context['cats']            = Timber::get_terms('categorie-'.$postType, array('hide_empty' => true));
    $context['current_page']    = $paged;
    $context['type']            = $postType;
    $context['default_image'] = [
        'page' => get_field('default_image', 'option'),
        'actualites' => get_field('default_actualites', 'option'),
    ];

    Timber::render('ajax/ajax-list.twig', $context);
    die;
}