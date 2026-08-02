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
        // permissions omitted for brevity in response...
    ]
];
