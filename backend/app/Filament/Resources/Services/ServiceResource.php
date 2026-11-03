<?php

namespace App\Filament\Resources\Services;

use App\Filament\Resources\Services\Pages\CreateService;
use App\Filament\Resources\Services\Pages\EditService;
use App\Filament\Resources\Services\Pages\ListServices;
use App\Filament\Support\Fields;
use App\Models\Service;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\RestoreAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use UnitEnum;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-briefcase';

    protected static string|UnitEnum|null $navigationGroup = 'Website';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('Service')->columnSpanFull()->tabs([
                Tab::make('Basics')->schema([
                    Grid::make(2)->schema([
                        Fields::title(),
                        Fields::slug(),
                        Select::make('service_category_id')->label('Category')->relationship('category', 'name')->required()->preload(),
                        Fields::status(),
                        Fields::icon()->required(),
                        TextInput::make('sort_order')->numeric()->default(0),
                    ]),
                    Textarea::make('short_description')->label('Card description')->required()->rows(2)->maxLength(500),
                    Fields::media(),
                    Toggle::make('is_featured')->label('Show on the homepage'),
                    TextInput::make('featured_order')->label('Homepage position')->numeric()->default(0),
                ]),
                Tab::make('Page content')->schema([
                    TextInput::make('hero_heading')->maxLength(255)
                        ->helperText('Wrap words in asterisks to set them in italic, like *this*.'),
                    Textarea::make('hero_text')->rows(2),
                    Fields::rich('overview', 'Overview and introduction'),
                    Fields::items('audience', 'Who the service helps'),
                    Fields::items('problems', 'Problems it addresses'),
                    Fields::items('deliverables', 'Key deliverables'),
                    Fields::items('process', 'How the process works'),
                    Fields::items('benefits', 'Business benefits'),
                ]),
                Tab::make('FAQs')->schema([
                    Repeater::make('faqs')
                        ->relationship()
                        ->hiddenLabel()
                        ->orderColumn('sort_order')
                        ->schema([
                            TextInput::make('question')->required()->maxLength(255),
                            Textarea::make('answer')->required()->rows(3),
                        ])
                        ->itemLabel(fn (array $state) => $state['question'] ?? null)
                        ->collapsed()
                        ->defaultItems(0),
                ]),
                Tab::make('SEO')->schema([Fields::seo()]),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('title')->searchable()->sortable(),
                TextColumn::make('category.name')->sortable(),
                TextColumn::make('status')->badge(),
                IconColumn::make('is_featured')->label('Homepage')->boolean(),
                TextColumn::make('updated_at')->since()->sortable(),
            ])
            ->filters([
                SelectFilter::make('service_category_id')->label('Category')->relationship('category', 'name'),
                TrashedFilter::make(),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make(), RestoreAction::make()]);
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->withoutGlobalScopes([SoftDeletingScope::class]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListServices::route('/'),
            'create' => CreateService::route('/create'),
            'edit' => EditService::route('/{record}/edit'),
        ];
    }
}
