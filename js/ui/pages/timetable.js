// Class Timetable page rendering module
import { demoClasses } from '../../utils/demo-data.js';

export function renderTimetable() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    return `
        <div class="section-card">
            <div class="section-header">
                <h3 class="section-title">Weekly Class Schedule</h3>
                <button class="btn btn-primary">Add Class</button>
            </div>
            <div class="section-body">
                ${days.map(day => {
                    const dayClasses = demoClasses.filter(cls => cls.day === day);
                    return `
                        <div style="margin-bottom: 24px;">
                            <h4 style="font-size: 14px; font-weight: 600; color: var(--color-text-main); margin-bottom: 12px;">${day}</h4>
                            ${dayClasses.length > 0 ? `
                                <div class="class-list">
                                    ${dayClasses.map(cls => `
                                        <div class="class-item">
                                            <div class="class-info">
                                                <div class="class-name">${cls.subjectName}</div>
                                                <div class="class-time">${cls.startTime} - ${cls.endTime} • ${cls.location} • ${cls.type}</div>
                                            </div>
                                            <div style="display: flex; gap: 8px;">
                                                <button class="btn btn-outline" style="padding: 4px 12px; font-size: 12px;">Edit</button>
                                                <button class="btn btn-outline" style="padding: 4px 12px; font-size: 12px;">Delete</button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="empty-state" style="padding: 16px;">
                                    <p class="empty-state-text">No classes scheduled</p>
                                </div>
                            `}
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}
