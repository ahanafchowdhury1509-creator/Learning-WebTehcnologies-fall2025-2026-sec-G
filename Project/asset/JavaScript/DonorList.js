const MOCK_DONORS = [
    { id: 1, name: "SyedAhanaf C.", bloodGroup: "A+", location: "Mirpur-2, Dhaka", distance: 1.5, available: true, lastDonation: "2025-01-10" },
    { id: 2, name: "Rifat H.", bloodGroup: "O-", location: "Dhanmondi, Dhaka", distance: 5.2, available: true, lastDonation: "2024-12-01" },
    { id: 3, name: "Maria A.", bloodGroup: "B+", location: "Gulshan-1, Dhaka", distance: 8.0, available: false, lastDonation: "2025-02-20" },
    { id: 4, name: "Kamal Uddin", bloodGroup: "O+", location: "Uttara, Dhaka", distance: 12.1, available: true, lastDonation: "2024-11-15" },
    { id: 5, name: "Nusrat J.", bloodGroup: "A+", location: "Mirpur-10, Dhaka", distance: 3.5, available: false, lastDonation: "2025-03-05" },
    { id: 6, name: "Zahid K.", bloodGroup: "AB-", location: "Banani, Dhaka", distance: 7.8, available: true, lastDonation: "2025-01-25" },
];

let currentResults = [];
const donorLust=document.getElementById('donorList');
const donorCount=document.getElementById('donorCount');
function CreateCard(donor){
     const isAv=donor.available;
     const statCl=isAv?'status-available':'status-unavailable';
     const statTex=isAv?'Ready to donate':'Not available';
     return `
          <div class="donor-card">
            <h4>${donor.name}</h4>
            <span class="blood-badge">${donor.bloodGroup}</span>
            <span class="status-badge ${statusClass}">${statusText}</span>
            
            <p>Location: ${donor.location}</p>
            <p>Distance: <strong>${donor.distance.toFixed(1)} km</strong></p>
            <p>Last Donation: ${new Date(donor.lastDonation).toLocaleDateString()}</p>

            <button class="contact-btn" data-id="${donor.id}" ${!isAvailable ? 'disabled' : ''}>
                <i class="fas ${contactIcon}"></i> ${isAvailable ? 'Quick Contact' : 'Check Eligibility'}
            </button>
        </div>`}
function Render(donors){
    donorList.innerHTML = donors.map(createDonorCard).join('');
    donorCount.textContent = donors.length;
    
    if (donors.length === 0) {
        donorList.innerHTML = '<p class="placeholder-text">No donors found matching your criteria.</p>';
    }
   
    document.getElementById('mapView').addEventListener('click', () => {
        alert("Map View Feature: Integration with Google Maps API would show donor pins here.");
    });

}
function filterDonors() {
    const bloodGroup = document.getElementById('bloodGroup').value;
    const location = document.getElementById('location').value.toLowerCase();
    const availability = document.getElementById('availability').value;
    const eligibleDate = document.getElementById('lastDonation').value;

    let filtered = MOCK_DONORS.filter(donor => {
        // Filter 1: Blood Group
        if (bloodGroup && donor.bloodGroup !== bloodGroup) return false;

        // Filter 2: Location
        if (location && !donor.location.toLowerCase().includes(location)) return false;

        // Filter 3: Availability
        if (availability === 'ready' && !donor.available) return false;
        if (availability === 'not_ready' && donor.available) return false;

        // Filter 4: Last Donation Date (Eligible Before Date)
        if (eligibleDate) {
            const dateInput = new Date(eligibleDate);
            const donationDate = new Date(donor.lastDonation);
            // Check if the donor's last donation date is BEFORE the eligible date input
            if (donationDate >= dateInput) return false;
        }

        return true;
    });}