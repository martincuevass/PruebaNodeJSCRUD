const { validateRFC, validateEmail, validateZipcode, validateFields } = require('../validations');

const editController = {
    edit: (req, res) => {
        const { id } = req.params;
        const { fullname, rfc, email, zipcode } = req.body;

        if (!validateRFC(rfc)) {
            return res.status(400).json({ error: 'El RFC tiene un formato inválido' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'El correo electrónico tiene un formato inválido' });
        }
        if (!validateZipcode(zipcode)) {
            return res.status(400).json({ error: 'El código postal tiene un formato inválido' });
        }

        if (!validateFields(fullname, rfc, email, zipcode)) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        req.getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({ error: 'Error al conectar a la base de datos' });
            }

            const checkQuery = 'SELECT * FROM personaldata WHERE (email = ? OR rfc = ?) AND id != ?';
            connection.query(checkQuery, [email, rfc, id], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al verificar los datos en la base de datos' });
                }
                if (results.length > 0) {
                    return res.status(400).json({ error: 'El correo electrónico o el RFC ya están registrados por otro usuario' });
                }
                const query = 'UPDATE personaldata SET fullname = ?, rfc = ?, email = ?, zipcode = ? WHERE id = ?';
                connection.query(query, [fullname, rfc, email, zipcode, id], (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error al actualizar los datos' });
                    }

                    if (results.affectedRows === 0) {
                        return res.status(404).json({ error: 'No se encontró el registro con ese ID' });
                    }
                    res.status(200).json({ message: 'Datos actualizados correctamente' });
                });
            });
        });
    }
};

module.exports = editController;

