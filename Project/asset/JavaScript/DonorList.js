const MOCK_DONORS = [
    { id: 1, name: "SyedAhanaf C.", bloodGroup: "A+", location: "Mirpur-2, Dhaka", distance: 1.5, available: true, lastDonation: "2025-01-10" },
    { id: 2, name: "Rifat H.", bloodGroup: "O-", location: "Dhanmondi, Dhaka", distance: 5.2, available: true, lastDonation: "2024-12-01" },
    { id: 3, name: "Maria A.", bloodGroup: "B+", location: "Gulshan-1, Dhaka", distance: 8.0, available: false, lastDonation: "2025-02-20" },
    { id: 4, name: "Kamal Uddin", bloodGroup: "O+", location: "Uttara, Dhaka", distance: 12.1, available: true, lastDonation: "2024-11-15" },
    { id: 5, name: "Nusrat J.", bloodGroup: "A+", location: "Mirpur-10, Dhaka", distance: 3.5, available: false, lastDonation: "2025-03-05" },
    { id: 6, name: "Zahid K.", bloodGroup: "AB-", location: "Banani, Dhaka", distance: 7.8, available: true, lastDonation: "2025-01-25" }
];

let currentResults = [];

const donorList = document.getElementById('donorList');
const donorCount = document.getElementById('donorCount');
const mapViewBtn = document.getElementById('mapView');
const listViewBtn = document.getElementById('listView');

function createCard(donor) {
    const isAvailable = donor.available;
    const statusClass = isAvailable ? 'status-available' : 'status-unavailable';
    const statusText = isAvailable ? 'Ready to donate' : 'Not available';

    return `
        <div class="donor-card">
            <h4>${donor.name}</h4>
            <span class="blood-badge">${donor.bloodGroup}</span>
            <span class="status-badge ${statusClass}">${statusText}</span>
            <p>Location: ${donor.location}</p>
            <p>Distance: <strong>${donor.distance.toFixed(1)} km</strong></p>
            <p>Last Donation: ${new Date(donor.lastDonation).toLocaleDateString()}</p>
            <button class="contact-btn" data-id="${donor.id}" ${!isAvailable ? 'disabled' : ''}>
                ${isAvailable ? 'Quick Contact' : 'Check Eligibility'}
            </button>
        </div>
    `;
}

function renderDonors(donors) {
    if (donors.length === 0) {
        donorList.innerHTML =
            '<p class="placeholder-text">No donors found matching your criteria.</p>';
        donorCount.textContent = 0;
        return;
    }
    donorList.innerHTML = donors.map(createCard).join('');
    donorCount.textContent = donors.length;
}

function filterDonors() {
    const bloodGroup = document.getElementById('bloodGroup').value;
    const location = document.getElementById('location').value.toLowerCase();
    const availability = document.getElementById('availability').value;
    const eligibleDate = document.getElementById('lastDonation').value;

    currentResults = MOCK_DONORS.filter(donor => {
        if (bloodGroup && donor.bloodGroup !== bloodGroup) return false;
        if (location && !donor.location.toLowerCase().includes(location)) return false;
        if (availability === 'ready' && !donor.available) return false;
        if (availability === 'not_ready' && donor.available) return false;
        if (eligibleDate) {
            const inputDate = new Date(eligibleDate);
            const donorDate = new Date(donor.lastDonation);
            if (donorDate >= inputDate) return false;
        }
        return true;
    });

    sortDonors();
}

function sortDonors() {
    const sortOrder = document.getElementById('sortOrder').value;

    currentResults.sort((a, b) => {
        if (sortOrder === 'distance') return a.distance - b.distance;
        if (sortOrder === 'lastDonation') return new Date(b.lastDonation) - new Date(a.lastDonation);
        if (sortOrder === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    renderDonors(currentResults);
}

document.addEventListener('DOMContentLoaded', () => {
    currentResults = [...MOCK_DONORS];
    renderDonors(currentResults);

    document.querySelector('.search-btn').addEventListener('click', filterDonors);
    document.getElementById('sortOrder').addEventListener('change', sortDonors);

    donorList.addEventListener('click', (e) => {
        const btn = e.target.closest('.contact-btn');
        if (btn && !btn.disabled) {
            alert(`Contacting Donor ID ${btn.dataset.id}...`);
        }
    });

    mapViewBtn.addEventListener('click', () => {
        alert("Map View Feature will be added later.");
    });

    listViewBtn.addEventListener('click', () => {
        mapViewBtn.classList.remove('active');
        listViewBtn.classList.add('active');
        donorList.style.gridTemplateColumns = 'repeat(3, 1fr)';
    });
});
