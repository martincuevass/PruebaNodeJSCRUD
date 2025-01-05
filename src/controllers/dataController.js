const dataController = {
    list: (req, res) => {
        req.getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({ error: 'Error al conectar a la base de datos' });
            }

            connection.query('SELECT * FROM personaldata', (err, results) => {
                if (err) {
                    console.error('Error al ejecutar la consulta:', err);
                    return res.status(500).json({ error: 'Error al obtener los datos' });
                }
                res.json(results);
            });
        });
    }
};

module.exports = dataController;
