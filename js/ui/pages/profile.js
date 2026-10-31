// Profile & Settings page rendering module
import { demoUser } from '../../utils/demo-data.js';

export function renderProfile() {
    return `
        <div class="section-card" style="margin-bottom: 24px;">
            <div class="section-header">
                <h3 class="section-title">Profile Information</h3>
                <button class="btn btn-primary">Edit Profile</button>
            </div>
            <div class="section-body">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
                    <div>
                        <label class="form-label">Name</label>
                        <div style="padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 6px; background-color: var(--color-background);">
                            ${demoUser.name}
                        </div>
                    </div>
                    <div>
                        <label class="form-label">Email</label>
                        <div style="padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 6px; background-color: var(--color-background);">
                            ${demoUser.email}
                        </div>
                    </div>
                    <div>
                        <label class="form-label">University</label>
                        <div style="padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 6px; background-color: var(--color-background);">
                            ${demoUser.university}
                        </div>
                    </div>
                    <div>
                        <label class="form-label">Program</label>
                        <div style="padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 6px; background-color: var(--color-background);">
                            ${demoUser.program}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section-card">
            <div class="section-header">
                <h3 class="section-title">Study Hours Configuration</h3>
                <button class="btn btn-primary">Update Hours</button>
            </div>
            <div class="section-body">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">
                    ${Object.entries(demoUser.studyHours).map(([day, hours]) => `
                        <div>
                            <label class="form-label" style="text-transform: capitalize;">${day}</label>
                            <div style="padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 6px; background-color: var(--color-background);">
                                ${hours} hours
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--color-border);">
                    <label class="form-label">Total Weekly Hours</label>
                    <div style="padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 6px; background-color: var(--color-background); font-weight: 600;">
                        ${demoUser.totalWeeklyHours} hours
                    </div>
                </div>
            </div>
        </div>
    `;
}
