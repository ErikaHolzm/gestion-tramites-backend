// middlewares/auth.js

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