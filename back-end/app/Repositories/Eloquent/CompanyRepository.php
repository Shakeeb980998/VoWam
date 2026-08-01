<?php

namespace App\Repositories\Eloquent;

use App\Models\Company;
use App\Repositories\CompanyRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class CompanyRepository implements CompanyRepositoryInterface
{
    /**
     * Get all companies.
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return Company::all();
    }

    /**
     * Find a company by its ID.
     *
     * @param int $id
     * @return Company|null
     */
    public function find(int $id): ?Company
    {
        return Company::find($id);
    }

    /**
     * Find a company by its subdomain.
     *
     * @param string $subdomain
     * @return Company|null
     */
    public function findBySubdomain(string $subdomain): ?Company
    {
        return Company::where('subdomain', $subdomain)->first();
    }

    /**
     * Create a new company.
     *
     * @param array $data
     * @return Company
     */
    public function create(array $data): Company
    {
        return Company::create($data);
    }

    /**
     * Update an existing company.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $company = $this->find($id);

        if (!$company) {
            return false;
        }

        return $company->update($data);
    }

    /**
     * Delete a company.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $company = $this->find($id);

        if (!$company) {
            return false;
        }

        return $company->delete();
    }
}
