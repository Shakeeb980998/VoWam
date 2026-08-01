<?php

namespace App\Http\Controllers;

use App\Repositories\CompanyRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CompanyController extends Controller
{
    protected CompanyRepositoryInterface $companyRepository;

    /**
     * Inject the Company Repository.
     */
    public function __construct(CompanyRepositoryInterface $companyRepository)
    {
        $this->companyRepository = $companyRepository;
    }

    /**
     * Display a listing of companies.
     */
    public function index(): JsonResponse
    {
        $companies = $this->companyRepository->all();
        return response()->json($companies);
    }

    /**
     * Store a newly created company.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subdomain' => 'required|string|max:255|unique:companies,subdomain',
            'database_name' => 'required|string|max:255|unique:companies,database_name',
        ]);

        $company = $this->companyRepository->create($validated);

        return response()->json($company, Response::HTTP_CREATED);
    }

    /**
     * Display the specified company.
     */
    public function show(int $id): JsonResponse
    {
        $company = $this->companyRepository->find($id);

        if (!$company) {
            return response()->json(['error' => 'Company not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($company);
    }

    /**
     * Update the specified company.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'subdomain' => 'sometimes|required|string|max:255|unique:companies,subdomain,' . $id,
            'database_name' => 'sometimes|required|string|max:255|unique:companies,database_name,' . $id,
        ]);

        $updated = $this->companyRepository->update($id, $validated);

        if (!$updated) {
            return response()->json(['error' => 'Company not found or update failed'], Response::HTTP_NOT_FOUND);
        }

        $company = $this->companyRepository->find($id);
        return response()->json($company);
    }

    /**
     * Remove the specified company.
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->companyRepository->delete($id);

        if (!$deleted) {
            return response()->json(['error' => 'Company not found or deletion failed'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
