const REPORT_NAMES = {
    'donor_matching': 'Donor Matching Report',
    'attendance': 'Appointment & Camp Attendance Report',
    'notifications': 'Notification Delivery Report'
};

const reportGenerationForm = document.getElementById('reportGenerationForm');
const reportTypeSelect = document.getElementById('reportType');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const reportFilterInput = document.getElementById('reportFilter');
const currentStatusSpan = document.getElementById('currentStatus');
const lastExportSpan = document.getElementById('lastExport');
const logList = document.getElementById('logList');
function generateReport(format) {
    const typeKey = reportTypeSelect.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const filter = reportFilterInput.value;

    if (!typeKey || !startDate || !endDate) {
        alert("Please select a Report Type, Start Date, and End Date.");
        return;
    }

    const reportName = REPORT_NAMES[typeKey];

    currentStatusSpan.textContent = 'Generating ' + reportName + ' (' + format.toUpperCase() + ')...';
    currentStatusSpan.className = 'status-info';

    setTimeout(function() {
        const timestamp = new Date().toLocaleString();
        const logMessage = '[' + timestamp + '] ' + reportName + ' (' + format.toUpperCase() + ') generated. Filters: ' + (filter || 'None') + '.';

        currentStatusSpan.textContent = 'Completed: ' + reportName + ' ready for download.';
        currentStatusSpan.className = 'status-success';
        lastExportSpan.textContent = timestamp;

        const newLog = document.createElement('li');
        newLog.textContent = logMessage;
        logList.prepend(newLog);

        alert('Report generated successfully! Ready to download: ' + reportName + '.' + format);

    }, 1500);
}
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    var formatDate = function(date) {
        return date.toISOString().split('T')[0];
    };

    endDateInput.value = formatDate(today);
    startDateInput.value = formatDate(thirtyDaysAgo);

    document.querySelectorAll('.export-btn').forEach(function(button) {
        button.addEventListener('click', function(e) {
            var format = e.currentTarget.getAttribute('data-format');
            generateReport(format);
        });
    });
});