<?php


class Vernalis_Tools
{
    public static function get_posts_objects($post_type = 'post', $max_posts = 6, $all = false)
    {
        $args = [
            'post_type' => $post_type,
            'posts_per_page' => $max_posts,
            'order' => 'DESC',
            'post_status' => 'publish'
        ];

        if ($post_type == 'agenda') {
            $args['orderby'] = 'meta_value';
            $args['meta_key'] = 'next_event_date';
            $args['order'] = 'ASC';

            if (!$all) {
                $args['meta_query'] = [
                    'key' => 'event_dates_$_end_date',
                    'value' => gmdate('Ymd'),
                    'compare' => '>=',
                    'type' => 'DATE',
                ];
            }
        }

        $posts = Timber\Timber::get_posts(new WP_Query($args));

        if (empty($posts)) return false;

        return $posts;
    }

    public static function get_childs_pages($postID): array | bool
    {
        $args = [
            'post_parent' => $postID,
            'post_type' => 'page',
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ];

        $posts = get_children($args);

        if (empty($posts)) return false;

        return $posts;
    }

    public static function get_thumbnail_post_url($post, $size = 'thumbnail'): array
    {
        $thumbnail = get_the_post_thumbnail_url($post, $size);
        
        $post_type = 'type';

        if (isset($post->post_type)) {
            $post_type = $post->post_type;
        }

        switch ($post_type) {
            case 'actualites':
                $default_position = get_field('position_actus_defaut', 'option');
                break;
            case 'agenda':
                $default_position = get_field('position_events_defaut', 'option');
                break;

            default:
                $vertical = get_field('default_image', 'option');
                $position = get_field('position_band', $post);
                break;
        }

        if (!$thumbnail) {
            switch ($post_type) {
                case 'actualites':
                    $thumbnail = get_field('default_actualites', 'option');
                    break;

                case 'agenda':
                    $thumbnail = get_field('default_agenda', 'option');
                    break;

                case 'elus':
                    $thumbnail = get_field('default_elus', 'option');
                    break;
                case 'associations':
                    $thumbnail = get_field('default_associations', 'option');
                    break;

                default:
                    $thumbnail = get_field('default_image', 'option');
                    $default_position = get_field('position_page_defaut', 'option');
                    break;
            }
        }

        // if (!isset($position) || !$position) $position = $default_position;

        $vertical = $position['vertical'] ?? 50;
        $horizontal = $position['horizontal'] ?? 50;

        if (!isset($vertical) || $vertical === false) $vertical = 50;
        if (!isset($horizontal) || $horizontal === false) $horizontal = 50;

        return [
            'url' => (is_array($thumbnail) ? $thumbnail['url'] : $thumbnail),
            'vertical' => $vertical,
            'horizontal' => $horizontal
        ];
    }

    public static function get_info_doc($id): array
    {
        $url = wp_get_attachment_url($id);
        $filesize = filesize(get_attached_file($id));
        $filesize = size_format($filesize, 2);
        $path_info = pathinfo(get_attached_file($id));
        $name = get_the_title($id);

        $info_doc = array('url' => $url, 'size' => $filesize, 'extension' => $path_info['extension'], 'name' => $name);

        return $info_doc;
    }

    public static function save_search_words(string $search_query, int $max_save = 100): void
    {
        $file_path = VS_DIR . '/searched_words.json';
        $search_query = sanitize_text_field($search_query);

        $search_data = file_exists($file_path) ? json_decode(file_get_contents($file_path), true) : [];

        if (!$search_data) $search_data = [];

        if (strlen($search_query) > 0 && strlen(trim($search_query)) != 0) {

            if (self::check_words_in_research($search_query)) {

                if (array_key_exists($search_query, $search_data)) {
                    $search_data[$search_query]++;
                } else {
                    $search_data[$search_query] = 1;
                }
                $search_data = array_slice($search_data, 0, $max_save, true);

                file_put_contents($file_path, json_encode($search_data, JSON_PRETTY_PRINT));
            }
        }
    }

    public static function get_last_researches(int $max_words = 5): array
    {
        $file_path = VS_DIR . '/searched_words.json';
        $search_data = file_exists($file_path) ? json_decode(file_get_contents($file_path), true) : [];

        uasort($search_data, function($a, $b) {
            return $b <=> $a;
        });

        $top_searches = array_slice($search_data, 0, $max_words, true);

        return $top_searches;
    }

    private static function check_words_in_research($search): bool
    {
        $keywords_file = VS_DIR . '/insultes.txt';
        $keywords = file($keywords_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $keywords = array_map('strtolower', $keywords);

        $search = strtolower($search);

        $matching_keywords = array_intersect($keywords, explode(' ', $search));

        if (count($matching_keywords) > 0) return false;

        return true;
    }

    /**
     * Can be replaced by rrules ACF
     */
    public static function get_next_date_event_recurrence(string $date_type_event, $start_date, $end_date, $days)
    {
        $today = date('Ymd');
        $start_timestamp = $start_date >= $today ? strtotime($start_date) : strtotime($today);
        $end_timestamp = strtotime($end_date);

        $days_of_week = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

        if (empty($days)) {
            return false;
        }

        $provided_days_indices = array_map(function($day) use ($days_of_week) {
            return array_search($day, $days_of_week) + 1;
        }, $days);

        if ($date_type_event == 'only-day') {
            $available_days_indices = array_values(array_intersect([1, 2, 3, 4, 5, 6, 7], $provided_days_indices));
        } else {
            $available_days_indices = array_values(array_diff([1, 2, 3, 4, 5, 6, 7], $provided_days_indices));
        }

        $availables_next_days = [];
        $current_timestamp = $start_timestamp;

        while ($current_timestamp <= $end_timestamp) {
            $day_index = date('N', $current_timestamp);
            if (in_array($day_index, $available_days_indices)) {
                $availables_next_days[] = $day_index;
            }
            $current_timestamp = strtotime('+1 day', $current_timestamp);
        }


        if (empty($availables_next_days)) {
            return false;
        }

        $next_day_index = $availables_next_days[0];
        $days_to_add = ($next_day_index - date('N', $start_timestamp) + 7) % 7;
        $next_day_timestamp = $start_timestamp + ($days_to_add * 24 * 60 * 60);

        return date('Ymd', $next_day_timestamp);
    }
}
