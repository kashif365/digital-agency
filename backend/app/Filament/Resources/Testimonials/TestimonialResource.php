<?php

namespace App\Filament\Resources\Testimonials;

use App\Filament\Resources\Testimonials\Pages\ManageTestimonials;
use App\Filament\Support\Fields;
use App\Models\Testimonial;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-star';

    protected static string|UnitEnum|null $navigationGroup = 'Website';

    protected static ?int $navigationSort = 5;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('customer_name')->required()->maxLength(120),
            TextInput::make('company_name')->maxLength(160),
            Textarea::make('body')->label('Testimonial')->required()->rows(4)->maxLength(1500)->columnSpanFull(),
            Select::make('rating')->options([1 => '1', 2 => '2', 3 => '3', 4 => '4', 5 => '5'])
                ->helperText('Only enter a rating the customer actually gave.'),
            DatePicker::make('testimonial_date')->label('Date'),
            Fields::media('avatar_media_id', 'Profile image')->helperText('Only use with the customer\'s permission.'),
            TextInput::make('sort_order')->numeric()->default(0),
            Toggle::make('is_approved')->label('Approved by the client for publication')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('customer_name')->searchable(),
                TextColumn::make('company_name')->placeholder('None'),
                TextColumn::make('rating')->placeholder('None'),
                IconColumn::make('is_approved')->label('Approved')->boolean(),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return ['index' => ManageTestimonials::route('/')];
    }
}
