export function handleEdit(e) {
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.dataset.id;
        const fullname = e.target.dataset.fullname;
        const rfc = e.target.dataset.rfc;
        const email = e.target.dataset.email;
        const zipcode = e.target.dataset.zipcode;

        if (!id || !fullname || !rfc || !email || !zipcode) {
            alert('Faltan datos para editar.');
            return;
        }

        document.getElementById('edit-id').value = id;
        document.getElementById('edit-fullname').value = fullname;
        document.getElementById('edit-rfc').value = rfc;
        document.getElementById('edit-email').value = email;
        document.getElementById('edit-zipcode').value = zipcode;

        document.getElementById('edit-form-container').style.display = 'block';

        document.getElementById('edit-form').onsubmit = function(e) {
            e.preventDefault();

            const id = document.getElementById('edit-id').value;
            const fullname = document.getElementById('edit-fullname').value;
            const rfc = document.getElementById('edit-rfc').value;
            const email = document.getElementById('edit-email').value;
            const zipcode = document.getElementById('edit-zipcode').value;

            fetch(`/api/personaldata/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, rfc, email, zipcode })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else if (data.message) {
                        alert(data.message);
                        document.getElementById('edit-form-container').style.display = 'none';
                        window.location.reload();
                    }
                })
                .catch(error => {
                    alert('Error de conexión');
                    console.error('Error:', error);
                });
        };
    }
}