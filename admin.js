document.addEventListener('DOMContentLoaded', () => {
    const correctPassword = 'Aniket@9090';
    const loginButton = document.getElementById('loginButton');
    const passwordInput = document.getElementById('passwordInput');
    const loginContainer = document.getElementById('login-container');
    const adminContainer = document.getElementById('admin-container');
    const logoutButton = document.getElementById('logoutButton');

    loginButton.addEventListener('click', () => {
        const enteredPassword = passwordInput.value;

        if (enteredPassword === correctPassword) {
            loginContainer.style.display = 'none'; // Hide login container
            adminContainer.style.display = 'block'; // Show admin container
        } else {
            alert('Incorrect password.');
        }
    });

    logoutButton.addEventListener('click', () => {
        adminContainer.style.display = 'none'; // Hide admin container
        loginContainer.style.display = 'block'; // Show login container
        passwordInput.value = ''; // Clear password input
    });

    const uploadButtons = document.querySelectorAll('.uploadButton');
    const updateInput = document.getElementById('updateInput');
    const updateButton = document.getElementById('updateButton');
    let fileToUpdate = null; // Variable to hold the file to be updated

    function loadFiles(category) {
        const files = JSON.parse(localStorage.getItem(category) || '[]');
        const fileList = document.getElementById(`${category}List`);
        fileList.innerHTML = '';
        files.forEach(file => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${file.url}" target="_blank">${file.name}</a>
                <button class="delete" data-category="${category}" data-name="${file.name}">Delete</button>
                <button class="update" data-category="${category}" data-name="${file.name}">Update</button>
            `;
            fileList.appendChild(li);
        });
    }

    function saveFile(category, file) {
        const files = JSON.parse(localStorage.getItem(category) || '[]');
        files.push(file);
        localStorage.setItem(category, JSON.stringify(files));
        loadFiles(category);
    }

    function deleteFile(category, name) {
        let files = JSON.parse(localStorage.getItem(category) || '[]');
        files = files.filter(file => file.name !== name);
        localStorage.setItem(category, JSON.stringify(files));
        loadFiles(category);
    }

    function updateFile(category, oldName, newFile) {
        let files = JSON.parse(localStorage.getItem(category) || '[]');
        files = files.map(file => file.name === oldName ? newFile : file);
        localStorage.setItem(category, JSON.stringify(files));
        loadFiles(category);
    }

    uploadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const category = event.target.getAttribute('data-category');
            const fileInput = document.getElementById(`${category}Input`);

            if (fileInput.files.length === 0) {
                alert('Please select a file to upload.');
                return;
            }

            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                const fileUrl = URL.createObjectURL(file);
                saveFile(category, {
                    name: file.name,
                    url: fileUrl
                });
                fileInput.value = '';
            };

            reader.readAsArrayBuffer(file);
        });
    });

    document.querySelectorAll('.categories').forEach(categoryContainer => {
        categoryContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete')) {
                const category = event.target.getAttribute('data-category');
                const fileName = event.target.getAttribute('data-name');
                deleteFile(category, fileName);
            } else if (event.target.classList.contains('update')) {
                const category = event.target.getAttribute('data-category');
                const fileName = event.target.getAttribute('data-name');
                fileToUpdate = { category, fileName }; // Set the file to update
                updateInput.style.display = 'block'; // Show the file input for update
                updateButton.style.display = 'block'; // Show the update button
            }
        });
    });

    updateButton.addEventListener('click', () => {
        if (!fileToUpdate) {
            alert('No file selected to update.');
            return;
        }

        if (updateInput.files.length === 0) {
            alert('Please select a new file to update.');
            return;
        }

        const newFile = updateInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const fileUrl = URL.createObjectURL(newFile);
            updateFile(fileToUpdate.category, fileToUpdate.fileName, {
                name: newFile.name,
                url: fileUrl
            });
            updateInput.value = ''; // Clear the file input
            updateInput.style.display = 'none'; // Hide the file input
            updateButton.style.display = 'none'; // Hide the update button
            fileToUpdate = null; // Reset the file to update
        };

        reader.readAsArrayBuffer(newFile);
    });

    // Load files for each category on page load
    ['programming', 'devops', 'hacking', 'databases'].forEach(loadFiles);

    logoutButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to home page on logout
    });
});
