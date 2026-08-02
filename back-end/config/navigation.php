<?php

return [
    'navigation' => [
        [
            'key' => 'nav',
            'label' => 'MENU',
            'isTitle' => true,
            'collapsed' => true,
        ],
        [
            'key' => 'dashboard',
            'label' => 'Dashboard',
            'icon' => 'home',
            'collapsed' => true,
            'children' => [
                [
                    'key' => 'dashboard-crm',
                    'label' => 'Attendence',
                    'url' => '/index',
                    'parentKey' => 'dashboard',
                ],
                [
                    'key' => 'dashboard-analytics',
                    'label' => 'Leaves',
                    'url' => '/analytics',
                    'parentKey' => 'dashboard',
                ],
                [
                    'key' => 'dashboard-hr',
                    'label' => 'HR',
                    'url' => '/hr_dashboard',
                    'parentKey' => 'dashboard',
                ],
                [
                    'key' => 'dashboard-task',
                    'label' => 'Tasks',
                    'url' => '/task_dashboard',
                    'parentKey' => 'dashboard',
                ],
                [
                    'key' => 'dashboard-iou',
                    'label' => 'IOU',
                    'url' => '/iou_dashboard',
                    'parentKey' => 'dashboard',
                ]
            ]
        ],
        [
            'key' => 'general',
            'label' => 'General',
            'isTitle' => true,
            'collapsed' => true,
        ],
        [
            'key' => 'my_account',
            'label' => 'My Account',
            'icon' => 'user',
            'collapsed' => true,
            'children' => [
                [
                    'key' => 'profile',
                    'label' => 'Profile',
                    'url' => '/profile',
                    'parentKey' => 'my_account',
                ],
                [
                    'key' => 'in_out',
                    'label' => 'In / Out',
                    'url' => '/in-out',
                    'parentKey' => 'my_account',
                ],
                [
                    'key' => 'profile_leave',
                    'label' => 'Leaves',
                    'url' => '/profile-leave',
                    'parentKey' => 'my_account',
                ],
                [
                    'key' => 'payslips',
                    'label' => 'Payslips',
                    'url' => '/payslips',
                    'parentKey' => 'my_account'
                ],
                [
                    'key' => 'company_hierarchy',
                    'label' => 'Company Hierarchy',
                    'url' => '/company-hierarchy',
                    'parentKey' => 'my_account'
                ],
                [
                    'key' => 'approvals',
                    'label' => 'Approvals',
                    'url' => '/approvals',
                    'parentKey' => 'my_account',
                ],
                [
                    'key' => 'my-owned-assets',
                    'label' => 'My Assets',
                    'url' => '/my-owned-assets',
                    'parentKey' => 'my_account',
                ],
                [
                    'key' => 'team_activity',
                    'label' => 'Team Activity',
                    'url' => '/team_activity',
                    'parentKey' => 'my_account',
                ],
                [
                    'key' => 'my_customers',
                    'label' => 'Customers',
                    'url' => '/my-customers',
                    'parentKey' => 'my_account'
                ],
                [
                    'key' => 'my_account_task',
                    'label' => 'General Task',
                    'url' => '/my-task',
                    'parentKey' => 'my_account'
                ],
                [
                    'key' => 'my_field_task',
                    'label' => 'Field Task',
                    'url' => '/my-field-task',
                    'parentKey' => 'my_account'
                ],
                [
                    'key' => 'my_maintenance_task',
                    'label' => 'Maintenance Tasks',
                    'url' => '/my-maintenance-task',
                    'parentKey' => 'my_account'
                ],
                [
                    'key' => 'my_crm_task',
                    'label' => 'Crm Task',
                    'url' => '/my-crm-task',
                    'parentKey' => 'my_account'
                ],
                [
                    'key' => 'my_loan_request',
                    'label' => 'My Loan Requests',
                    'url' => '/my-loan-request',
                    'parentKey' => 'my_account'
                ],
                [
                    'key' => 'my_advance_request',
                    'label' => 'My Advance Requests',
                    'url' => '/my-advance-request',
                    'parentKey' => 'my_account'
                ],
                [
                    'key' => 'my_iou_request',
                    'label' => 'My IOU Requests',
                    'url' => '/my-iou-request',
                    'parentKey' => 'my_account'
                ],
            ],
        ],
        [
            'key' => 'attendance',
            'label' => 'Attendance',
            'icon' => 'clock',
            'collapsed' => true,
            'children' => [
                [
                    'key' => 'day_attendence',
                    'label' => 'Day Attendance',
                    'url' => '/day-attendence',
                    'parentKey' => 'attendance',
                ],
                [
                    'key' => 'shifts',
                    'label' => 'Shift',
                    'url' => '/shifts',
                    'parentKey' => 'attendance',
                ],
                [
                    'key' => 'shift_schedule',
                    'label' => 'Shift Schedule',
                    'url' => '/shift-schedule',
                    'parentKey' => 'attendance',
                ],
                [
                    'key' => 'attendance_history',
                    'label' => 'Attendance History',
                    'url' => '/attendance-history',
                    'parentKey' => 'attendance',
                ],
                [
                    'key' => 'attendance_summary',
                    'label' => 'Attendance Summary',
                    'url' => '/attendance-summary',
                    'parentKey' => 'attendance',
                ],
                [
                    'key' => 'attendance_live_location',
                    'label' => 'Attendance Live Location',
                    'url' => '/attendance-live-location',
                    'parentKey' => 'attendance',
                ],
            ]
        ],
        [
            'key' => 'mainleave',
            'label' => 'Leave',
            'icon' => 'calendar',
            'collapsed' => true,
            'children' => [
                [
                    'key' => 'leaves',
                    'label' => 'Leaves',
                    'url' => '/leaves',
                    'parentKey' => 'mainleave',
                ],
                [
                    'key' => 'leave_type',
                    'label' => 'Leave Types',
                    'url' => '/leave_types',
                    'parentKey' => 'mainleave',
                ],
                [
                    'key' => 'leave_group',
                    'label' => 'Leave Groups',
                    'url' => '/leave_groups',
                    'parentKey' => 'mainleave',
                ],
                [
                    'key' => 'leave_adjustment',
                    'label' => 'Leave Adjustment',
                    'url' => '/leave_adjustment',
                    'parentKey' => 'mainleave',
                ],
                [
                    'key' => 'leave_report',
                    'label' => 'Leave Report',
                    'url' => '/leave_report',
                    'parentKey' => 'mainleave',
                ],
                [
                    'key' => 'leave_summary',
                    'label' => 'Leave Summary',
                    'url' => '/leave-summary',
                    'parentKey' => 'mainleave',
                ]
            ]
        ],
        [
            'key' => 'task_module',
            'label' => 'Task Module',
            'icon' => 'clipboard',
            'collapsed' => true,
            'children' => [
                [
                    'key' => 'request_status',
                    'label' => 'Task Status',
                    'url' => '/request-status',
                    'parentKey' => 'task_module'
                ],
                [
                    'key' => 'main_task',
                    'label' => 'General Task',
                    'url' => '/main-task',
                    'parentKey' => 'task_module'
                ],
                [
                    'key' => 'field_task',
                    'label' => 'Field Task',
                    'url' => '/field-task',
                    'parentKey' => 'task_module'
                ],
                [
                    'key' => 'maintenance_task',
                    'label' => 'Maintenance Tasks',
                    'url' => '/maintenance-task',
                    'parentKey' => 'task_module'
                ],
                [
                  'key' => 'crm_task',
                  'label' => 'Crm Task',
                  'url' => '/crm-task',
                  'parentKey' => 'task_module'
                ],
                [
                  'key' => 'crm_pipeline_stage',
                  'label' => 'Crm Pipeline Stage',
                  'url' => '/crm-pipeline-stage',
                  'parentKey' => 'task_module'
                ]
            ],
        ],
        [
            'key' => 'iou_module',
            'label' => 'IOU Module',
            'icon' => 'pocket',
            'collapsed' => true,
            'children' => [
                [
                    'key' => 'iou_request',
                    'label' => 'IOU Request',
                    'url' => '/iou-request',
                    'parentKey' => 'iou_module'
                ],
                [
                    'key' => 'iou_type',
                    'label' => 'IOU Type',
                    'url' => '/iou-type',
                    'parentKey' => 'iou_module'
                ],
                [
                    'key' => 'iou_expense_type',
                    'label' => 'IOU Expense Type',
                    'url' => '/iou-expense-type',
                    'parentKey' => 'iou_module'
                ],
                [
                    'key' => 'iou_employee_report',
                    'label' => 'IOU Employee Report',
                    'url' => '/iou-employee-report',
                    'parentKey' => 'iou_module'
                ],
                [
                  'key' => 'iou_outstanding',
                  'label' => 'IOU Outstanding',
                  'url' => '/iou-outstanding',
                  'parentKey' => 'iou_module'
                ]
            ],
        ],
        [
            'key' => 'asset_module',
            'label' => 'Asset Module',
            'icon' => 'package',
            'collapsed' => true,
            'children' => [
                [
                    'key' => 'assets',
                    'label' => 'Assets',
                    'url' => '/asset',
                    'parentKey' => 'asset_module',
                ],
                [
                    'key' => 'rental',
                    'label' => 'Rental',
                    'url' => '/rental',
                    'parentKey' => 'asset_module',
                ],
                [
                    'key' => 'asset_allocation',
                    'label' => 'Asset Allocation',
                    'url' => '/asset_allocation',
                    'parentKey' => 'asset_module',
                ],
                [
                    'key' => 'asset_maintenance',
                    'label' => 'Asset Maintenance',
                    'url' => '/asset_maintenance',
                    'parentKey' => 'asset_module',
                ],
                [
                    'key' => 'asset_income',
                    'label' => 'Asset Income',
                    'url' => '/asset-income',
                    'parentKey' => 'asset_module',
                ],
                  [
                    'key' => 'asset_expense',
                    'label' => 'Asset Expense',
                    'url' => '/asset-expense',
                    'parentKey' => 'asset_module',
                ],
                [
                    'key' => 'expense-type',
                    'label' => 'Expense Type',
                    'url' => '/expense-type',
                    'parentKey' => 'asset_module',
                ],
                [
                    'key' => 'income_type',
                    'label' => 'Income Type',
                    'url' => '/income-type',
                    'parentKey' => 'asset_module',
                ]
            ]
        ],
        [
            'key' => 'invoice_bill',
            'label' => 'Invoice/Bill',
            'icon' => 'credit-card',
            'collapsed' => true,
            'children' => [
                [
                    'key' => 'invoice',
                    'label' => 'Create Invoice',
                    'url' => '/invoice',
                    'parentKey' => 'invoice_bill',
                ],
                [
                    'key' => 'create_purchase',
                    'label' => 'Create Purchase',
                    'url' => '/create_purchase',
                    'parentKey' => 'invoice_bill',
                ],
                [
                    'key' => 'create_expense',
                    'label' => 'Create Expense',
                    'url' => '/create_expense',
                    'parentKey' => 'invoice_bill',
                ],
                [
                    'key' => 'all_invoices',
                    'label' => 'All Invoices',
                    'url' => '/allInvoices',
                    'parentKey' => 'invoice_bill',
                ],
                [
                    'key' => 'daybook_report',
                    'label' => 'Daybook Report',
                    'url' => '/daybook_report',
                    'parentKey' => 'invoice_bill',
                ],
            ]
        ],
        [
            'key' => 'payroll',
            'label' => 'Payroll',
            'icon' => 'briefcase',
            'collapsed' => true,
            'children' => [
                [
                    'key' => 'salary_category',
                    'label' => 'Salary Category',
                    'url' => '/salary_category',
                    'parentKey' => 'payroll',
                ],
                [
                    'key' => 'benefits',
                    'label' => 'Benefits',
                    'url' => '/benefits',
                    'parentKey' => 'payroll',
                ],
                [
                    'key' => 'salary_declaration',
                    'label' => 'Salary Declaration',
                    'url' => '/salary_declaration',
                    'parentKey' => 'payroll',
                ],
                [
                    'key' => 'salary_addition_deduction',
                    'label' => 'Addition & Deduction',
                    'url' => '/salary_addition_deduction',
                    'parentKey' => 'payroll',
                ],
                [
                    'key' => 'payroll_template',
                    'label' => 'Payroll Template',
                    'url' => '/payroll_template',
                    'parentKey' => 'payroll',
                ],
                [
                    'key' => 'payroll_process',
                    'label' => 'Payroll Process',
                    'url' => '/payroll_process',
                    'parentKey' => 'payroll',
                ],
                [
                    'key' => 'payslip_categories',
                    'label' => 'Payslip Category',
                    'url' => '/payslip-category',
                    'parentKey' => 'payroll',
                ],
                [
                    'key' => 'payslip_upload',
                    'label' => 'Payslip Upload',
                    'url' => '/payslip-upload',
                    'parentKey' => 'payroll',
                ],
                [
                    'key' => 'payslip_template',
                    'label' => 'Payslip Template',
                    'url' => '/payslip-template',
                    'parentKey' => 'payroll',
                ],
                [
                    'key' => 'bank_master',
                    'label' => 'Bank Master',
                    'url' => '/bank-master',
                    'parentKey' => 'payroll',
                ],
                [
                    'key' => 'paye_slab',
                    'label' => 'PAYE Slab',
                    'url' => '/paye-slab',
                    'parentKey' => 'payroll',
                ]
            ]
        ],
        [
            'key' => 'loan',
            'label' => 'Loan & Advance',
            'icon' => 'dollar-sign',
            'collapsed' => true,
            'children' => [
                 [
                    'key' => 'loan_request',
                    'label' => 'Loan Request',
                    'url' => '/loan-request',
                    'parentKey' => 'loan',
                ], [
                    'key' => 'advance_request',
                    'label' => 'Advance Request',
                    'url' => '/advance-request',
                    'parentKey' => 'loan',
                ], [
                    'key' => 'loan_schedules',
                    'label' => 'Schedules',
                    'url' => '/loan-schedules',
                    'parentKey' => 'loan',
                ],
                [
                    'key' => 'loan_type',
                    'label' => 'Loan Type',
                    'url' => '/loan-type',
                    'parentKey' => 'loan',
                ],
                [
                    'key' => 'advance_type',
                    'label' => 'Advance Type',
                    'url' => '/advance-type',
                    'parentKey' => 'loan',
                ],
                [
                    'key' => 'loan_report',
                    'label' => 'Loan Report',
                    'url' => '/loan-report',
                    'parentKey' => 'loan',
                ],
            ],
        ],
        [
            'key' => 'settings',
            'label' => 'Settings',
            'icon' => 'settings',
            'collapsed' => true,
            'children' => [
                [
                    'key' => 'users',
                    'label' => 'Users',
                    'url' => '/users',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'designation',
                    'label' => 'Designation',
                    'url' => '/designation',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'departments',
                    'label' => 'Department',
                    'url' => '/departments',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'roles',
                    'label' => 'Role',
                    'url' => '/roles',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'navigation',
                    'label' => 'Navigation',
                    'url' => '/navigations',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'calendar_setup',
                    'label' => 'Calendar Setup',
                    'url' => '/calendar_setup',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'approval_levels',
                    'label' => 'Approval Levels',
                    'url' => '/approval_levels',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'policy',
                    'label' => 'Policy',
                    'url' => '/policy',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'customers',
                    'label' => 'Customers',
                    'url' => '/customers',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'items',
                    'label' => 'Items',
                    'url' => '/items',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'company_configuration',
                    'label' => 'Company Info',
                    'url' => '/company-configuration',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'suppliers',
                    'label' => 'Suppliers',
                    'url' => '/suppliers',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'locations',
                    'label' => 'Locations',
                    'url' => '/locations',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'maintenance_categoryions',
                    'label' => 'Maintenance Category',
                    'url' => '/maintenance-category',
                    'parentKey' => 'settings',
                ],
                [
                    'key' => 'crm-pipelines',
                    'label' => 'Crm Pipelines',
                    'url' => '/crm-pipelines',
                    'parentKey' => 'settings',
                ]
            ]
        ],
    ],
    'permissions' => [
        // Dashboard children
        [
            'label' => 'Grid',
            'key' => 'dashboard-crm',
            'permission_name' => 'dashboard-crm_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'dashboard-analytics',
            'permission_name' => 'dashboard-analytics_grid',
        ],
        // My Account children
        [
            'label' => 'Grid',
            'key' => 'profile',
            'permission_name' => 'profile_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'in_out',
            'permission_name' => 'in_out_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'profile_leave',
            'permission_name' => 'profile_leave_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'my_field_task',
            'permission_name' => 'my_field_task_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'approvals',
            'permission_name' => 'approvals_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'my-owned-assets',
            'permission_name' => 'my_asset_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'team_activity',
            'permission_name' => 'team_activity_grid',
        ],
        // Attendance children
        [
            'label' => 'Grid',
            'key' => 'day_attendence',
            'permission_name' => 'day_attendence_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'shifts',
            'permission_name' => 'shifts_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'attendance_history',
            'permission_name' => 'attendance_history_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'attendance_summary',
            'permission_name' => 'attendance_summary_grid',
        ],
        // Leave children
        [
            'label' => 'Grid',
            'key' => 'leaves',
            'permission_name' => 'leaves_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'leave_type',
            'permission_name' => 'leave_type_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'leave_group',
            'permission_name' => 'leave_group_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'leave_adjustment',
            'permission_name' => 'leave_adjustment_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'leave_report',
            'permission_name' => 'leave_report_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'leave_summary',
            'permission_name' => 'leave_summary_grid',
        ],
        // Asset Maintenance children
        [
            'label' => 'Grid',
            'key' => 'assets',
            'permission_name' => 'assets_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'rental',
            'permission_name' => 'rental_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'asset_allocation',
            'permission_name' => 'asset_allocation_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'asset_maintenance',
            'permission_name' => 'asset_maintenance_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'expense-type',
            'permission_name' => 'expense_type_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'income_type',
            'permission_name' => 'income_type_grid',
        ],
        // Invoice/Bill children
        [
            'label' => 'Grid',
            'key' => 'invoice',
            'permission_name' => 'invoice_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'create_purchase',
            'permission_name' => 'create_purchase_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'create_expense',
            'permission_name' => 'create_expense_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'all_invoices',
            'permission_name' => 'all_invoices_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'daybook_report',
            'permission_name' => 'daybook_report_grid',
        ],
        // Payroll children
        [
            'label' => 'Grid',
            'key' => 'salary_category',
            'permission_name' => 'salary_category_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'benefits',
            'permission_name' => 'benefits_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'salary_declaration',
            'permission_name' => 'salary_declaration_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'salary_addition_deduction',
            'permission_name' => 'salary_addition_deduction_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'payroll_template',
            'permission_name' => 'payroll_template_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'payroll_process',
            'permission_name' => 'payroll_process_grid',
        ],

        //loan children
        [
            'label' => 'Grid',
            'key' => 'loan_type',
            'permission_name' => 'loan_type_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'loan_report',
            'permission_name' => 'loan_report_grid',
        ],
        // Settings children
        [
            'label' => 'Grid',
            'key' => 'users',
            'permission_name' => 'users_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'designation',
            'permission_name' => 'designation_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'departments',
            'permission_name' => 'departments_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'roles',
            'permission_name' => 'roles_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'navigation',
            'permission_name' => 'navigation_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'calendar_setup',
            'permission_name' => 'calendar_setup_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'approval_levels',
            'permission_name' => 'approval_levels_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'policy',
            'permission_name' => 'policy_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'customers',
            'permission_name' => 'customers_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'items',
            'permission_name' => 'items_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'request_status',
            'permission_name' => 'request_status_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'company_configuration',
            'permission_name' => 'company_configuration_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'suppliers',
            'permission_name' => 'suppliers_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'locations',
            'permission_name' => 'locations_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'maintenance_categoryions',
            'permission_name' => 'maintenance_categoryions_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'my_account_task',
            'permission_name' => 'my_account_task_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'main_task',
            'permission_name' => 'main_task_grid',
        ],
        // Task
        [
            'label' => 'Grid',
            'key' => 'field_task',
            'permission_name' => 'field_task_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'maintenance_task',
            'permission_name' => 'maintenance_task_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'my_maintenance_task',
            'permission_name' => 'my_maintenance_task_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'attendance_live_location',
            'permission_name' => 'attendance_live_location_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'payslip_categories',
            'permission_name' => 'payslip_categories_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'shift_schedule',
            'permission_name' => 'shift_schedule_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'payslips',
            'permission_name' => 'payslips_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'payslip_upload',
            'permission_name' => 'payslip_upload_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'payslip_template',
            'permission_name' => 'payslip_template_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'my_customers',
            'permission_name' => 'my_customers_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'bank_master',
            'permission_name' => 'bank_master_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'company_hierarchy',
            'permission_name' => 'company_hierarchy_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'paye_slab',
            'permission_name' => 'paye_slab_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'my_loan_request',
            'permission_name' => 'my_loan_request_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'my_advance_request',
            'permission_name' => 'my_advance_request_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'loan_request',
            'permission_name' => 'loan_request_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'advance_request',
            'permission_name' => 'advance_request_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'loan_schedules',
            'permission_name' => 'loan_schedules_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'advance_type',
            'permission_name' => 'advance_type_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'dashboard-hr',
            'permission_name' => 'dashboard-hr_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'crm_task',
            'permission_name' => 'crm_task_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'my_crm_task',
            'permission_name' => 'my_crm_task_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'crm-pipelines',
            'permission_name' => 'crm-pipelines_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'crm_pipeline_stage',
            'permission_name' => 'crm_pipeline_stage_grid',
        ],
        [
            'label' => 'General',
            'key' => 'dashboard-task',
            'permission_name' => 'dashboard_task_general',
        ],
        [
            'label' => 'Field',
            'key' => 'dashboard-task',
            'permission_name' => 'dashboard_task_field',
        ],
        [
            'label' => 'Maintenance',
            'key' => 'dashboard-task',
            'permission_name' => 'dashboard_task_maintenance',
        ],
        [
            'label' => 'Crm',
            'key' => 'dashboard-task',
            'permission_name' => 'dashboard_task_crm',
        ],
        [
            'label' => 'Grid',
            'key' => 'dashboard-iou',
            'permission_name' => 'dashboard-iou_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'my_iou_request',
            'permission_name' => 'my_iou_request_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'iou_request',
            'permission_name' => 'iou_request_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'iou_type',
            'permission_name' => 'iou_type_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'iou_expense_type',
            'permission_name' => 'iou_expense_type_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'iou_employee_report',
            'permission_name' => 'iou_employee_report_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'iou_outstanding',
            'permission_name' => 'iou_outstanding_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'asset_income',
            'permission_name' => 'asset_income_grid',
        ],
        [
            'label' => 'Grid',
            'key' => 'asset_expense',
            'permission_name' => 'asset_expense_grid',
        ]



    ],
];