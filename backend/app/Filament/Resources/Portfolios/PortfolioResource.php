<?php

namespace App\Filament\Resources\Portfolios;

use App\Filament\Resources\Portfolios\Pages\CreatePortfolio;
use App\Filament\Resources\Portfolios\Pages\EditPortfolio;
use App\Filament\Resources\Portfolios\Pages\ListPortfolios;
use App\Filament\Support\Fields;
use App\Models\Portfolio;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Repeater;
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

class PortfolioResource extends Resource
{
    protected static ?string $model = Portfolio::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static string|UnitEnum|null $navigationGroup = 'Website';

    protected static ?int $navigationSort = 4;

    protected static ?string $navigationLabel = 'Case studies';

    protected static ?string $modelLabel = 'case study';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Project')->columns(2)->schema([
                Fields::title(),
                Fields::slug(),
                TextInput::make('client_name')->maxLength(160),
                TextInput::make('website_url')->label('Live website')->url()->maxLength(255)
                    ->helperText('Shown on real client work only. Link it once the client has approved.'),
                DatePicker::make('completed_on')->label('Completed'),
                Select::make('industry_id')->relationship('industry', 'name')->preload(),
                Select::make('services')->relationship('services', 'title')->multiple()->preload(),
                Fields::status(),
                Fields::media(),
                TextInput::make('sort_order')->numeric()->default(0),
                Textarea::make('summary')->rows(2)->columnSpanFull(),
                Toggle::make('is_illustrative')->label('Illustrative sample, not real client work')
                    ->helperText('Labelled publicly as illustrative. Hidden automatically once real work is published.'),
            ]),
            Section::make('Case study')->schema([
                Fields::rich('overview', 'Project overview'),
                Fields::rich('challenges'),
                Fields::rich('strategy'),
                Fields::items('deliverables', 'Deliverables'),
                Fields::rich('outcomes'),
                Toggle::make('outcomes_verified')->label('Outcomes are verified and approved for publication')
                    ->helperText('Outcomes stay private until this is on.'),
            ]),
            Section::make('Gallery')
                ->description('Screenshots and work samples shown on the case study, in order. Only use work you are allowed to show.')
                ->schema([
                    Repeater::make('gallery')
                        ->hiddenLabel()
                        ->schema([
                            Fields::media('media_id', 'Image')->required(),
                            Select::make('kind')->options(['desktop' => 'Desktop screen', 'mobile' => 'Mobile screen', 'detail' => 'Detail or artwork'])
                                ->default('desktop')->required()->native(false),
                            TextInput::make('caption')->maxLength(160),
                        ])
                        ->columns(3)
                        ->defaultItems(0)
                        ->reorderableWithButtons()
                        ->collapsible(),
                ]),
            Fields::seo(),
        ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('title')->searchable()->sortable(),
                TextColumn::make('client_name')->placeholder('None'),
                TextColumn::make('status')->badge(),
                IconColumn::make('is_illustrative')->label('Illustrative')->boolean(),
                IconColumn::make('outcomes_verified')->label('Verified')->boolean(),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPortfolios::route('/'),
            'create' => CreatePortfolio::route('/create'),
            'edit' => EditPortfolio::route('/{record}/edit'),
        ];
    }
}
