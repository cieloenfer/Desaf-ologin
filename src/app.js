const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

// Configuración de sesión
app.use(session({
    secret: 'secret-key', // Cambiar esto por una cadena aleatoria más segura
    resave: false,
    saveUninitialized: true
}));

// Middleware para parsear los cuerpos de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Rutas
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/products');
    } else {
        res.render('login.ejs');
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Aquí deberías validar el email y la contraseña, y verificar el rol si es necesario
    // Por simplicidad, aquí solo se comprueba si el email y la contraseña coinciden
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = {
            email: email,
            role: 'admin'
        };
    } else {
        req.session.user = {
            email: email,
            role: 'usuario'
        };
    }
    res.redirect('/products');
});

app.get('/products', (req, res) => {
    if (req.session.user) {
        res.render('products.ejs', { user: req.session.user });
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
