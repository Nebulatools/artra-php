<?php
class Controller {
	public function index() {
		return redirect()->to('home');
	}
	protected function render($page, $title = '') {
		$data['title'] = $title;
		echo view('layouts/head', $data);
		echo view('layouts/header');
		echo view($page);
		echo view('layouts/footer');
	}
	public function home() {
		$this->render('home', 'Home');
	}
	public function artworks() {
		$this->render('artworks', 'Artworks');
	}
	public function gallery() {
		$this->render('gallery', 'Gallery');
	}
	public function artists() {
		$this->render('artists', 'Artists');
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
	public function services() {
		$this->render('services', 'Servicios');
	}
}
?>