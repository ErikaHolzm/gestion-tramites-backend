// middlewares/validateStatus.js
const VALID_STATUSES = [
  "pendiente",
  "en_proceso",
  "completado",
  "vencido",
  "cancelado", 
];

export function validateStatus(req, res, next) {
    const { name, description } = req.body;

    // Permite requests sin status (por ejemplo updates parciales)
    if (!name && !description) {
        return res.status(400).json({
            message: "No se ha proporcionado ningún campo para actualizar",
        });
    }

    // Si se proporciona el campo name, validar su valor
    if (name) {
        if (!VALID_STATUSES.includes(name)) {
            return res.status(400).json({
                message: "Status inválido",
                validStatuses: VALID_STATUSES,
            });
        }
    }

    // Si se proporciona el campo description, validar su valor
    if (description) {
        if (typeof description !== "string" || description.length < 5) {
            return res.status(400).json({
                message: "La descripción debe ser una cadena de texto con al menos 5 caracteres",
            });
        }
    }

    next();
}