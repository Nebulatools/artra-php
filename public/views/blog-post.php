<div class="container">
    <article class="blog-post-single">
        <h1><?php echo ucwords(str_replace('-', ' ', $slug ?? 'post')); ?></h1>
        <p class="post-meta">Publicado el <?php echo date('d/m/Y'); ?></p>
        
        <div class="post-content">
            <p>Este es el contenido del artículo del blog. El slug de la URL es: <strong><?php echo htmlspecialchars($slug ?? 'ninguno'); ?></strong></p>
            
            <p>En una implementación real, aquí cargarías el contenido del artículo desde una base de datos o archivo basándote en el slug.</p>
            
            <h2>Ejemplo de contenido</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        
        <div class="post-navigation">
            <a href="/blog">← Volver al blog</a>
        </div>
    </article>
</div>