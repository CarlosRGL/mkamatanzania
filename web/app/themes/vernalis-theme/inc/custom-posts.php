<?php
add_action( 'init', 'create_post_type' );
function create_post_type() {

	register_post_type(
		'actualites',
		array(
			'labels'      => array(
				'name'          => __( 'Actualités' ),
				'singular_name' => __( 'Actualités' ),
			),
			'public'      => true,
			'has_archive' => false,
			'show_in_rest' => true, // Important !
			'rewrite'     => array( 'slug' => 'actualites' ),
			'supports'    => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
			'menu_icon'   => 'dashicons-megaphone',
		)
	);
}

function vernalis_register_taxonomies() {
	$taxonomies = array(
		array(
			'slug'         => 'categorie-actualites',
			'single_name'  => 'Categories des Actualités',
			'plural_name'  => 'Categories des Actualités',
			'post_type'    => array( 'actualites' ),
			'hierarchical' => true,
		),

	);
	foreach ( $taxonomies as $taxonomy ) {
		$labels = array(
			'name'              => $taxonomy['plural_name'],
			'singular_name'     => $taxonomy['single_name'],
			'search_items'      => 'Chercher ' . $taxonomy['plural_name'],
			'all_items'         => 'Tous ' . $taxonomy['plural_name'],
			'parent_item'       => 'Parent ' . $taxonomy['single_name'],
			'parent_item_colon' => 'Parent ' . $taxonomy['single_name'] . ':',
			'edit_item'         => 'Editer ' . $taxonomy['single_name'],
			'update_item'       => 'Mettre a jour ' . $taxonomy['single_name'],
			'add_new_item'      => 'Creer ' . $taxonomy['single_name'],
			'new_item_name'     => 'Nouveau ' . $taxonomy['single_name'] . ' Name',
			'menu_name'         => $taxonomy['plural_name'],
		);

		$rewrite      = isset( $taxonomy['rewrite'] ) ? $taxonomy['rewrite'] : array( 'slug' => $taxonomy['slug'] );
		$hierarchical = isset( $taxonomy['hierarchical'] ) ? $taxonomy['hierarchical'] : true;

		register_taxonomy(
			$taxonomy['slug'],
			$taxonomy['post_type'],
			array(
				'hierarchical' => $hierarchical,
				'labels'       => $labels,
				'show_ui'      => true,
				'show_in_rest' => true,
				'query_var'    => true,
				'rewrite'      => $rewrite,
			)
		);
	}
}
add_action( 'init', 'vernalis_register_taxonomies' );
