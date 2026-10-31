<?php

namespace App\Filament\Resources\Leads;

use App\Enums\LeadStatus;
use App\Filament\Resources\Leads\Pages\ListLeads;
use App\Filament\Resources\Leads\Pages\ViewLead;
use App\Filament\Resources\Leads\RelationManagers\NotesRelationManager;
use App\Models\Lead;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use UnitEnum;

class LeadResource extends Resource
{
    protected static ?string $model = Lead::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-inbox-arrow-down';

    protected static string|UnitEnum|null $navigationGroup = 'Leads';

    protected static ?string $recordTitleAttribute = 'full_name';

    public static function getNavigationBadge(): ?string
    {
        $count = Lead::where('status', LeadStatus::New)->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function statusAction(): Action
    {
        return Action::make('changeStatus')
            ->label('Change status')
            ->icon('heroicon-o-arrow-path')
            ->visible(fn (Lead $record) => auth()->user()->can('update', $record))
            ->schema([
                Select::make('status')
                    ->options(LeadStatus::class)
                    ->default(fn (Lead $record) => $record->status)
                    ->required(),
            ])
            ->action(fn (Lead $record, array $data) => $record->changeStatus(
                $data['status'] instanceof LeadStatus ? $data['status'] : LeadStatus::from($data['status']),
                auth()->user()
            ));
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('full_name')->label('Name')->searchable()->sortable(),
                TextColumn::make('business_name')->label('Business')->searchable()->sortable(),
                TextColumn::make('email')->searchable()->copyable(),
                TextColumn::make('phone')->searchable()->toggleable(),
                TextColumn::make('service_name')->label('Service')->toggleable(),
                TextColumn::make('budget')->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('status')->badge()->sortable(),
                TextColumn::make('created_at')->label('Received')->dateTime('M j, Y g:i a')->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')->options(LeadStatus::class)->multiple(),
                SelectFilter::make('service')->relationship('service', 'title')->searchable()->preload(),
                Filter::make('received')
                    ->schema([
                        DatePicker::make('from'),
                        DatePicker::make('until'),
                    ])
                    ->query(fn (Builder $query, array $data) => $query
                        ->when($data['from'] ?? null, fn ($q, $date) => $q->whereDate('created_at', '>=', $date))
                        ->when($data['until'] ?? null, fn ($q, $date) => $q->whereDate('created_at', '<=', $date))),
            ])
            ->recordActions([ViewAction::make(), self::statusAction()]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Inquiry')->columns(2)->schema([
                TextEntry::make('full_name')->label('Name'),
                TextEntry::make('business_name')->label('Business'),
                TextEntry::make('email')->copyable(),
                TextEntry::make('phone')->copyable(),
                TextEntry::make('website')->placeholder('Not provided'),
                TextEntry::make('service_name')->label('Service')->placeholder('Not specified'),
                TextEntry::make('budget')->placeholder('Not provided'),
                TextEntry::make('status')->badge(),
                TextEntry::make('message')->label('Message / goals')->columnSpanFull(),
                TextEntry::make('source_page')->placeholder('Unknown'),
                TextEntry::make('created_at')->label('Received')->dateTime('M j, Y g:i a'),
            ]),
            Section::make('Submission history')
                ->description('Other inquiries from this email address.')
                ->collapsed()
                ->schema([
                    RepeatableEntry::make('history')
                        ->hiddenLabel()
                        ->state(fn (Lead $record) => $record->submissionHistory()->toArray())
                        ->placeholder('No earlier submissions.')
                        ->schema([
                            TextEntry::make('created_at')->label('Received')->dateTime('M j, Y g:i a'),
                            TextEntry::make('service_name')->label('Service'),
                            TextEntry::make('message'),
                        ]),
                ]),
        ]);
    }

    public static function getRelations(): array
    {
        return [NotesRelationManager::class];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListLeads::route('/'),
            'view' => ViewLead::route('/{record}'),
        ];
    }
}
