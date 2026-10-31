// Subjects page rendering module
import { demoSubjects } from '../../utils/demo-data.js';

export function renderSubjects() {
    return `
        <div class="section-card">
            <div class="section-header">
                <h3 class="section-title">Academic Subjects</h3>
                <button class="btn btn-primary">Add Subject</button>
            </div>
            <div class="section-body">
                <div class="class-list">
                    ${demoSubjects.map(subject => `
                        <div class="class-item">
                            <div class="class-info">
                                <div class="class-name">${subject.name} (${subject.code})</div>
                                <div class="class-time">${subject.credits} credits</div>
                            </div>
                            <div style="display: flex; gap: 8px;">
                                <button class="btn btn-outline" style="padding: 4px 12px; font-size: 12px;">Edit</button>
                                <button class="btn btn-outline" style="padding: 4px 12px; font-size: 12px;">Delete</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
