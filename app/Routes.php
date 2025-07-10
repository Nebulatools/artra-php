<?php
function configureRoutes($router) {
    $router->add('/', ['controller' => 'Controller', 'action' => 'home']);
    $router->add('/about', ['controller' => 'Controller', 'action' => 'about']);
    $router->add('/contact', ['controller' => 'Controller', 'action' => 'contact']);
    $router->add('/services', ['controller' => 'Controller', 'action' => 'services']);
    $router->add('/blog', ['controller' => 'Controller', 'action' => 'blog']);
    $router->add('/blog/{slug}', ['controller' => 'Controller', 'action' => 'blog']);
}
?>