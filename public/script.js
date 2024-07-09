document.getElementById('createSecretButton').addEventListener('click', async () => {
    const secretText = document.getElementById('secretText').value;
    const ttl = document.getElementById('ttl').value;
    const maxReads = document.getElementById('maxReads').value;

    const response = await fetch('http://localhost:3000/api/secret', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            secretText: secretText,
            ttl: parseInt(ttl),
            maxReads: parseInt(maxReads)
        })
    });

    const data = await response.json();
    const secretUrl = data.secretUrl;

    document.getElementById('secretUrl').href = secretUrl;
    document.getElementById('secretUrl').textContent = secretUrl;
    document.getElementById('secretUrlContainer').classList.remove('hidden');
});

document.getElementById('getSecretButton').addEventListener('click', async () => {
    const secretUrl = document.getElementById('secretUrl').href;

    const response = await fetch(secretUrl);
    if (response.ok) {
        const data = await response.json();
        document.getElementById('retrievedSecret').textContent = `Secret: ${data.secretText}`;
    } else {
        document.getElementById('retrievedSecret').textContent = 'Secret has expired or read limit reached';
    }
});
