export function renderTable(data) {
    const tableBody = document.getElementById('data-table');
    tableBody.innerHTML = '';

    data.forEach(person => {
        const row = `
            <tr>
                <td>${person.id}</td>
                <td>${person.fullname}</td>
                <td>${person.rfc}</td>
                <td>${person.email}</td>
                <td>${person.zipcode}</td>
                <td>
                    <button class="btn btn-warning btn-edit" data-id="${person.id}" data-fullname="${person.fullname}" data-rfc="${person.rfc}" data-email="${person.email}" data-zipcode="${person.zipcode}">Editar</button>
                    <button class="btn btn-danger btn-delete" data-id="${person.id}">Eliminar</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
