import { renderTable } from './renderTable.js';
export function loadData() {
    return fetch('/api/personaldata')
        .then(response => response.json())
        .then(data => {
            renderTable(data);  
            return data;  
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}
