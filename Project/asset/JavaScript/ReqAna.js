const ALL_ADMIN_REQUESTS = [
    { id: 201, group: "A+", hospital: "City General", urgency: "Emergency", status: "Pending", units: 3, responseTime: 0 },
    { id: 202, group: "O-", hospital: "Dhaka Central", urgency: "High", status: "Pending", units: 2, responseTime: 0 },
    { id: 203, group: "B+", hospital: "Red Crescent", urgency: "Normal", status: "Approved", units: 1, responseTime: 12 },
    { id: 204, group: "A+", hospital: "Green Life", urgency: "High", status: "Rejected", units: 4, responseTime: 0 },
    { id: 205, group: "O+", hospital: "Square Hospital", urgency: "Normal", status: "Approved", units: 2, responseTime: 8 },
    { id: 206, group: "A+", hospital: "Apollo Clinic", urgency: "Emergency", status: "Approved", units: 5, responseTime: 5 },
    { id: 207, group: "AB+", hospital: "General Hospital", urgency: "Normal", status: "Approved", units: 1, responseTime: 15 },
];
function createPendingRequestRow(request) {
    const tr = document.createElement('tr');
    tr.setAttribute('data-id', request.id);
    tr.setAttribute('data-group', request.group);


    const tdId = document.createElement('td');
    tdId.textContent = request.id;


    const tdGroup = document.createElement('td');
    const strong = document.createElement('strong');
    strong.textContent = request.group;
    tdGroup.appendChild(strong);

 
    const tdHospital = document.createElement('td');
    tdHospital.textContent = request.hospital;

  
    const tdUrgency = document.createElement('td');
    const urgencySpan = document.createElement('span');
    urgencySpan.className = 'action-btn';
    urgencySpan.style.cursor = 'default';
    urgencySpan.style.fontSize = '0.8em';

    if (request.urgency === 'Emergency') {
        urgencySpan.classList.add('danger');
    }

    urgencySpan.textContent = request.urgency;
    tdUrgency.appendChild(urgencySpan);


    const tdAction = document.createElement('td');
    const button = document.createElement('button');
    button.className = 'action-btn primary process-btn';
    button.setAttribute('data-id', request.id);
    button.textContent = 'Process';

    tdAction.appendChild(button);

  
    tr.appendChild(tdId);
    tr.appendChild(tdGroup);
    tr.appendChild(tdHospital);
    tr.appendChild(tdUrgency);
    tr.appendChild(tdAction);

    return tr;
}
function renderPendingRequests() {
    pendingTableBody.innerHTML = '';

    const pendingRequests = ALL_ADMIN_REQUESTS.filter(function (req) {
        return req.status === 'Pending';
    });

    if (pendingRequests.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 5;
        td.style.textAlign = 'center';
        td.textContent = 'No pending requests requiring action.';
        tr.appendChild(td);
        pendingTableBody.appendChild(tr);
        return;
    }

    pendingRequests.forEach(function (request) {
        const row = createPendingRequestRow(request);
        pendingTableBody.appendChild(row);
    });
}
function renderBloodGroupChart() {
    chartArea.innerHTML = '';

    const groupCounts = ALL_ADMIN_REQUESTS.reduce(function (acc, req) {
        acc[req.group] = (acc[req.group] || 0) + 1;
        return acc;
    }, {});

    const totalRequests = ALL_ADMIN_REQUESTS.length;

    for (const group in groupCounts) {
        const count = groupCounts[group];
        const percentage = totalRequests > 0 ? (count / totalRequests) * 100 : 0;

        const chartBar = document.createElement('div');
        chartBar.className = 'chart-bar';

        const label = document.createElement('span');
        label.textContent = group + ' (' + count + ')';

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.width = Math.round(percentage) + '%';

        chartBar.appendChild(label);
        chartBar.appendChild(bar);
        chartArea.appendChild(chartBar);
    }
}
function calculateKPIs() {
    const total = ALL_ADMIN_REQUESTS.length;
    const approved = ALL_ADMIN_REQUESTS.filter(function (r) {
        return r.status === 'Approved';
    }).length;

    const rate = total > 0 ? ((approved / total) * 100).toFixed(1) : 0;

    const approvedWithTime = ALL_ADMIN_REQUESTS.filter(function (r) {
        return r.status === 'Approved' && r.responseTime > 0;
    });

    const totalTime = approvedWithTime.reduce(function (sum, r) {
        return sum + r.responseTime;
    }, 0);

    const avgTime = approvedWithTime.length > 0
        ? (totalTime / approvedWithTime.length).toFixed(1) + ' hrs'
        : 'N/A';

    document.getElementById('kpiTotalRequests').textContent = total;
    document.getElementById('kpiFulfillmentRate').textContent = rate + '%';
    document.getElementById('kpiResponseTime').textContent = avgTime;
}
function showProcessModal(id) {
    currentRequestToProcess = ALL_ADMIN_REQUESTS.find(function (r) {
        return r.id === id;
    });

    if (!currentRequestToProcess) return;

    modalReqId.textContent = currentRequestToProcess.id;
    modalReqGroup.textContent = currentRequestToProcess.group;
    actionReason.value = '';
    actionModal.style.display = 'block';
}
