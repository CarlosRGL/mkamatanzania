<?php

add_action('wp_ajax_autocompletion', 'autocompletion');
add_action('wp_ajax_nopriv_autocompletion', 'autocompletion');

function autocompletion()
{
    $context = Timber\Timber::context();
    $search = $_POST['search_prop'];

    $postTypes = [
        'Agenda' => 'agenda',
        'Page' => 'page',
        'Actualités' => 'actualites',
        'Publications' => 'publications',
        'Partenaires' => 'partenaire',
        'Projets' => 'projects',
        'Les élus' => 'elus',
    ];

    $args = [
        'post_type' => 'page',
        'orderBy' => 'title',
        'order' => 'ASC',
        'posts_per_page' => 10,
        's' => $search,
    ];

    $posts = get_posts($args);

    $context['searched_posts'] = $posts;

    Timber::render(["ajax/ajax-autocompletion.twig"], $context);
    die;
}
