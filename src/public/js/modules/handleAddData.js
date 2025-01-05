export function handleAddData(e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const rfc = document.getElementById('rfc').value;
    const email = document.getElementById('email').value;
    const zipcode = document.getElementById('zipcode').value;

    fetch('/api/personaldata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, rfc, email, zipcode })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else if (data.message) {
                alert(data.message);
                document.getElementById('add-form').reset();
                window.location.reload();
            }
        })
        .catch(error => {
            alert('Error de conexión');
            console.error('Error:', error);
        });
}