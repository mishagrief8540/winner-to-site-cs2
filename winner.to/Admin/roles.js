// Roles Management System

const ROLES = {
    'moderator': {
        id: 1,
        name: 'Модератор',
        level: 1,
        color: '#3498db',
        permissions: {
            chat_ban: true,
            mute: true,
            kick: true,
            temp_ban: true,
            view_logs: true,
            warn_users: true,
            edit_users: false,
            manage_payments: false,
            manage_servers: false,
            manage_staff: false,
            access_admin_panel: true,
            edit_settings: false
        }
    },
    'senior_moderator': {
        id: 2,
        name: 'Старший Модератор',
        level: 2,
        color: '#9b59b6',
        permissions: {
            chat_ban: true,
            mute: true,
            kick: true,
            temp_ban: true,
            perma_ban: true,
            view_logs: true,
            warn_users: true,
            edit_users: true,
            manage_payments: false,
            manage_servers: false,
            manage_staff: false,
            access_admin_panel: true,
            edit_settings: false
        }
    },
    'senior_admin': {
        id: 3,
        name: 'Старший Администратор',
        level: 3,
        color: '#e74c3c',
        permissions: {
            chat_ban: true,
            mute: true,
            kick: true,
            temp_ban: true,
            perma_ban: true,
            view_logs: true,
            warn_users: true,
            edit_users: true,
            manage_payments: true,
            manage_servers: true,
            manage_staff: false,
            access_admin_panel: true,
            edit_settings: false
        }
    },
    'curator': {
        id: 4,
        name: 'Куратор',
        level: 4,
        color: '#f39c12',
        permissions: {
            chat_ban: true,
            mute: true,
            kick: true,
            temp_ban: true,
            perma_ban: true,
            view_logs: true,
            warn_users: true,
            edit_users: true,
            manage_payments: true,
            manage_servers: true,
            manage_staff: true,
            access_admin_panel: true,
            edit_settings: false
        }
    },
    'chief_admin': {
        id: 5,
        name: 'Главный Администратор',
        level: 5,
        color: '#d35400',
        permissions: {
            chat_ban: true,
            mute: true,
            kick: true,
            temp_ban: true,
            perma_ban: true,
            view_logs: true,
            warn_users: true,
            edit_users: true,
            manage_payments: true,
            manage_servers: true,
            manage_staff: true,
            access_admin_panel: true,
            edit_settings: true
        }
    },
    'developer': {
        id: 6,
        name: 'Разработчик',
        level: 6,
        color: '#2ecc71',
        permissions: {
            chat_ban: true,
            mute: true,
            kick: true,
            temp_ban: true,
            perma_ban: true,
            view_logs: true,
            warn_users: true,
            edit_users: true,
            manage_payments: true,
            manage_servers: true,
            manage_staff: true,
            access_admin_panel: true,
            edit_settings: true,
            technical_access: true,
            database_access: true,
            api_access: true
        }
    },
    'owner': {
        id: 7,
        name: 'Разработчик-Владелец',
        level: 7,
        color: '#c0392b',
        permissions: {
            all: true
        }
    }
};

class RoleManager {
    constructor() {
        this.currentUserRole = null;
        this.staffMembers = [];
        this.initialize();
    }
    
    initialize() {
        // Load current user role from localStorage or API
        const savedRole = localStorage.getItem('admin_role');
        this.currentUserRole = savedRole ? ROLES[savedRole] : ROLES.owner;
        
        // Load staff members
        this.loadStaffMembers();
        
        // Set up role-based UI
        this.setupRoleBasedUI();
    }
    
    loadStaffMembers() {
        // In real app, this would be an API call
        this.staffMembers = [
            { id: 1, name: 'Владелец', role: 'owner', status: 'online', join_date: '2023-01-01' },
            { id: 2, name: 'Технический специалист', role: 'developer', status: 'online', join_date: '2023-02-15' },
            { id: 3, name: 'Алексей Петров', role: 'chief_admin', status: 'online', join_date: '2023-03-10' },
            { id: 4, name: 'Мария Сидорова', role: 'curator', status: 'away', join_date: '2023-04-05' },
            { id: 5, name: 'Дмитрий Иванов', role: 'curator', status: 'offline', join_date: '2023-04-12' },
            { id: 6, name: 'Иван Смирнов', role: 'senior_admin', status: 'online', join_date: '2023-05-20' },
            { id: 7, name: 'Сергей Кузнецов', role: 'senior_admin', status: 'online', join_date: '2023-06-08' },
            { id: 8, name: 'Ольга Морозова', role: 'senior_admin', status: 'online', join_date: '2023-06-15' },
            { id: 9, name: 'Анна Волкова', role: 'senior_moderator', status: 'online', join_date: '2023-07-01' },
            { id: 10, name: 'Павел Новиков', role: 'senior_moderator', status: 'away', join_date: '2023-07-10' }
        ];
    }
    
    setupRoleBasedUI() {
        // Update UI based on current user role
        this.updateRoleBadges();
        this.setupPermissions();
        this.populateStaffList();
    }
    
    updateRoleBadges() {
        // Update role badge in header
        const roleBadges = document.querySelectorAll('.role-badge, .user-role-badge');
        roleBadges.forEach(badge => {
            if (badge.classList.contains('user-role-badge')) {
                badge.textContent = this.currentUserRole.name;
                badge.style.backgroundColor = this.currentUserRole.color;
            }
        });
    }
    
    setupPermissions() {
        // Hide/show elements based on permissions
        const userLevel = this.currentUserRole.level;
        
        // Elements that require specific levels
        const highLevelElements = document.querySelectorAll('[data-min-level="5"]');
        const midLevelElements = document.querySelectorAll('[data-min-level="3"]');
        
        // Check permissions
        if (userLevel < 5) {
            highLevelElements.forEach(el => el.style.display = 'none');
        }
        
        if (userLevel < 3) {
            midLevelElements.forEach(el => el.style.display = 'none');
        }
        
        // Disable buttons without permission
        this.disableUnauthorizedActions();
    }
    
    disableUnauthorizedActions() {
        const actions = {
            '.promote-btn': 'manage_staff',
            '.delete-user-btn': 'edit_users',
            '.edit-settings-btn': 'edit_settings',
            '.restart-server-btn': 'manage_servers'
        };
        
        for (const [selector, permission] of Object.entries(actions)) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!this.hasPermission(permission)) {
                    element.disabled = true;
                    element.style.opacity = '0.5';
                    element.style.cursor = 'not-allowed';
                    element.title = 'Недостаточно прав';
                }
            });
        }
    }
    
    hasPermission(permission) {
        if (this.currentUserRole.permissions.all) return true;
        return this.currentUserRole.permissions[permission] || false;
    }
    
    populateStaffList() {
        const container = document.getElementById('staffListContainer');
        if (!container) return;
        
        container.innerHTML = this.staffMembers.map(member => `
            <div class="staff-item">
                <div class="staff-avatar" style="background-color: ${ROLES[member.role].color}">
                    ${member.name.charAt(0)}
                </div>
                <div class="staff-info">
                    <div class="staff-name">${member.name}</div>
                    <div class="staff-role">
                        <span class="role-badge role-${member.role}">${ROLES[member.role].name}</span>
                    </div>
                    <div class="staff-status">
                        <span class="status-${member.status}">${this.getStatusText(member.status)}</span>
                        • В команде с ${member.join_date}
                    </div>
                </div>
                <div class="staff-actions">
                    <button class="action-btn edit" onclick="roleManager.editStaff(${member.id})" 
                            ${!this.hasPermission('manage_staff') ? 'disabled' : ''}>
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn promote" onclick="roleManager.promoteStaff(${member.id})"
                            ${!this.hasPermission('manage_staff') ? 'disabled' : ''}>
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    ${member.role !== 'owner' ? `
                    <button class="action-btn delete" onclick="roleManager.removeStaff(${member.id})"
                            ${!this.hasPermission('manage_staff') || member.level >= this.currentUserRole.level ? 'disabled' : ''}>
                        <i class="fas fa-trash"></i>
                    </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
    
    getStatusText(status) {
        const statusMap = {
            'online': 'В сети',
            'away': 'Отошёл',
            'offline': 'Не в сети',
            'busy': 'Занят'
        };
        return statusMap[status] || status;
    }
    
    getRoleHierarchy() {
        return Object.values(ROLES).sort((a, b) => b.level - a.level);
    }
    
    getNextRole(currentRole) {
        const roles = this.getRoleHierarchy();
        const currentIndex = roles.findIndex(r => r.id === currentRole.id);
        return currentIndex > 0 ? roles[currentIndex - 1] : null;
    }
    
    getPreviousRole(currentRole) {
        const roles = this.getRoleHierarchy();
        const currentIndex = roles.findIndex(r => r.id === currentRole.id);
        return currentIndex < roles.length - 1 ? roles[currentIndex + 1] : null;
    }
    
    // Staff management methods
    editStaff(staffId) {
        const staff = this.staffMembers.find(m => m.id === staffId);
        if (!staff) return;
        
        const newName = prompt('Введите новое имя:', staff.name);
        if (newName && newName !== staff.name) {
            staff.name = newName;
            this.populateStaffList();
            this.logAction(`Изменено имя сотрудника ${staffId} на "${newName}"`);
        }
    }
    
    promoteStaff(staffId) {
        const staff = this.staffMembers.find(m => m.id === staffId);
        if (!staff) return;
        
        const currentRole = ROLES[staff.role];
        const nextRole = this.getNextRole(currentRole);
        
        if (!nextRole) {
            alert('Это максимальная должность');
            return;
        }
        
        if (confirm(`Повысить ${staff.name} с ${currentRole.name} до ${nextRole.name}?`)) {
            // Find role key by name
            const newRoleKey = Object.keys(ROLES).find(key => ROLES[key].id === nextRole.id);
            staff.role = newRoleKey;
            this.populateStaffList();
            this.logAction(`Повышен сотрудник ${staff.name} до ${nextRole.name}`);
        }
    }
    
    removeStaff(staffId) {
        const staff = this.staffMembers.find(m => m.id === staffId);
        if (!staff) return;
        
       