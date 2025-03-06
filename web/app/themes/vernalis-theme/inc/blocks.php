<?php

/**
 * Sets up default disabled bocks.
 *
 * @see https://wordpress.org/plugins/block-manager/
 * @author WebDevStudios
 * @since 1.0
 * @return array
 */
function wds_disabled_block()
{
    return ['core/cover', 'core/gallery', 'core/buttons', 'variation;core/embed;twitter', 'variation;core/embed;vimeo', 'core/pullquote', 'core/code', 'core/button', 'core/spacer', 'core/preformatted', 'core/separator', 'core/text-columns', 'core/nextpage', 'core/more', 'variation;core/embed;facebook', 'variation;core/embed;instagram', 'variation;core/embed;wordpress', 'variation;core/embed;soundcloud', 'variation;core/embed;spotify', 'variation;core/embed;flickr', 'variation;core/embed;animoto', 'variation;core/embed;cloudup', 'variation;core/embed;collegehumor', 'variation;core/embed;crowdsignal', 'variation;core/embed;dailymotion', 'variation;core/embed;imgur', 'variation;core/embed;issuu', 'variation;core/embed;kickstarter', 'variation;core/embed;meetup-com', 'variation;core/embed;mixcloud', 'variation;core/embed;reddit', 'variation;core/embed;reverbnation', 'variation;core/embed;screencast', 'variation;core/embed;scribd', 'variation;core/embed;slideshare', 'variation;core/embed;smugmug', 'variation;core/embed;speaker-deck', 'variation;core/embed;tiktok', 'variation;core/embed;ted', 'variation;core/embed;tumblr', 'variation;core/embed;videopress', 'variation;core/embed;wordpress-tv', 'variation;core/embed;amazon-kindle', 'core/audio', 'core/file', 'core/video', 'core/freeform', 'core/subhead', 'core/verse', 'core/archives', 'core/calendar', 'core/categories', 'core/html', 'core/latest-comments', 'core/latest-posts', 'core/rss', 'core/search', 'core/social-link', 'core/social-links', 'core/tag-cloud'];
};

add_filter('gbm_disabled_blocks', 'wds_disabled_block');


// disable manual font size slider and input box
add_theme_support('disable-custom-font-sizes');

// disable custom colors
add_theme_support('disable-custom-colors');

// remove color palette
add_theme_support('editor-color-palette');

// adjust preset font sizes
add_theme_support('editor-font-sizes', array(
    array(
        'name' => __('small', 'themeLangDomain'),
        'shortName' => __('S', 'themeLangDomain'),
        'size' => 13,
        'slug' => 'small'
    ),
    array(
        'name' => __('Standard', 'themeLangDomain'),
        'shortName' => __('D', 'themeLangDomain'),
        'size' => 16,
        'slug' => 'standard'
    ),
    array(
        'name' => __('medium', 'themeLangDomain'),
        'shortName' => __('M', 'themeLangDomain'),
        'size' => 20,
        'slug' => 'medium'
    ),
    array(
        'name' => __('large', 'themeLangDomain'),
        'shortName' => __('L', 'themeLangDomain'),
        'size' => 24,
        'slug' => 'large'
    ),
    array(
        'name' => __('extra large', 'themeLangDomain'),
        'shortName' => __('XL', 'themeLangDomain'),
        'size' => 28,
        'slug' => 'extra-large'
    )
));

add_filter('block_categories', function ($categories) {
    $categories[] = [
        'slug' => 'vernalis',
        'title' => 'Vernalis',
        'icon' => null
    ];
    return $categories;
}, 10, 2);
