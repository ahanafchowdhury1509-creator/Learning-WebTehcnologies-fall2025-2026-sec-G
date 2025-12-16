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
