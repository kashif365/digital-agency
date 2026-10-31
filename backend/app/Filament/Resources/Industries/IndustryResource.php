<?php

namespace App\Filament\Resources\Industries;

use App\Filament\Resources\Industries\Pages\CreateIndustry;
use App\Filament\Resources\Industries\Pages\EditIndustry;
use App\Filament\Resources\Industries\Pages\ListIndustries;
use App\Filament\Support\Fields;
use App\Models\Industry;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class IndustryResource extends Resource
{
    protected static ?string $model = Industry::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-building-office-2';

    protected static string|UnitEnum|null $navigationGroup = 'Website';

    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Card')->columns(2)->schema([
                Fields::title('name', 'Name'),
                Fields::slug(),
                Fields::status(),
                Fields::icon()->required(),
                TextInput::make('sort_order')->numeric()->default(0),
                Fields::media(),
                Textarea::make('short_description')->required()->rows(2)->maxLength(500)->columnSpanFull(),
                Toggle::make('has_page')->label('This industry has its own page')->default(true)
                    ->helperText('Turn off to show the card without a link.'),
            ]),
            Section::make('Page content')->schema([
                Fields::rich('overview'),
                Fields::items('challenges', 'Common challenges'),
                Fields::items('approach', 'How we help'),
                Select::make('services')->label('Recommended services')->relationship('services', 'title')->multiple()->preload(),
            ]),
            Fields::seo()->columnSpanFull(),
        ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('status')->badge(),
                IconColumn::make('has_page')->label('Own page')->boolean(),
                TextColumn::make('updated_at')->since()->sortable(),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListIndustries::route('/'),
            'create' => CreateIndustry::route('/create'),
            'edit' => EditIndustry::route('/{record}/edit'),
        ];
    }
}
