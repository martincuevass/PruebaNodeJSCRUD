const deleteController = {
    delete: (req, res) => {
        const { id } = req.params;
        req.getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({ error: 'Error al conectar a la base de datos' });
            }

            const query = 'DELETE FROM personaldata WHERE id = ?';
            connection.query(query, [id], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al eliminar los datos' });
                }

                res.status(200).json({ message: 'Datos eliminados correctamente' });
            });
        });
    }
};

module.exports = deleteController;

