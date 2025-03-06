<?php

function myformatTinyMCE($in)
{
    $in['block_formats'] = 'Paragraph=p;Titre 2=h2;Titre 3=h3;Titre 4=h4;Titre 5=h5;Titre 6=h6;';
    return $in;
}
add_filter('tiny_mce_before_init', 'myformatTinyMCE');

function content_classes($content)
{

    $classes = 'appear';

    for ($i = 2; $i < 7; $i++) {
        $content = str_ireplace('<h' . $i . ' class="', '<h' . $i . ' class="content__h' . $i . '  appear ', $content);
        $content = str_ireplace('<h' . $i . '>', '<h' . $i . ' class="content__h' . $i . ' appear ">', $content);
    }

    $content = str_ireplace('<ul>', '<ul class="content__ul ' . $classes . '">', $content);
    $content = str_ireplace('<ol>', '<ol class="content__ol ' . $classes . '">', $content);
    $content = str_ireplace('<p class="', '<p class="content__p ' . $classes . ' ', $content);
    $content = str_ireplace('<p>', '<p class="content__p ' . $classes . ' ">', $content);
    $content = str_ireplace('<table>', '<table class="content__table ' . $classes . '">', $content);
    $content = str_ireplace('<table class="', '<table class="content__table ' . $classes, $content);
    return $content;
}
add_filter('the_content', 'content_classes');

/** 
 * Permet de rajouter des champs ACF dans les menus de navigation
 */
// add_filter('acf/location/rule_types', 'acf_location_rules_types');

// function acf_location_rules_types($choices)
// {
//     $choices['Menu']['menu_level'] = 'Niveau de menu';

//     return $choices;
// }

// add_filter('acf/location/rule_values/menu_level', 'acf_location_rule_values_level');

// function acf_location_rule_values_level($choices)
// {
//     $choices[0] = '0';
//     $choices[1] = '1';

//     return $choices;
// }

// add_filter('acf/location/rule_match/menu_level', 'acf_location_rule_match_level', 10, 4);
// function acf_location_rule_match_level($match, $rule, $options, $field_group)
// {
//     if ($rule['operator'] == "==") {
//         $match = ($options['nav_menu_item_depth'] == $rule['value']);
//     }

//     return $match;
// }

// Nécessaire pour les événements avec de multiples dates
function my_posts_where($where) {
    $where = str_replace("meta_key = 'event_dates_$", "meta_key LIKE 'event_dates_%", $where);
    return $where;
}

add_filter('posts_where', 'my_posts_where');