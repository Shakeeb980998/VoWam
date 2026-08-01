# Secrets Management Specification

This document details the architecture and operational guidelines for storing, accessing, and rotating sensitive credentials, API keys, and certificates in the VoWam backend.

---

## 1. Secrets Overview

The application relies on three categories of secrets:
1. **Infrastructure Secrets**: Database credentials, Redis passwords, mail server credentials.
2. **Cryptographic Secrets**: Laravel `APP_KEY`, JWT signing keys (for API authentication).
3. **Third-Party API Keys**: Bank feeds integrations, AI services, SMS/notification gateways.

---

## 2. Environment Segmentation

| Environment | Secrets Storage | Access Control | Encryption at Rest |
|-------------|-----------------|----------------|--------------------|
| **Local / Dev** | Plaintext `.env` file | Developer local machine | No (Excluded from VCS) |
| **Staging** | AWS Secrets Manager / HashiCorp Vault | IAM / Role-based Policies | Yes (KMS / Vault Engine) |
| **Production** | AWS Secrets Manager / HashiCorp Vault | IAM / Role-based Policies | Yes (KMS / Vault Engine) |

---

## 3. Storage and Retrieval Architecture

### 3.1 Local Development
For local development:
- Use `.env` file containing configuration keys.
- **Never commit `.env`** to Git. Always copy from `.env.example` and populate it locally.
- A lint/pre-commit hook will scan for high-entropy secrets accidentally added to files.

### 3.2 Production & Staging Architecture
In cloud environments, the application does not rely on a persistent `.env` file stored in the directory. Instead:
1. **Container Bootstrap**: Upon container startup, a bootstrap script reads secrets from the secret vault (e.g. AWS Secrets Manager or HashiCorp Vault).
2. **Environment Injection**: The script injects these secrets into the process environment (PHP-FPM/CLI environment variables).
3. **Laravel Configuration Cache**: The Laravel config is compiled (`php artisan config:cache`) during deployment to ensure configurations are loaded from variables into PHP memory for performance and safety.

---

## 4. Key Management & Vault Reference Configuration

### AWS Secrets Manager / Parameter Store Structure
Production secrets are stored under the path `/vowam/production/`:
- `/vowam/production/database/password`
- `/vowam/production/jwt/secret`
- `/vowam/production/bankfeeds/api_key`

Laravel configuration accesses them via native `env()` calls which fetch from process environment variables injected by the bootstrap script:
```php
'mysql' => [
    'driver' => 'mysql',
    'host' => env('DB_HOST'),
    'database' => env('DB_DATABASE'),
    'username' => env('DB_USERNAME'),
    'password' => env('DB_PASSWORD'),
],
```

---

## 5. Secret Rotation Guidelines

- **Database Credentials**: Rotated every 90 days automatically using AWS Secrets Manager rotation lambda function.
- **JWT Signing Keys**: Rotated every 180 days. Supported by a dual-key configuration (current and previous) to prevent session invalidations during the transition.
- **API Keys**: Rotated annually or immediately upon suspected breach.
