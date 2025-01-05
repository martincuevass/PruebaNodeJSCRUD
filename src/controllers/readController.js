const readController = {};

readController.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ message: 'Error de conexión a la base de datos', error: err });
        }

        conn.query('SELECT * FROM personaldata', (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener los datos', error: err });
            }

            res.json(rows);
        });
    });
};

readController.getById = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ message: 'Error de conexión a la base de datos', error: err });
        }
        conn.query('SELECT * FROM personaldata WHERE id = ?', [id], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener el registro', error: err });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Registro no encontrado' });
            }

            res.json(rows[0]);
        });
    });
};

module.exports = readController;
