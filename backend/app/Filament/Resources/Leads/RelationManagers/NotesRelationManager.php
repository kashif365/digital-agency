<?php

namespace App\Filament\Resources\Leads\RelationManagers;

use App\Models\LeadNote;
use Filament\Actions\CreateAction;
use Filament\Forms\Components\Textarea;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class NotesRelationManager extends RelationManager
{
    protected static string $relationship = 'notes';

    protected static ?string $title = 'Notes and activity';

    public function isReadOnly(): bool
    {
        return false;
    }

    public static function canViewForRecord(Model $ownerRecord, string $pageClass): bool
    {
        return auth()->user()->can('view', $ownerRecord);
    }

    protected function canCreate(): bool
    {
        return auth()->user()->can('update', $this->getOwnerRecord());
    }

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            Textarea::make('body')->label('Internal note')->required()->rows(4)->maxLength(5000)->columnSpanFull(),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('body')->label('Entry')->wrap(),
                TextColumn::make('type')
                    ->badge()
                    ->formatStateUsing(fn (string $state) => $state === LeadNote::TYPE_STATUS ? 'Status' : 'Note'),
                TextColumn::make('user.name')->label('By')->placeholder('System'),
                TextColumn::make('created_at')->label('When')->since(),
            ])
            ->headerActions([
                CreateAction::make()
                    ->label('Add note')
                    ->mutateDataUsing(fn (array $data) => [
                        ...$data,
                        'user_id' => auth()->id(),
                        'type' => LeadNote::TYPE_NOTE,
                    ]),
            ]);
    }
}
