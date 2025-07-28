document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });
        
        const data = await response.json();
        alert(data.message);
        
        // Clear form
        document.getElementById('userForm').reset();
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('getUsers').addEventListener('click', async () => {
    try {
        const response = await fetch('/users');
        const users = await response.json();
        
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Clear existing list
        
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} - ${user.email}`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});