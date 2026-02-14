import UsersService from "../services/UsersService.js";

/**
 * Valida campos requeridos para crear un usuario (POST)
 * Requiere: name, surname, email, password, number
 */
export function validateUserCreation(req, res, next) {
    const { name, surname, email, password, number } = req.body;

    const errors = [];

    if (!name || typeof name !== "string" || name.trim().length < 2) {
        errors.push("El nombre debe ser una cadena de texto con al menos 2 caracteres");
    }

    if (!surname || typeof surname !== "string" || surname.trim().length < 2) {
        errors.push("El apellido debe ser una cadena de texto con al menos 2 caracteres");
    }

    if (!email) {
        errors.push("El correo electrónico es requerido");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("El correo electrónico no es válido");
        }
    }

    if (!password || typeof password !== "string" || password.length < 6) {
        errors.push("La contraseña debe tener al menos 6 caracteres");
    }

    if (!number) {
        errors.push("El número de teléfono es requerido");
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
 * Valida campos opcionales para actualizar un usuario (PUT)
 * Los campos son opcionales, pero si se proporcionan, deben ser válidos
 */
export function validateUserUpdate(req, res, next) {
    const { name, surname, email, password, number } = req.body;

    const errors = [];

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim().length < 2) {
            errors.push("El nombre debe ser una cadena de texto con al menos 2 caracteres");
        }
    }

    if (surname !== undefined) {
        if (typeof surname !== "string" || surname.trim().length < 2) {
            errors.push("El apellido debe ser una cadena de texto con al menos 2 caracteres");
        }
    }

    if (email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("El correo electrónico no es válido");
        }
    }

    if (password !== undefined) {
        if (typeof password !== "string" || password.length < 6) {
            errors.push("La contraseña debe tener al menos 6 caracteres");
        }
    }

    // Verificar que al menos un campo se proporcione
    if (!name && !surname && !email && !password && !number) {
        return res.status(400).json({
            message: "No se ha proporcionado ningún campo para actualizar"
        });
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
 * Verifica que el usuario exista antes de procesar la solicitud
 */
export async function userExists(req, res, next) {
    try {
        // obtener ID de los parámetros de la solicitud
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                message: "El ID del usuario es requerido"
            });
        }

        const user = await UsersService.getUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        // Pasar el usuario al siguiente middleware/controlador
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

/**
 * Verificar si el usuario es admin
 */
export async function userIsAdmin(req, res, next) {
    try {
        const isAdmin = await UsersService.isAdmin(req.user.id);
        if (!isAdmin) {
            return res.status(403).json({
                message: "No tienes permiso para realizar esta acción"
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}