<?php

require dirname( __FILE__ ) . '/vendor/autoload.php';
require dirname( __FILE__ ) . '/src/Init.php';

add_action('graphql_register_types', function () {
    // Register the 'elementorData' field for both 'Post' and 'Page' types
    $types_to_add_field_to = ['Post', 'Page'];

    foreach ($types_to_add_field_to as $type) {
        register_graphql_field($type, 'elementorData', [
            'type' => 'String',
            'description' => __('Elementor Data JSON', 'wp-graphql'),
            'resolve' => function ($post_or_page) use ($type) {
                $data = get_post_meta($post_or_page->ID, '_elementor_data', true);
                return !empty($data) ? $data : null;
            }
        ]);
    }

});
