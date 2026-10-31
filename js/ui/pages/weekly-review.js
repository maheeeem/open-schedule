// Weekly Review page rendering module
import { demoWorkloadSummary } from '../../utils/demo-data.js';

export function renderWeeklyReview() {
    return `
        <div class="section-card" style="margin-bottom: 24px;">
            <div class="section-header">
                <h3 class="section-title">Weekly Workload Summary</h3>
            </div>
            <div class="section-body">
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-label">Total Workload</div>
                        <div class="stat-value">${demoWorkloadSummary.totalUnfinishedHours}h</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Available Hours</div>
                        <div class="stat-value">${demoWorkloadSummary.availableWeeklyHours}h</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Overloaded Days</div>
                        <div class="stat-value">${demoWorkloadSummary.weeklyBreakdown.filter(d => d.overloaded).length}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section-card">
            <div class="section-header">
                <h3 class="section-title">Daily Breakdown</h3>
            </div>
            <div class="section-body">
                <div class="class-list">
                    ${demoWorkloadSummary.weeklyBreakdown.map(day => `
                        <div class="class-item">
                            <div class="class-info">
                                <div class="class-name">${day.day}</div>
                                <div class="class-time">Workload: ${day.workload}h / Available: ${day.available}h</div>
                            </div>
                            <span class="badge ${day.overloaded ? 'badge-primary' : 'badge-secondary'}" style="${day.overloaded ? 'background-color: #FEE2E2; color: #DC2626;' : ''}">
                                ${day.overloaded ? 'Overloaded' : 'Balanced'}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
