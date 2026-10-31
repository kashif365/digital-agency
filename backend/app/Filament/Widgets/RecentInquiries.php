<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Leads\LeadResource;
use App\Models\Lead;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;

class RecentInquiries extends TableWidget
{
    protected static ?int $sort = 3;

    protected static ?string $heading = 'Recent inquiries';

    protected int|string|array $columnSpan = 'full';

    public static function canView(): bool
    {
        return auth()->user()?->can('viewAny', Lead::class) ?? false;
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(Lead::query()->latest()->limit(5))
            ->paginated(false)
            ->columns([
                TextColumn::make('full_name')->label('Name'),
                TextColumn::make('business_name')->label('Business'),
                TextColumn::make('service_name')->label('Service'),
                TextColumn::make('status')->badge(),
                TextColumn::make('created_at')->label('Received')->since(),
            ])
            ->recordUrl(fn (Lead $record) => LeadResource::getUrl('view', ['record' => $record]));
    }
}
