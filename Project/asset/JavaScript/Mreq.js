var ALL_REQUESTS = [
    { 
        id: 101, patient: "M. Hossain", group: "O-", units: 3, hospital: "City General", date: "2025-12-20", 
        urgency: "Emergency", status: "Active", responses: [
            { donor: "A. Smith", status: "Confirmed" }, 
            { donor: "B. Jones", status: "Pending" }
        ] 
    },
    { 
        id: 102, patient: "F. Ahmed", group: "A+", units: 2, hospital: "Dhaka Central", date: "2026-01-15", 
        urgency: "Normal", status: "Active", responses: [] 
    },
    { 
        id: 103, patient: "Z. Khan", group: "B+", units: 1, hospital: "Red Crescent", date: "2025-11-05", 
        urgency: "High", status: "Fulfilled", responses: [
            { donor: "C. David", status: "Confirmed" }
        ] 
    },
    { 
        id: 104, patient: "L. Moni", group: "AB+", units: 4, hospital: "Green Life", date: "2025-12-10", 
        urgency: "Normal", status: "Cancelled", responses: [] 
    }
];

var currentStatus = "Active";

var tableBody = document.getElementById('requestTableBody');
var statusTabs = document.querySelector('.status-tabs');
var currentStatusTitle = document.getElementById('currentStatusTitle');
var modal = document.getElementById('detailsModal');
var closeBtn = document.querySelector('.close-btn');

function createRequestRow(request) {
    var tr = document.createElement('tr');
    tr.setAttribute('data-request-id', request.id);

    var urgencyClass = request.urgency === 'Emergency' ? 'status-Emergency' : '';
    var responseCount = request.responses.length;
    var canEditOrCancel = request.status === 'Active';
    var canFulfill = request.status === 'Active' && responseCount > 0;

    var tdId = document.createElement('td');
    tdId.textContent = request.id;
    tr.appendChild(tdId);

    var tdGroup = document.createElement('td');
    var strong = document.createElement('strong');
    strong.textContent = request.group;
    tdGroup.appendChild(strong);
    tr.appendChild(tdGroup);

    var tdUnits = document.createElement('td');
    tdUnits.textContent = request.units;
    tr.appendChild(tdUnits);

    var tdHospital = document.createElement('td');
    tdHospital.textContent = request.hospital;
    tr.appendChild(tdHospital);

    var tdDate = document.createElement('td');
    tdDate.textContent = request.date;
    tr.appendChild(tdDate);

    var tdUrgency = document.createElement('td');
    var spanUrgency = document.createElement('span');
    spanUrgency.className = 'status-indicator ' + urgencyClass;
    spanUrgency.textContent = request.urgency;
    tdUrgency.appendChild(spanUrgency);
    tr.appendChild(tdUrgency);

    var tdView = document.createElement('td');
    var viewBtn = document.createElement('button');
    viewBtn.className = 'action-btn secondary view-responses-btn';
    viewBtn.setAttribute('data-id', request.id);
    viewBtn.textContent = 'View (' + responseCount + ')';
    tdView.appendChild(viewBtn);
    tr.appendChild(tdView);

    var tdActions = document.createElement('td');

    var editBtn = document.createElement('button');
    editBtn.className = 'action-btn secondary edit-btn';
    editBtn.setAttribute('data-id', request.id);
    editBtn.textContent = 'Edit';
    if (!canEditOrCancel) editBtn.disabled = true;
    tdActions.appendChild(editBtn);

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'action-btn danger cancel-btn';
    cancelBtn.setAttribute('data-id', request.id);
    cancelBtn.textContent = 'Cancel';
    if (!canEditOrCancel) cancelBtn.disabled = true;
    tdActions.appendChild(cancelBtn);

    var fulfillBtn = document.createElement('button');
    fulfillBtn.className = 'action-btn primary fulfill-btn';
    fulfillBtn.setAttribute('data-id', request.id);
    fulfillBtn.textContent = 'Fulfill';
    if (!canFulfill) fulfillBtn.disabled = true;
    tdActions.appendChild(fulfillBtn);

    tr.appendChild(tdActions);

    return tr;
}

function renderRequests(status) {
    currentStatusTitle.textContent = status;
    tableBody.innerHTML = '';

    var filtered = ALL_REQUESTS.filter(function(r) { return r.status === status; });
    if (filtered.length === 0) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.setAttribute('colspan', '8');
        td.style.textAlign = 'center';
        td.textContent = 'No ' + status.toLowerCase() + ' requests found.';
        tr.appendChild(td);
        tableBody.appendChild(tr);
        return;
    }

    filtered.forEach(function(req) {
        tableBody.appendChild(createRequestRow(req));
    });
}

function handleTabClick(e) {
    var button = e.target.closest('.tab-btn');
    if (!button) return;

    document.querySelectorAll('.tab-btn').forEach(function(btn) { btn.classList.remove('active'); });
    button.classList.add('active');

    currentStatus = button.getAttribute('data-status');
    renderRequests(currentStatus);
}

function handleTableAction(e) {
    var button = e.target.closest('button');
    if (!button) return;

    var reqId = parseInt(button.getAttribute('data-id'));
    var request = ALL_REQUESTS.find(function(r) { return r.id === reqId; });
    if (!request) return;

    if (button.classList.contains('view-responses-btn')) {
        showDetailsModal(request);
    } else if (button.classList.contains('edit-btn')) {
        alert('Editing Request ' + reqId + '. (Redirects to modified form.)');
    } else if (button.classList.contains('cancel-btn')) {
        if (confirm('Are you sure you want to cancel Request ' + reqId + ' (' + request.group + ')?')) {
            request.status = 'Cancelled';
            renderRequests(currentStatus);
            alert('Request ' + reqId + ' has been cancelled.');
        }
    } else if (button.classList.contains('fulfill-btn')) {
        handleFulfillAction(request);
    }
}

function handleFulfillAction(request) {
    if (confirm('Mark Request ' + request.id + ' as FULFILLED? This will notify all pending donors.')) {
        request.status = 'Fulfilled';
        renderRequests(currentStatus);
        modal.style.display = 'none';
        alert('Request ' + request.id + ' fulfilled successfully! Donors have been notified.');
    }
}

function showDetailsModal(request) {
    document.getElementById('modalReqId').textContent = request.id;
    document.getElementById('modalBloodGroup').textContent = request.group;
    document.getElementById('modalUnits').textContent = request.units;
    document.getElementById('modalStatus').textContent = request.status;
    document.getElementById('responseCount').textContent = request.responses.length;

    var responseList = document.getElementById('responseList');
    responseList.innerHTML = '';
    if (request.responses.length > 0) {
        request.responses.forEach(function(res) {
            var li = document.createElement('li');
            li.textContent = 'Donor: ' + res.donor + ' - Status: ' + res.status;
            responseList.appendChild(li);
        });
    } else {
        var li = document.createElement('li');
        li.textContent = 'No donors have responded yet.';
        responseList.appendChild(li);
    }

    var fulfillBtn = modal.querySelector('.fulfill-btn');
    fulfillBtn.disabled = !(request.status === 'Active' && request.responses.length > 0);
    fulfillBtn.onclick = function() { handleFulfillAction(request); };

    modal.style.display = 'block';
}

function hideDetailsModal() {
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    renderRequests(currentStatus);

    statusTabs.addEventListener('click', handleTabClick);
    tableBody.addEventListener('click', handleTableAction);
    closeBtn.addEventListener('click', hideDetailsModal);

    window.onclick = function(event) {
        if (event.target === modal) hideDetailsModal();
    };
});
