<?php

namespace App\Filament\Resources\ContactSubmissions;

use App\Filament\Resources\ContactSubmissions\Pages\ManageContactSubmissions;
use App\Models\ContactSubmission;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Actions\ViewAction;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use UnitEnum;

class ContactSubmissionResource extends Resource
{
    protected static ?string $model = ContactSubmission::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static string|UnitEnum|null $navigationGroup = 'Leads';

    protected static ?string $navigationLabel = 'Contact messages';

    protected static ?string $modelLabel = 'contact message';

    public static function infolist(Schema $schema): Schema
    {
        return $schema->components([
            TextEntry::make('name'),
            TextEntry::make('email')->copyable(),
            TextEntry::make('phone')->placeholder('Not provided'),
            TextEntry::make('subject')->placeholder('No subject'),
            TextEntry::make('message')->columnSpanFull(),
            TextEntry::make('created_at')->label('Received')->dateTime('M j, Y g:i a'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                IconColumn::make('read_at')->label('Read')->boolean()->getStateUsing(fn (ContactSubmission $record) => $record->read_at !== null),
                TextColumn::make('name')->searchable(),
                TextColumn::make('email')->searchable()->copyable(),
                TextColumn::make('subject')->placeholder('No subject')->limit(40),
                TextColumn::make('created_at')->label('Received')->since()->sortable(),
            ])
            ->filters([
                TernaryFilter::make('read_at')->label('Read')->nullable(),
            ])
            ->recordActions([
                ViewAction::make(),
                Action::make('markRead')
                    ->label('Mark read')
                    ->icon('heroicon-o-check')
                    ->visible(fn (ContactSubmission $record) => $record->read_at === null && auth()->user()->can('update', $record))
                    ->action(fn (ContactSubmission $record) => $record->update(['read_at' => now()])),
            ]);
    }

    public static function getPages(): array
    {
        return ['index' => ManageContactSubmissions::route('/')];
    }
}
