<?php

namespace App\Services;

use App\Enums\ContentStatus;
use App\Enums\LeadStatus;
use App\Models\BlogPost;
use App\Models\Lead;
use App\Models\Page;
use App\Models\Service;
use Illuminate\Database\Eloquent\Collection;

class DashboardStats
{
    public function summary(): array
    {
        return [
            'total_leads' => Lead::count(),
            'new_leads' => Lead::where('status', LeadStatus::New)->count(),
            'leads_by_status' => $this->leadsByStatus(),
            'published_pages' => Page::published()->count(),
            'published_blogs' => BlogPost::live()->count(),
            'active_services' => Service::where('status', ContentStatus::Published)->count(),
        ];
    }

    /** @return array<string, int> Every status, including those with no leads yet. */
    public function leadsByStatus(): array
    {
        $counts = Lead::query()
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->toBase()
            ->pluck('total', 'status');

        return collect(LeadStatus::cases())
            ->mapWithKeys(fn (LeadStatus $status) => [$status->value => (int) ($counts[$status->value] ?? 0)])
            ->all();
    }

    public function recentLeads(int $limit = 5): Collection
    {
        return Lead::latest()->limit($limit)->get();
    }
}
