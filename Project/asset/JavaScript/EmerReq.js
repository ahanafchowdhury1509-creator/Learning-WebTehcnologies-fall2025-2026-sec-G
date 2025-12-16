let EMERGENCY_REQUESTS = [
    { id: 501, group: "O-", hospital: "City General Hospital", startTime: Date.now() - (5 * 60 * 1000), responses: 3, status: "Active" },
    { id: 502, group: "A+", hospital: "Dhaka Central Trauma", startTime: Date.now() - (25 * 60 * 1000), responses: 6, status: "Responded" },
    { id: 503, group: "B+", hospital: "Square Accident Ward", startTime: Date.now() - (55 * 60 * 1000), responses: 10, status: "Fulfilled" },
];

const MOCK_KPI = {
    avgResponseTime: "8.5 min",
    coverageRate: "85%"
};

const quickRequestForm = document.getElementById('quickRequestForm');
const emergencyTableBody = document.getElementById('emergencyTableBody');
const activeCountSpan = document.getElementById('activeCount');
const kpiResponseTime = document.getElementById('kpiResponseTime');
const kpiCoverageRate = document.getElementById('kpiCoverageRate');
const broadcastSmsBtn = document.getElementById('broadcastSms');
const broadcastEmailBtn = document.getElementById('broadcastEmail');
