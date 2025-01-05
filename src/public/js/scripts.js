import { showAddForm } from './modules/showAddForm.js';
import { handleAddData } from './modules/handleAddData.js';
import { loadData } from './modules/loadData.js'; 
import { handleDelete } from './modules/handleDelete.js';
import { handleEdit } from './modules/handleEdit.js';
import { handleSearch } from './modules/handleSearch.js';


document.getElementById('show-add-form-btn').addEventListener('click', showAddForm);
document.getElementById('add-form').addEventListener('submit', handleAddData);
document.getElementById('data-table').addEventListener('click', handleDelete);
document.getElementById('data-table').addEventListener('click', handleEdit);

loadData().then((data) => {
    document.getElementById('search-bar').addEventListener('input', function() {
        handleSearch(this.value, data); 
    });
});

document.getElementById('cancel-edit-btn').addEventListener('click', function() {
    document.getElementById('edit-form-container').style.display = 'none';
});
