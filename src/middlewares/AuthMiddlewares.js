import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No autorizado",
    });
  }

  // Simulación de usuario autenticado
  req.user = {
    id: "user-demo",
  };

  next();
}

// Middlware para comprobar tamaño de password y formato de email antes de register
export function validateAuthData(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email y password son obligatorios",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Formato de email inválido",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "La contraseña debe tener al menos 6 caracteres",
    });
  }

  next();
}

// Middlware para comprobar tamaño de password y formato de email antes de register
export function validateLoginData(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email y password son obligatorios",
    });
  }

  next();
}

// Middleware para verificar el token JWT
export function verifyToken(req, res, next) {
  // Comrobar el token en los headers en la etiqueta Authorization
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Acceso denegado. No hay token proporcionado.');

  console.log("Token recibido:", token); 
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // Continuar con la solicitud
  } catch (err) {
    res.status(400).send('Token inválido');
  }
}
