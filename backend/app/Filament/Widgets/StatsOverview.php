<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use App\Services\DashboardStats;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $summary = app(DashboardStats::class)->summary();

        return array_filter([
            auth()->user()->can('viewAny', Lead::class) ? Stat::make('Total leads', $summary['total_leads']) : null,
            auth()->user()->can('viewAny', Lead::class) ? Stat::make('New leads', $summary['new_leads'])->color('info') : null,
            Stat::make('Published pages', $summary['published_pages']),
            Stat::make('Published blogs', $summary['published_blogs']),
            Stat::make('Active services', $summary['active_services']),
        ]);
    }
}
