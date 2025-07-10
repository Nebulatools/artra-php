<?php
define('SITE_NAME', 'Mi Sitio Web');
define('BASE_URL', 'http://localhost/php-template');
define('DEFAULT_LAYOUT', 'pages/layouts/main');
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/Mexico_City');
session_start();

/**
 * Función helper para renderizar vistas
 * Utilizada por el sistema de layers del Controller
 */
function view($view, $data = []) {
    extract($data);
    
    $viewFile = PAGES . '/' . $view . '.php';
    
    if (file_exists($viewFile)) {
        ob_start();
        include $viewFile;
        return ob_get_clean();
    } else {
        throw new Exception("View file not found: " . $viewFile);
    }
}
?>