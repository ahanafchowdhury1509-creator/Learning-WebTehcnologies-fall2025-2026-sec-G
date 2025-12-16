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