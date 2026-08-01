<?php

namespace App\Repositories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Collection;

interface CompanyRepositoryInterface
{
    /**
     * Get all companies.
     *
     * @return Collection
     */
    public function all(): Collection;

    /**
     * Find a company by its ID.
     *
     * @param int $id
     * @return Company|null
     */
    public function find(int $id): ?Company;

    /**
     * Find a company by its subdomain.
     *
     * @param string $subdomain
     * @return Company|null
     */
    public function findBySubdomain(string $subdomain): ?Company;

    /**
     * Create a new company.
     *
     * @param array $data
     * @return Company
     */
    public function create(array $data): Company;

    /**
     * Update an existing company.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool;

    /**
     * Delete a company.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;
}
