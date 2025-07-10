<?php
class Controller {
	public function index() { }
	/* Método base para renderizar páginas con el sistema de layers */
	protected function render($page, $title = '') {
		$data['title'] = $title;
		echo view('layouts/head', $data);
		echo view('layouts/header', $data);
		echo view($page, $data);
		echo view('layouts/footer');
	}
	public function about() {
		$this->render('about', 'Acerca de');
	}
	public function blog() {
		$this->render('blog', 'Blog');
	}
	
	public function catalogue() {
		$this->render('catalogue', 'Catálogo');
	}
	
	public function contact() {
		$this->render('contact', 'Contacto');
	}
	
	public function home() {
		$this->render('home', 'Inicio');
	}
	
	public function services() {
		$this->render('services', 'Servicios');
	}
}
?>