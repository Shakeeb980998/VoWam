# Penetration Testing Plan

This document outlines the scope, timing, methodology, and execution steps for a pre-launch penetration test of the VoWam application.

---

## 1. Objectives
The primary objective of the penetration test is to discover, evaluate, and remediate security vulnerabilities before deploying the application to production. Given the multi-tenant architecture, special focus is placed on **Tenant Isolation Security** (ensuring Tenant A cannot access Tenant B's data).

---

## 2. Schedule and Timing
- **Phasing**: The penetration test will be performed immediately following the completion of core module migrations and logic implementations, prior to the public staging release.
- **Duration**: Expected duration is 5-7 business days for initial testing, with a 2-day re-test period after security patches are applied.
- **Triggers for Re-testing**: Major architectural modifications, additions of core authentication/authorization modules, or changes to the database-per-tenant isolation logic.

---

## 3. Scope of Testing

### 3.1 Target Environments
- **Staging API Endpoint**: `https://staging-api.vowam.com`
- **Landlord/Main database control endpoints**: Routes relating to company signup and user registration.
- **Tenant API Endpoints**: Dynamic subdomains or tenant header-based endpoints (e.g., `https://tenant1.staging-api.vowam.com`).

### 3.2 Key Testing Focus Areas
1. **Tenant Isolation Verification (Multi-Tenancy)**:
   - Attempting to access tenant database records by altering headers (`X-Tenant-ID`) or subdomains on authenticated requests.
   - Cross-tenant database queries/mutation injection attempts.
2. **API Rate Limiting & Denial of Service (DoS)**:
   - Validating that the Tenant-based rate limiter (GAP-024) behaves correctly when target thresholds are exceeded.
   - Testing for resource consumption limits (large file uploads, database-heavy query triggers).
3. **Authentication & Session Management**:
   - JWT validation checks, signature spoofing, and key expiration overrides.
   - Password reset mechanism and account enumeration vulnerabilities.
4. **Data Input Validation**:
   - SQL Injection (SQLi) attacks on central and tenant databases.
   - Cross-Site Scripting (XSS) via API payloads.
   - Path Traversal on local filesystem disks.

---

## 4. Methodology (OWASP Top 10)
Testing will follow a **Gray-Box** approach:
- **Phase 1: Reconnaissance & Mapping**: Extracting routing endpoints, API schemas, and headers.
- **Phase 2: Vulnerability Analysis**: Automated scanning using tools like OWASP ZAP and Burp Suite.
- **Phase 3: Exploitation**: Manual verification of business logic flaws, privileges escalation, and tenant boundary breakout.
- **Phase 4: Reporting**: Documenting vulnerabilities with CVSS scores and mitigation strategies.

---

## 5. Remediation & Re-testing
All vulnerabilities categorized as **High** or **Critical** must be remediated immediately. No production release will occur until a clean re-test report is obtained for all Critical, High, and Medium vulnerabilities.
