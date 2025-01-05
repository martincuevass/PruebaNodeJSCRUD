export function handleDelete(e) {
    if (e.target.classList.contains('btn-delete')) {
        const id = e.target.dataset.id;
        if (confirm('¿Seguro que desea eliminar este registro?')) {
            fetch(`/api/personaldata/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Datos eliminados correctamente') {
                        alert('Registro eliminado exitosamente');
                        window.location.reload();
                    } else {
                        alert('Error al eliminar el registro');
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }
}
