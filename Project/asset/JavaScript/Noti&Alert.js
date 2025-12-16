let NOTIFICATIONS = [
    { id: 1, type: "match", message: "New Donor Match: O- group donor found 5km away.", date: "2025-12-16 10:30", read: false },
    { id: 2, type: "response", message: "Donor X45 confirmed availability for your B+ request.", date: "2025-12-15 14:00", read: false },
    { id: 3, type: "admin", message: "System Maintenance scheduled for Friday at 02:00 AM.", date: "2025-12-14 09:00", read: true },
    { id: 4, type: "emergency", message: "EMERGENCY: Urgent need for A- at City General Hospital.", date: "2025-12-13 18:45", read: true },
    { id: 5, type: "match", message: "A saved search matched a verified O+ donor in your area.", date: "2025-12-12 11:00", read: false }
];

const SYSTEM_ALERTS = [
    { id: 101, type: "emergency", message: "CRITICAL: New O- Emergency Request initiated. Donor alerts sent.", active: true },
    { id: 102, type: "low-donor", message: "WARNING: O+ donor pool in Dhaka is critically low (< 50 active).", active: true },
    { id: 103, type: "low-donor", message: "INFO: AB- donor pool recovered above threshold.", active: false }
];

const notificationList = document.getElementById('notificationList');
const unreadCountSpan = document.getElementById('unreadCount');
const tabsContainer = document.querySelector('.tabs');
const markAllReadBtn = document.getElementById('markAllReadBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const systemAlertsContainer = document.getElementById('systemAlertsContainer');

function renderNotifications() {
    NOTIFICATIONS.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });

    notificationList.innerHTML = '';
    NOTIFICATIONS.forEach(function(n) {
        var li = document.createElement('li');
        li.className = 'notification-item';
        if (!n.read) li.classList.add('unread');
        li.setAttribute('data-id', n.id);

        var typeSpan = document.createElement('span');
        typeSpan.className = 'notification-type type-' + n.type;
        typeSpan.textContent = n.type.toUpperCase() + ': ';
        li.appendChild(typeSpan);

        var msgSpan = document.createElement('span');
        msgSpan.textContent = n.message;
        li.appendChild(msgSpan);

        var dateSpan = document.createElement('span');
        dateSpan.style.float = 'right';
        dateSpan.style.color = '#6c757d';
        dateSpan.style.fontSize = '0.8em';
        dateSpan.textContent = n.date;
        li.appendChild(dateSpan);

        notificationList.appendChild(li);
    });

    var unreadCount = NOTIFICATIONS.filter(function(n) { return !n.read; }).length;
    unreadCountSpan.textContent = unreadCount;
}

function renderSystemAlerts() {
    var activeAlerts = SYSTEM_ALERTS.filter(function(a) { return a.active; });
    systemAlertsContainer.innerHTML = '';

    if (activeAlerts.length === 0) {
        var cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.style.textAlign = 'center';

        var p = document.createElement('p');
        p.style.color = '#28a745';
        p.textContent = 'No critical system alerts currently active.';
        cardDiv.appendChild(p);

        systemAlertsContainer.appendChild(cardDiv);
        return;
    }

    activeAlerts.forEach(function(a) {
        var div = document.createElement('div');
        div.className = 'system-alert alert-' + a.type;
        div.textContent = a.message;
        systemAlertsContainer.appendChild(div);
    });
}

function handleTabClick(e) {
    var button = e.target.closest('.tab-btn');
    if (!button) return;

    document.querySelectorAll('.tab-btn').forEach(function(btn) { btn.classList.remove('active'); });
    button.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(function(content) { content.classList.remove('active'); });
    var tabId = button.getAttribute('data-tab');
    var tabContent = document.getElementById(tabId);
    if (tabContent) tabContent.classList.add('active');
}

function handleNotificationClick(e) {
    var li = e.target.closest('.notification-item');
    if (!li) return;

    var id = parseInt(li.getAttribute('data-id'));
    var notification = NOTIFICATIONS.find(function(n) { return n.id === id; });
    if (!notification) return;

    if (!notification.read) {
        notification.read = true;
        renderNotifications();
        alert('Notification ID ' + id + ' marked as read. Message: ' + notification.message);
    } else {
        alert('Notification ID ' + id + ': ' + notification.message);
    }
}

function handleMarkAllRead() {
    NOTIFICATIONS.forEach(function(n) { n.read = true; });
    renderNotifications();
    alert('All notifications marked as read.');
}

function handleClearAll() {
    if (confirm('Are you sure you want to permanently delete all notifications?')) {
        NOTIFICATIONS = [];
        renderNotifications();
        alert('All notifications cleared.');
    }
}

function handleSaveSettings() {
    var emailEnabled = document.getElementById('emailToggle').checked;
    var smsEnabled = document.getElementById('smsToggle').checked;
    var quietHours = document.getElementById('quietHoursToggle').checked;

    alert('Settings saved! Email: ' + (emailEnabled ? 'Enabled' : 'Disabled') +
          ', SMS: ' + (smsEnabled ? 'Enabled' : 'Disabled') +
          ', Quiet Hours: ' + (quietHours ? 'Active' : 'Inactive') + '.');
}

function updateSystemInfo() {
    var lastAlertSpan = document.getElementById('lastEmergencyAlert');
    if (lastAlertSpan) lastAlertSpan.textContent = '2025-12-13 18:45';
}

document.addEventListener('DOMContentLoaded', function() {
    renderNotifications();
    renderSystemAlerts();
    updateSystemInfo();

    tabsContainer.addEventListener('click', handleTabClick);
    notificationList.addEventListener('click', handleNotificationClick);
    markAllReadBtn.addEventListener('click', handleMarkAllRead);
    clearAllBtn.addEventListener('click', handleClearAll);
    document.getElementById('saveSettingsBtn').addEventListener('click', handleSaveSettings);
});
