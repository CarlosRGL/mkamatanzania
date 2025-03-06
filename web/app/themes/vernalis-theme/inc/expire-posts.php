<?php

// if (!wp_next_scheduled('expire_posts')){
//   wp_schedule_event(time(), 'daily', 'expire_posts');
// }
// add_action('expire_posts', 'expire_posts_function');

// function expire_posts_function() {
//   global $wpdb;
//   $wpdb->query("UPDATE wp_posts AS p
//   INNER JOIN wp_postmeta AS pm ON p.ID = pm.post_id
//   SET p.post_status = 'draft'
//   WHERE (pm.meta_key = 'date_de_fin' AND pm.meta_value < DATE_FORMAT(NOW(), '%Y%m%d') AND pm.meta_value != '' AND p.post_type = 'actualites') OR (pm.meta_key = 'fin_flash' AND pm.meta_value < DATE_FORMAT(NOW(), '%Y%m%d') AND pm.meta_value != '' AND p.post_type = 'flash_infos')");
// }
