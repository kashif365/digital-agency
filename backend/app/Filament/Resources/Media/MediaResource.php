<?php

namespace App\Filament\Resources\Media;

use App\Filament\Resources\Media\Pages\ManageMedia;
use App\Filament\Support\Fields;
use App\Models\Media;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use UnitEnum;

class MediaResource extends Resource
{
    protected static ?string $model = Media::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-photo';

    protected static string|UnitEnum|null $navigationGroup = 'Library';

    protected static ?string $navigationLabel = 'Media library';

    protected static ?string $modelLabel = 'image';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return $schema->components(Fields::mediaForm())->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                ImageColumn::make('path')->label('Preview')->disk('public')->square(),
                TextColumn::make('title')->searchable(),
                TextColumn::make('alt_text')->label('Alt text')->limit(40)->placeholder('Missing'),
                TextColumn::make('folder')->badge(),
                TextColumn::make('size')->formatStateUsing(fn (?int $state) => $state ? round($state / 1024).' KB' : '')->label('Size'),
                TextColumn::make('created_at')->since()->sortable(),
            ])
            ->filters([
                SelectFilter::make('folder')->options(fn () => Media::query()->distinct()->orderBy('folder')->pluck('folder', 'folder')),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return ['index' => ManageMedia::route('/')];
    }
}
