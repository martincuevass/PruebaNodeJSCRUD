import { renderTable } from './renderTable.js'; 

export function handleSearch(searchTerm, allData) {
    if (!searchTerm) {
        renderTable(allData); 
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredData = allData.filter(person => {
        return (
            person.fullname.toLowerCase().includes(lowerCaseSearchTerm) ||
            person.rfc.toLowerCase().includes(lowerCaseSearchTerm) ||
            person.email.toLowerCase().includes(lowerCaseSearchTerm) ||
            person.zipcode.includes(lowerCaseSearchTerm)
        );
    });
    renderTable(filteredData);
}
