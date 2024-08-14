document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the list elements for each category
    const programmingList = document.getElementById('programmingList');
    const devopsList = document.getElementById('devopsList');
    const hackingList = document.getElementById('hackingList');
    const databasesList = document.getElementById('databasesList');

    // Load files into the respective category
    function loadFiles() {
        const files = JSON.parse(localStorage.getItem('pdfFiles') || '[]');

        // Clear each category list
        programmingList.innerHTML = '';
        devopsList.innerHTML = '';
        hackingList.innerHTML = '';
        databasesList.innerHTML = '';

        files.forEach(file => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${file.url}" target="_blank">${file.name}</a>
                <a href="${file.url}" download class="download">Download</a>
            `;

            // Append file to the appropriate category list
            switch (file.category) {
                case 'Programming':
                    programmingList.appendChild(li);
                    break;
                case 'DevOps':
                    devopsList.appendChild(li);
                    break;
                case 'Hacking':
                    hackingList.appendChild(li);
                    break;
                case 'Databases':
                    databasesList.appendChild(li);
                    break;
            }
        });
    }

    loadFiles();
});
