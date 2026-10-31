<?php

namespace App\Filament\Resources\Leads\Pages;

use App\Filament\Resources\Leads\LeadResource;
use App\Models\Lead;
use App\Services\LeadExporter;
use Filament\Actions\Action;
use Filament\Resources\Pages\ListRecords;

class ListLeads extends ListRecords
{
    protected static string $resource = LeadResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('export')
                ->label('Export CSV')
                ->icon('heroicon-o-arrow-down-tray')
                ->visible(fn () => auth()->user()->can('export', Lead::class))
                ->action(fn (ListLeads $livewire, LeadExporter $exporter) => $exporter->download(
                    $livewire->getFilteredTableQuery()->reorder()
                )),
        ];
    }
}
