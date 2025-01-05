const { validateRFC, validateEmail, validateZipcode, validateFields } = require('../validations');

const addController = {
    add: (req, res) => {
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
            return res.status(400).json({ error: 'Faltan datos para agregar' });
        }

        req.getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({ error: 'Error al conectar a la base de datos' });
            }

            const checkQuery = 'SELECT * FROM personaldata WHERE email = ? OR rfc = ?';
            connection.query(checkQuery, [email, rfc], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al verificar los datos en la base de datos' });
                }
                if (results.length > 0) {
                    return res.status(400).json({ error: 'El correo electrónico o el RFC ya están registrados' });
                }
                const query = 'INSERT INTO personaldata (fullname, rfc, email, zipcode) VALUES (?, ?, ?, ?)';
                connection.query(query, [fullname, rfc, email, zipcode], (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error al agregar los datos' });
                    }
                    res.status(201).json({ message: 'Datos agregados correctamente' });
                });
            });
        });
    }
};

module.exports = addController;
