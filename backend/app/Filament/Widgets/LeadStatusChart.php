<?php

namespace App\Filament\Widgets;

use App\Enums\LeadStatus;
use App\Models\Lead;
use App\Services\DashboardStats;
use Filament\Widgets\ChartWidget;

class LeadStatusChart extends ChartWidget
{
    protected ?string $heading = 'Lead status overview';

    protected static ?int $sort = 2;

    public static function canView(): bool
    {
        return auth()->user()?->can('viewAny', Lead::class) ?? false;
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getData(): array
    {
        $counts = app(DashboardStats::class)->leadsByStatus();

        return [
            'datasets' => [[
                'label' => 'Leads',
                'data' => array_values($counts),
                'backgroundColor' => '#008854',
                'borderRadius' => 6,
            ]],
            'labels' => array_map(fn (LeadStatus $status) => $status->getLabel(), LeadStatus::cases()),
        ];
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => ['legend' => ['display' => false]],
            'scales' => ['y' => ['beginAtZero' => true, 'ticks' => ['precision' => 0]]],
        ];
    }
}
