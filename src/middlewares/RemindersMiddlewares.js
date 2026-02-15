import RemindersService from "../services/RemindersService.js";
import mongoose from 'mongoose';

/**
 * Valida campos requeridos para crear un recordatorio (POST)
 * Requiere: title, description, date, status, user
 */
export function validateRemindersCreation(req, res, next) {
    const { title, description, date, status, user } = req.body;

    const errors = [];

    if (!title || typeof title !== "string" || title.trim().length < 2) {
        errors.push("El título debe ser una cadena de texto con al menos 2 caracteres");
    }

    if (!description || typeof description !== "string" || description.trim().length < 2) {
        errors.push("La descripción debe ser una cadena de texto con al menos 2 caracteres");
    }

    if (!date) {
        errors.push("La fecha es requerida");
    }

    if (!status || typeof status !== "string" || status.trim().length < 2) {
        errors.push("El estado debe ser una cadena de texto con al menos 2 caracteres");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Errores de validación",
            errors
        });
    }

    next();
}

/**
 * Valida campos opcionales para actualizar un recordatorio (PUT)
 * Los campos son opcionales, pero si se proporcionan, deben ser válidos
 */
export function validateReminderUpdate(req, res, next) {
    const { title, description, date, status, user } = req.body;

    const errors = [];

    if (title !== undefined) {
        if (typeof title !== "string" || title.trim().length < 2) {
            errors.push("El título debe ser una cadena de texto con al menos 2 caracteres");
        }
    }

    if (description !== undefined) {
        if (typeof description !== "string" || description.trim().length < 2) {
            errors.push("La descripción debe ser una cadena de texto con al menos 2 caracteres");
        }
    }

    if (date !== undefined) {
        if (typeof date !== "string") {
            errors.push("La fecha debe ser una cadena de texto con al menos 2 caracteres");
        } else if (isNaN(Date.parse(date))) {
            errors.push("La fecha no es válida");
        }
    }

    if(!mongoose.Types.ObjectId.isValid(status)) {
        errors.push("El status debe ser un object ID valido");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Errores de validación",
            errors
        });
    }

    next();
}

/**
 * Verifica que el recordatorio exista antes de procesar la solicitud
 */
export async function reminderExists(req, res, next) {
    try {
        // Soporta id tanto de params como de body
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                message: "El ID del recordatorio es requerido"
            });
        }

        try {
            const reminder = await RemindersService.getById(id, req.user.id);
            if (!reminder) {
                return res.status(404).json({
                    message: "Recordatorio no encontrado"
                });
            }

            // Pasar el usuario al siguiente middleware/controlador
            req.reminder = reminder;
        } catch (error) {
            return res.status(404).json({
                message: "Recordatorio no encontrado"
            });
        }

        next();
    } catch (error) {
        next(error);
    }
}