var ALL_REQUESTS = [
    { 
        id: 101, patient: "M. Hossain", group: "O-", units: 3, hospital: "City General", date: "2025-12-20", 
        urgency: "Emergency", status: "Active", responses: [
            { donor: "A. Smith", status: "Confirmed" }, 
            { donor: "B. Jones", status: "Pending" }
        ] 
    },
    { 
        id: 102, patient: "F. Ahmed", group: "A+", units: 2, hospital: "Dhaka Central", date: "2026-01-15", 
        urgency: "Normal", status: "Active", responses: [] 
    },
    { 
        id: 103, patient: "Z. Khan", group: "B+", units: 1, hospital: "Red Crescent", date: "2025-11-05", 
        urgency: "High", status: "Fulfilled", responses: [
            { donor: "C. David", status: "Confirmed" }
        ] 
    },
    { 
        id: 104, patient: "L. Moni", group: "AB+", units: 4, hospital: "Green Life", date: "2025-12-10", 
        urgency: "Normal", status: "Cancelled", responses: [] 
    }
];

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
function handleEmergencyShortcut() {
    urgencySelect.value = 'Emergency';
    form.scrollIntoView({ behavior: 'smooth' });

    var card = form.closest('.card');
    if (card) {
        card.style.borderColor = '#dc3545';
        card.style.borderWidth = '2px';
        card.style.transition = 'border 0.3s';
    }

    alert('EMERGENCY Mode Activated! Urgency level set to IMMEDIATE. Fill out the critical fields and submit as fast as possible.');
}
document.addEventListener('DOMContentLoaded', function() {
    form.addEventListener('submit', handleFormSubmit);
    emergencyBtn.addEventListener('click', handleEmergencyShortcut);
});