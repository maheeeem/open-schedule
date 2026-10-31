// Study Sessions page rendering module
import { demoStudySessions } from '../../utils/demo-data.js';

export function renderStudySessions() {
    return `
        <div class="section-card">
            <div class="section-header">
                <h3 class="section-title">Study Sessions</h3>
                <button class="btn btn-primary">Schedule Session</button>
            </div>
            <div class="section-body">
                <div class="session-list">
                    ${demoStudySessions.map(session => `
                        <div class="session-item">
                            <div class="session-info">
                                <div class="session-task">${session.taskTitle}</div>
                                <div class="session-time">${session.date} at ${session.time} • ${session.duration} hours • ${session.location}</div>
                            </div>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <span class="badge badge-primary">${session.status}</span>
                                <button class="btn btn-outline" style="padding: 4px 12px; font-size: 12px;">Edit</button>
                                <button class="btn btn-outline" style="padding: 4px 12px; font-size: 12px;">Cancel</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
