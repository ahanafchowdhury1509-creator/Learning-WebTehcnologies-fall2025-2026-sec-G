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
function formatTimeSince(startTime) {
    const diffMs = Date.now() - startTime;
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${minutes}m`;
}

function createEmergencyRow(request) {
    const timeSince = formatTimeSince(request.startTime);
    const statusClass = `status-${request.status}`;
    const disabledAttr = request.status === 'Fulfilled' ? 'disabled' : '';

    return `
        <tr data-id="${request.id}">
            <td>${request.id}</td>
            <td><strong>${request.group}</strong></td>
            <td>${request.hospital}</td>
            <td>${timeSince}</td>
            <td><strong style="color: #007bff;">${request.responses}</strong></td>
            <td><span class="status-label ${statusClass}">${request.status}</span></td>
            <td>
                <button class="resolve-btn" data-id="${request.id}" ${disabledAttr}><i class="fas fa-check"></i> Resolve/Fulfill</button>
            </td>
        </tr>
    `;
}

function renderRequests() {
    const activeRequests = EMERGENCY_REQUESTS.filter(req => req.status !== 'Resolved');
    emergencyTableBody.innerHTML = activeRequests.length
        ? activeRequests.map(createEmergencyRow).join('')
        : '<tr><td colspan="7" style="text-align: center;">No current emergency requests.</td></tr>';
    
    activeCountSpan.textContent = activeRequests.filter(req => req.status === 'Active' || req.status === 'Responded').length;
}

function updateKPIs() {
    kpiResponseTime.textContent = MOCK_KPI.avgResponseTime;
    kpiCoverageRate.textContent = MOCK_KPI.coverageRate;
}

function handleQuickRequest(e) {
    e.preventDefault();
    const group = document.getElementById('reqBloodGroup').value;
    const hospital = document.getElementById('reqHospital').value.trim();
    if (!group || !hospital) return;

    const newReq = {
        id: Math.max(...EMERGENCY_REQUESTS.map(r => r.id)) + 1,
        group,
        hospital,
        startTime: Date.now(),
        responses: 0,
        status: "Active"
    };

    EMERGENCY_REQUESTS.push(newReq);
    renderRequests();
    alert(`EMERGENCY Request created for ${group} at ${hospital}! Donor ALERT broadcast initiated.`);
    quickRequestForm.reset();
}

function handleBroadcast(type) {
    alert(`Admin Action: EMERGENCY ${type} broadcast initiated to all matching donors for active requests!`);
}

function handleResolve(e) {
    const button = e.target.closest('.resolve-btn');
    if (!button || button.disabled) return;

    const id = parseInt(button.getAttribute('data-id'));
    const request = EMERGENCY_REQUESTS.find(r => r.id === id);
    if (request && confirm(`Confirm marking Request ${id} (${request.group}) as FULFILLED?`)) {
        request.status = 'Fulfilled';
        renderRequests();
        alert(`Request ${id} status updated to FULFILLED.`);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    updateKPIs();
    renderRequests();

    quickRequestForm.addEventListener('submit', handleQuickRequest);
    broadcastSmsBtn.addEventListener('click', () => handleBroadcast('SMS'));
    broadcastEmailBtn.addEventListener('click', () => handleBroadcast('Email'));
    emergencyTableBody.addEventListener('click', handleResolve);

    setInterval(renderRequests, 10000);
});