<?php

namespace App\Filament\Resources\PricingPlans;

use App\Filament\Resources\PricingPlans\Pages\ManagePricingPlans;
use App\Filament\Support\Fields;
use App\Models\PricingPlan;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class PricingPlanResource extends Resource
{
    protected static ?string $model = PricingPlan::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-currency-dollar';

    protected static string|UnitEnum|null $navigationGroup = 'Website';

    protected static ?int $navigationSort = 5;

    protected static ?string $navigationLabel = 'Pricing';

    protected static ?string $modelLabel = 'pricing plan';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')->required()->maxLength(255),
            Fields::status(),
            TextInput::make('price')->required()->maxLength(40)
                ->helperText('Shown exactly as typed, for example $999, From $999, or Custom.'),
            TextInput::make('period')->maxLength(40)->placeholder('per month'),
            Textarea::make('description')->rows(2)->maxLength(300)->columnSpanFull(),
            Repeater::make('features')
                ->simple(TextInput::make('feature')->required()->maxLength(160))
                ->reorderableWithButtons()
                ->defaultItems(0)
                ->columnSpanFull(),
            TextInput::make('cta_label')->label('Button label')->default('Get started')->maxLength(60),
            TextInput::make('cta_url')->label('Button link')->default('/free-consultation')->maxLength(255),
            TextInput::make('sort_order')->numeric()->default(0),
            Toggle::make('is_recommended')->label('Highlight this plan')->inline(false),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('name')->searchable(),
                TextColumn::make('price'),
                TextColumn::make('period')->placeholder('None'),
                TextColumn::make('status')->badge(),
                IconColumn::make('is_recommended')->label('Highlighted')->boolean(),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return ['index' => ManagePricingPlans::route('/')];
    }
}
