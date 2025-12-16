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
