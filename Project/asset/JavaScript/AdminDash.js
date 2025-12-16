const MOCK_METRICS = {
    totalDonors: 1250,
    activeRequests: 45,
    emergencyRequests: 3,
    scheduledEvents: 7,
    pendingApprovals: 8,
    criticalAlerts: 2,
};

const MOCK_ANALYTICS = {
    demandDistribution: { 'O+': 80, 'A+': 55, 'B+': 40, 'O-': 25, 'AB+': 15, 'A-': 5 },
    fulfillmentRate: 88.5,
    avgResponseTime: "12 min 30 sec",
    emergencyCount: 3,
    normalCount: 42
};
const kpiTotalDonors = document.getElementById('kpiTotalDonors');
const kpiActiveRequests = document.getElementById('kpiActiveRequests');
const kpiEmergencyRequests = document.getElementById('kpiEmergencyRequests');
const kpiScheduledEvents = document.getElementById('kpiScheduledEvents');

const statusPendingApprovals = document.getElementById('statusPendingApprovals');
const statusCriticalAlerts = document.getElementById('statusCriticalAlerts');
const statusApiLatency = document.getElementById('statusApiLatency');

const chartDemandDistribution = document.getElementById('chartDemandDistribution');
const fulfillmentRateValue = document.getElementById('fulfillmentRateValue');
const responseTimeValue = document.getElementById('responseTimeValue');
const ratioValue = document.getElementById('ratioValue');