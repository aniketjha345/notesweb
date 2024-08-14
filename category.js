document.addEventListener('DOMContentLoaded', () => {
    const fileList = document.getElementById('fileList');
    const category = window.location.pathname.split('/').pop().replace('.html', ''); // Extract category from URL

    function loadFiles() {
        const files = JSON.parse(localStorage.getItem(category) || '[]');
        fileList.innerHTML = '';
        files.forEach(file => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${file.url}" target="_blank">${file.name}</a>
                <a href="${file.url}" download class="download">Download</a>
            `;
            fileList.appendChild(li);
        });
    }

    loadFiles();
});
