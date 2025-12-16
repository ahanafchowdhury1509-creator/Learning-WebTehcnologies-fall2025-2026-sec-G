const form = document.getElementById('bloodRequestForm');
const emergencyBtn = document.getElementById('emergencyShortcut');
const urgencySelect = document.getElementById('urgency');
const confirmationMessage = document.getElementById('confirmationMessage');

function handleFormSubmit(e) {
    e.preventDefault();

    if (!form.checkValidity()) {
        alert("Please fill out all required fields.");
        return;
    }

    const data = {
        bloodGroup: document.getElementById('bloodGroup').value,
        units: document.getElementById('units').value,
        urgency: urgencySelect.value
    };

    confirmationMessage.style.display = 'block';
    confirmationMessage.innerHTML = '';

    var icon = document.createElement('span');
    icon.textContent = '✔ ';
    icon.style.color = 'green';
    icon.style.fontWeight = 'bold';

    var msg = document.createElement('span');
    msg.textContent = 'Request Submitted! Matching ' + data.bloodGroup + ' for ' + data.units + ' units...';

    confirmationMessage.appendChild(icon);
    confirmationMessage.appendChild(msg);

    console.log('Sending request for ' + data.bloodGroup + ' with urgency ' + data.urgency);

    setTimeout(function() {
        form.reset();
        confirmationMessage.style.display = 'none';
        alert('Request successful! ' + data.bloodGroup + ' donors have been notified and auto-matching is complete.');
    }, 2000);
}