
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const secondaryMenu = document.getElementById('secondary-menu');
    const toggleSecondaryBtn = secondaryMenu.querySelector('.toggle-secondary-btn');
    const toggleIcon = document.getElementById('toggle-icon');
    const mainMenuItems = document.querySelectorAll('.sidebar-item');
    const secondaryMenuList = document.getElementById('secondary-menu-list');
    const secondaryMenuTitle = document.getElementById('secondary-menu-title');
    const themeSwitcher = document.querySelector('.theme-switcher');
    const html = document.documentElement;
    const searchIconBtn = secondaryMenuList.querySelector('.search-icon-btn');
    const secondaryMenuSearch = document.querySelector('.secondary-menu-search');

    let currentOpenMenu = null;
    let isSecondaryMenuExpanded = false;

    const menuData = {
        dashboard: {
            title: "Dashboard",
            items: [
                { type: "heading", label: "Dashboard Types" },
                { label: "Overview", icon: "bxs-dashboard" },
                { label: "Executive Summary", icon: "bx-receipt", children: ["Project Timeline", "Resource Allocation", "Team Performance"] },
                { label: "Operations Dashboard", icon: "bx-bar-chart-square", children: ["Project Timeline", "Resource Allocation", "Team Performance"] },
                { label: "Financial Dashboard", icon: "bx-trending-up", children: ["Budget vs Actual", "Cash Flow Analysis", "Profit & Loss Summary"] },
                { type: "heading", label: "Report Summaries" },
                { label: "Weekly Reports", icon: "bx-list-ul", children: ["Team Productivity: 87%", "Project Completion: 12/15", "Budget Utilization: 75%"] },
                { label: "Monthly Insights", icon: "bx-calendar", children: ["Revenue Growth: +15.3%", "New Clients: 24", "Team Expansion: 8 hires"] },
                { label: "Quarterly Analysis", icon: "bx-stats", children: ["ROI: 23.4%", "Customer Retention: 92%", "Innovation Index: 8.7/10"] },
                { type: "heading", label: "Business Intelligence" },
                { label: "Performance Metrics", icon: "bx-rocket", children: ["Sales Conversion: 34.2%", "Lead Response Time: 2.3h", "Customer Lifetime Value..."] },
                { label: "Predictive Analytics", icon: "bx-line-chart", children: ["Q4 Revenue Forecast: $2...", "Resource Demand: High", "Market Trends: Positive"] }
            ]
        },
        tasks: {
            title: "Tasks",
            items: [
                { type: "heading", label: "Quick Actions" },
                { label: "New task", icon: "bx-plus" },
                { label: "Filter tasks", icon: "bx-filter" },
                { type: "heading", label: "My Tasks" },
                { label: "Due today", icon: "bx-time-five", children: ["Review design mockups", "Update documentation"] },
                { label: "In progress", icon: "bx-loader-circle", children: ["Implement user auth", "Database migration"] },
                { label: "Completed", icon: "bx-check-circle", children: ["Fixed login bug", "Updated dependencies"] },
                { type: "heading", label: "Other" },
                { label: "Priority tasks", icon: "bxs-star", children: ["High Priority Task A", "High Priority Task B"] },
                { label: "Archived", icon: "bx-archive", children: ["Archived Task 1", "Archived Task 2"] }
            ]
        },
        settings: {
            title: "Settings",
            items: [
                { type: "heading", label: "General" },
                { label: "My Account", icon: "bx-user" },
                { label: "Security", icon: "bx-lock" },
                { type: "heading", label: "Preferences" },
                { label: "Appearance", icon: "bx-palette" },
                { label: "Notifications", icon: "bx-bell" },
                { type: "heading", label: "Other" },
                { label: "Integrations", icon: "bx-link" },
                { label: "Help & Support", icon: "bx-help-circle" }
            ]
        },
        profile: {
            title: "Profile",
            items: [
                { type: "heading", label: "Profile" },
                { label: "My Profile", icon: "bx-user-circle" },
                { label: "Edit Profile", icon: "bx-cog" }
            ]
        }
    };

    const expandSecondaryMenu = () => {
        secondaryMenu.classList.add('expanded');
        secondaryMenu.classList.remove('visible');
        toggleIcon.classList.remove('bx-chevron-right');
        toggleIcon.classList.add('bx-chevron-left');
        secondaryMenuTitle.style.display = 'block';
        secondaryMenuSearch.style.display = 'flex';
        secondaryMenuList.style.display = 'flex';
        isSecondaryMenuExpanded = true;
    };

    const collapseSecondaryMenu = () => {
        secondaryMenu.classList.remove('expanded');
        secondaryMenu.classList.add('visible');
        toggleIcon.classList.remove('bx-chevron-left');
        toggleIcon.classList.add('bx-chevron-right');
        secondaryMenuTitle.style.display = 'none';
        secondaryMenuSearch.style.display = 'flex';
        isSecondaryMenuExpanded = false;
        document.querySelectorAll('.secondary-menu-item.has-children').forEach(item => {
            item.classList.remove('open');
        });
    };


    const showSecondaryMenu = (menuId) => {
        secondaryMenuList.innerHTML = '';
        const menu = menuData[menuId];
        secondaryMenuTitle.textContent = menu.title;

        secondaryMenuSearch.style.display = 'flex';
        secondaryMenuList.style.display = 'flex';
        secondaryMenuTitle.style.display = 'block';

        menu.items.forEach(item => {
            const listItem = document.createElement('li');

            if (item.type === 'heading') {
                listItem.className = 'secondary-menu-heading';
                listItem.textContent = item.label;
            } else {
                listItem.className = 'secondary-menu-item';
                if (item.children) {
                    listItem.classList.add('has-children');
                }
                let itemContent = `<div class="secondary-menu-item-main">
                                        <span class="secondary-menu-item-icon"><i class='bx ${item.icon}'></i></span>
                                        <div class="secondary-menu-item-content">
                                            <span class="secondary-menu-item-label">${item.label}</span>
                                        </div>`;
                if (item.children) {
                    itemContent += `<span class="toggle-caret"><i class='bx bx-chevron-down'></i></span>`;
                } else {
                    itemContent += `<span class="item-spacer"></span>`;
                }
                itemContent += `</div>`;
                listItem.innerHTML = itemContent;

                if (item.children) {
                    const dropdownList = document.createElement('ul');
                    dropdownList.className = 'dropdown-list';
                    item.children.forEach(child => {
                        const dropdownItem = document.createElement('li');
                        dropdownItem.className = 'dropdown-item';
                        dropdownItem.textContent = child;
                        dropdownList.appendChild(dropdownItem);
                    });
                    listItem.appendChild(dropdownList);

                    listItem.querySelector('.toggle-caret').addEventListener('click', (event) => {
                        event.stopPropagation();
                        listItem.classList.toggle('open');
                    });
                }
            }
            secondaryMenuList.appendChild(listItem);
        });

        if (!secondaryMenu.classList.contains('visible') && !secondaryMenu.classList.contains('expanded')) {
            secondaryMenu.classList.add('visible');
            toggleIcon.classList.remove('bx-chevron-left');
            toggleIcon.classList.add('bx-chevron-right');
            isSecondaryMenuExpanded = false;
        }
    };

    toggleSecondaryBtn.addEventListener('click', () => {
        if (isSecondaryMenuExpanded) {
            collapseSecondaryMenu();
        } else {
            expandSecondaryMenu();
        }
    });

    mainMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            mainMenuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            showSecondaryMenu(item.dataset.menu);
        });
    });
    themeSwitcher.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        if (currentTheme === "dark") {
            html.removeAttribute('data-theme');
            themeSwitcher.classList.remove('dark');
        } else {
            html.setAttribute('data-theme', 'dark');
            themeSwitcher.classList.add('dark');
        }
    });

    secondaryMenuSearch.style.display = 'none';
});