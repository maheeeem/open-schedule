// Dashboard page rendering module
import { demoUser, demoWorkloadSummary, demoTasks, demoClasses, demoStudySessions } from '../../utils/demo-data.js';

export function renderDashboard() {
    const unfinishedTasks = demoTasks.filter(task => task.status !== 'Completed');
    const highPriorityTasks = unfinishedTasks.filter(task => task.priority === 'High').slice(0, 5);
    const upcomingDeadlines = unfinishedTasks
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);
    
    const todayClasses = demoClasses; // In a real app, filter by today's day
    const todaySessions = demoStudySessions; // In a real app, filter by today's date

    return `
        <div class="dashboard-stats">
            <div class="stat-card">
                <div class="stat-label">Total Unfinished Workload</div>
                <div class="stat-value">${demoWorkloadSummary.totalUnfinishedHours}h</div>
                <div class="stat-subtext">${unfinishedTasks.length} tasks remaining</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Available Study Hours</div>
                <div class="stat-value">${demoUser.totalWeeklyHours}h</div>
                <div class="stat-subtext">per week</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Workload Gap</div>
                <div class="stat-value">${demoWorkloadSummary.shortfall > 0 ? '-' + demoWorkloadSummary.shortfall + 'h' : '+' + Math.abs(demoWorkloadSummary.shortfall) + 'h'}</div>
                <div class="stat-subtext ${demoWorkloadSummary.shortfall > 0 ? 'warning' : 'success'}">
                    ${demoWorkloadSummary.shortfall > 0 ? 'Shortfall' : 'Remaining capacity'}
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Unfinished Tasks</div>
                <div class="stat-value">${unfinishedTasks.length}</div>
                <div class="stat-subtext">across all subjects</div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="section-card">
                <div class="section-header">
                    <h3 class="section-title">Highest Priority Tasks</h3>
                </div>
                <div class="section-body">
                    ${highPriorityTasks.length > 0 ? renderTaskList(highPriorityTasks) : renderEmptyState('No high priority tasks')}
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <h3 class="section-title">Upcoming Deadlines</h3>
                </div>
                <div class="section-body">
                    ${upcomingDeadlines.length > 0 ? renderDeadlineList(upcomingDeadlines) : renderEmptyState('No upcoming deadlines')}
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <h3 class="section-title">Today's Classes</h3>
                </div>
                <div class="section-body">
                    ${todayClasses.length > 0 ? renderClassList(todayClasses) : renderEmptyState('No classes today')}
                </div>
            </div>

            <div class="section-card">
                <div class="section-header">
                    <h3 class="section-title">Planned Study Sessions</h3>
                </div>
                <div class="section-body">
                    ${todaySessions.length > 0 ? renderSessionList(todaySessions) : renderEmptyState('No study sessions planned')}
                </div>
            </div>
        </div>
    `;
}

function renderTaskList(tasks) {
    return `
        <div class="task-list">
            ${tasks.map(task => `
                <div class="task-item">
                    <div class="task-info">
                        <div class="task-title">${task.title}</div>
                        <div class="task-meta">${task.subjectName} • ${task.type} • Due: ${task.dueDate}</div>
                    </div>
                    <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderDeadlineList(tasks) {
    return `
        <div class="task-list">
            ${tasks.map(task => `
                <div class="task-item">
                    <div class="task-info">
                        <div class="task-title">${task.title}</div>
                        <div class="task-meta">${task.subjectName} • ${task.type} • ${task.estimatedHours}h estimated</div>
                    </div>
                    <span class="task-priority ${task.priority.toLowerCase()}">${task.dueDate}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderClassList(classes) {
    return `
        <div class="class-list">
            ${classes.map(cls => `
                <div class="class-item">
                    <div class="class-info">
                        <div class="class-name">${cls.subjectName}</div>
                        <div class="class-time">${cls.day} • ${cls.startTime} - ${cls.endTime} • ${cls.location}</div>
                    </div>
                    <span class="badge badge-secondary">${cls.type}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderSessionList(sessions) {
    return `
        <div class="session-list">
            ${sessions.map(session => `
                <div class="session-item">
                    <div class="session-info">
                        <div class="session-task">${session.taskTitle}</div>
                        <div class="session-time">${session.date} • ${session.time} • ${session.duration}h • ${session.location}</div>
                    </div>
                    <span class="badge badge-primary">${session.status}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderEmptyState(message) {
    return `
        <div class="empty-state">
            <svg class="empty-state-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p class="empty-state-text">${message}</p>
        </div>
    `;
}
