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
function updateKPISummary() {
    kpiTotalDonors.textContent = MOCK_METRICS.totalDonors;
    kpiActiveRequests.textContent = MOCK_METRICS.activeRequests;
    kpiEmergencyRequests.textContent = MOCK_METRICS.emergencyRequests;
    kpiScheduledEvents.textContent = MOCK_METRICS.scheduledEvents;
}
function updateOperationalStatus() {
    statusPendingApprovals.textContent = MOCK_METRICS.pendingApprovals;
    statusCriticalAlerts.textContent = MOCK_METRICS.criticalAlerts;

    if (MOCK_METRICS.criticalAlerts > 1) {
        statusCriticalAlerts.classList.add('status-warning');
        statusCriticalAlerts.textContent += ' (ACTION NEEDED)';
    }

    if (MOCK_METRICS.pendingApprovals > 10) {
        statusApiLatency.textContent = 'High';
        statusApiLatency.classList.remove('status-warning');
        statusApiLatency.classList.add('status-danger');
    } else {
        statusApiLatency.textContent = 'Normal';
        statusApiLatency.classList.remove('status-danger');
        statusApiLatency.classList.add('status-ok');
    }
}
function renderDemandChart() {
    const data = MOCK_ANALYTICS.demandDistribution;
    const values = Object.values(data);
    const maxCount = Math.max(...values);
    let chartHtml = '';

    for (const group in data) {
        const count = data[group];
        const percentage = (count / maxCount) * 100;
        chartHtml += `
            <div class="chart-bar">
                <span>${group} (${count})</span>
                <div class="bar" style="width: ${percentage.toFixed(0)}%;"></div>
            </div>
        `;
    }
    
    chartDemandDistribution.innerHTML = chartHtml;
}