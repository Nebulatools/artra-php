<div class="container">
    <h1>Contacto</h1>
    <p>Ponte en contacto con nosotros. Estamos aquí para ayudarte.</p>
    
    <div class="contact-form">
        <form method="POST" action="/contact/send">
            <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="subject">Asunto:</label>
                <input type="text" id="subject" name="subject" required>
            </div>
            
            <div class="form-group">
                <label for="message">Mensaje:</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
            <button type="submit" class="btn">Enviar Mensaje</button>
        </form>
    </div>
    
    <div class="contact-info">
        <h2>Información de Contacto</h2>
        <p><strong>Email:</strong> info@ejemplo.com</p>
        <p><strong>Teléfono:</strong> +52 123 456 7890</p>
        <p><strong>Dirección:</strong> Ciudad de México, México</p>
    </div>
    
    <div class="back-link">
        <a href="/">← Volver al inicio</a>
    </div>
</div>