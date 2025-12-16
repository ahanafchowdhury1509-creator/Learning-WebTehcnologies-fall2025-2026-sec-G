const ALL_DONORS = [
    { id: 401, anonName: "Donor X101", group: "O-", location: "Mirpur, Dhaka", availability: "Available", lastDonation: "2025-10-01", verified: "Verified" },
    { id: 402, anonName: "Donor Y202", group: "O-", location: "Dhanmondi, Dhaka", availability: "Available", lastDonation: "2025-11-15", verified: "Verified" },
    { id: 403, anonName: "Donor Z303", group: "A+", location: "Uttara, Dhaka", availability: "Unvailable", lastDonation: "2025-12-01", verified: "Verified" },
    { id: 404, anonName: "Donor W404", group: "O+", location: "Mirpur, Dhaka", availability: "Available", lastDonation: "2025-05-20", verified: "Pending" },
    { id: 405, anonName: "Donor V505", group: "O-", location: "Sylhet", availability: "Available", lastDonation: "2025-12-10", verified: "Verified" }
];
const matchTableBody = document.getElementById('matchTableBody');
const matchCountSpan = document.getElementById('matchCount');
const searchForm = document.getElementById('searchForm');
const saveSearchBtn = document.getElementById('saveSearchBtn');
function calculateMatchScore(donor, criteria) {
    var score = 0;
    if (donor.group === criteria.bloodGroup) {
        score += 30;
    } else {
        return 0;
    }
    if (criteria.location && donor.location.toLowerCase().includes(criteria.location.toLowerCase())) {
        score += 30;
    } else {
        score += 10;
    }
    if (donor.availability === 'Available' && criteria.availability !== 'Unvailable') {
        score += 25;
    }
    if (donor.verified === 'Verified' && criteria.verification === 'Verified') {
        score += 15;
    }
    return Math.min(score, 100);
}
function createMatchRow(donor, ranking) {
    var tr = document.createElement('tr');
    tr.setAttribute('data-id', donor.id);

    var tdRank = document.createElement('td');
    tdRank.textContent = ranking;

    var tdName = document.createElement('td');
    tdName.textContent = donor.anonName;

    var tdGroup = document.createElement('td');
    var strong = document.createElement('strong');
    strong.textContent = donor.group;
    tdGroup.appendChild(strong);

    var tdLocation = document.createElement('td');
    tdLocation.textContent = donor.location;

    var tdScore = document.createElement('td');
    var scoreSpan = document.createElement('span');
    if (donor.score >= 75) scoreSpan.className = 'score-high';
    else if (donor.score >= 50) scoreSpan.className = 'score-medium';
    else scoreSpan.className = 'score-low';
    scoreSpan.textContent = donor.score + '%';
    tdScore.appendChild(scoreSpan);

    var tdLastDonation = document.createElement('td');
    tdLastDonation.textContent = donor.lastDonation;

    var tdVerified = document.createElement('td');
    var verSpan = document.createElement('span');
    verSpan.className = 'status-' + donor.verified;
    verSpan.textContent = donor.verified;
    tdVerified.appendChild(verSpan);

    var tdAction = document.createElement('td');
    var contactBtn = document.createElement('button');
    contactBtn.className = 'action-btn primary contact-btn';
    contactBtn.setAttribute('data-id', donor.id);
    contactBtn.textContent = 'Contact';
    tdAction.appendChild(contactBtn);

    tr.appendChild(tdRank);
    tr.appendChild(tdName);
    tr.appendChild(tdGroup);
    tr.appendChild(tdLocation);
    tr.appendChild(tdScore);
    tr.appendChild(tdLastDonation);
    tr.appendChild(tdVerified);
    tr.appendChild(tdAction);

    return tr;
}
function handleSearch(e) {
    e.preventDefault();
    var criteria = {
        bloodGroup: document.getElementById('searchBloodGroup').value,
        location: document.getElementById('searchLocation').value,
        availability: document.getElementById('filterAvailability').value,
        lastDonation: document.getElementById('filterLastDonation').value,
        verification: document.getElementById('filterVerification').value
    };
    if (!criteria.bloodGroup) {
        alert('Please select the required Blood Group to perform a match.');
        return;
    }

    var matchedDonors = ALL_DONORS.map(function(donor) {
        var copy = Object.assign({}, donor);
        copy.score = calculateMatchScore(donor, criteria);
        return copy;
    });

    matchedDonors = matchedDonors.filter(function(donor) {
        return donor.score > 0 && (criteria.verification === '' || donor.verified === criteria.verification);
    });

    matchedDonors.sort(function(a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.lastDonation) - new Date(a.lastDonation);
    });

    matchCountSpan.textContent = matchedDonors.length;

    matchTableBody.innerHTML = '';
    if (matchedDonors.length === 0) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.colSpan = 8;
        td.style.textAlign = 'center';
        td.textContent = 'No high-priority matches found for the criteria.';
        tr.appendChild(td);
        matchTableBody.appendChild(tr);
        return;
    }

    matchedDonors.forEach(function(donor, index) {
        matchTableBody.appendChild(createMatchRow(donor, index + 1));
    });
}
