// Academic Tasks page rendering module
import { demoTasks } from '../../utils/demo-data.js';

export function renderTasks() {
    return `
        <div class="section-card">
            <div class="section-header">
                <h3 class="section-title">Academic Tasks</h3>
                <button class="btn btn-primary">Add Task</button>
            </div>
            <div class="section-body">
                <div class="task-list">
                    ${demoTasks.map(task => `
                        <div class="task-item">
                            <div class="task-info">
                                <div class="task-title">${task.title}</div>
                                <div class="task-meta">${task.subjectName} • ${task.type} • Due: ${task.dueDate} at ${task.dueTime} • ${task.estimatedHours}h</div>
                            </div>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
                                <span class="badge badge-secondary">${task.status}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
