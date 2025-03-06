<?php
if ( ! function_exists( 'breadcrumbs' )) {
	function breadcrumbs( $args = array() ) {
		if (is_admin()) {
			return;
		}

		if ( is_front_page() ) {
			return;
		}
		if ( get_theme_mod( 'ct_ignite_show_breadcrumbs_setting' ) == 'no' ) {
			return;
		}
		global $post;
		$defaults  = array(
			'separator_icon'      => '&gt;',
			'breadcrumbs_id'      => 'breadcrumbs',
			'breadcrumbs_classes' => 'breadcrumb-trail breadcrumbs',
			'home_title'          => 'Home',
		);
		$args      = apply_filters( 'breadcrumbs_args', wp_parse_args( $args, $defaults ) );
		$separator = '<span class="breadcrumb-separator">
                                <svg>
                                    <use xlink:href="' . get_stylesheet_directory_uri() . '/assets/build/icons.svg#chevron-right"></use>
                                </svg>
            </span>';
		
		$content = [
			'separator' => $separator,
		];

		if (is_singular( 'page' )) {
			$parents = get_post_ancestors( $post->ID );
			$parents = array_reverse( $parents );
		} else if (is_singular($post->post_type)) {
			$parent_single = get_field('archive_post_' . $post->post_type, 'option');

			if ($parent_single) {
				$parents = get_post_ancestors( $parent_single->ID );
				$parents = array_reverse( $parents );
			}

		}

		if (isset($parents)) {
			foreach ($parents as $parent) {
				$content['parents'][] = Timber::get_post($parent);
			}
		}

		if (isset($parent_single)) {
			$content['parents'][] = $parent_single;
		}

		return $content;

		
	}
}
