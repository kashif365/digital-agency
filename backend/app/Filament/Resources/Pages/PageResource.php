<?php

namespace App\Filament\Resources\Pages;

use App\Filament\Resources\Pages\Pages\CreatePage;
use App\Filament\Resources\Pages\Pages\EditPage;
use App\Filament\Resources\Pages\Pages\ListPages;
use App\Filament\Support\Fields;
use App\Models\Page;
use App\Models\PageSection;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-document-text';

    protected static string|UnitEnum|null $navigationGroup = 'Website';

    protected static ?int $navigationSort = 0;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        $typeIn = fn (array $types) => fn (Get $get) => in_array($get('type'), $types, true);

        return $schema->components([
            Section::make('Page')->columns(3)->schema([
                Fields::title(),
                Fields::slug()->disabled(fn (?Page $record) => (bool) $record?->is_system)
                    ->helperText(fn (?Page $record) => $record?->is_system ? 'This page backs a fixed route, so its address is locked.' : null),
                Fields::status(),
            ]),
            Section::make('Sections')->description('Drag to reorder. Hide a section without deleting it.')->schema([
                Repeater::make('sections')
                    ->relationship()
                    ->hiddenLabel()
                    ->orderColumn('sort_order')
                    ->collapsed()
                    ->defaultItems(0)
                    ->addActionLabel('Add section')
                    ->itemLabel(function (array $state) {
                        $type = PageSection::TYPES[$state['type'] ?? ''] ?? 'New section';
                        $heading = $state['data']['heading'] ?? null;
                        $hidden = ($state['is_visible'] ?? true) ? '' : ' (hidden)';

                        return ($heading ? "{$type}: {$heading}" : $type).$hidden;
                    })
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('type')->options(PageSection::TYPES)->required()->live()->native(false),
                            Toggle::make('is_visible')->label('Visible')->default(true)->inline(false),
                        ]),
                        TextInput::make('data.eyebrow')->label('Eyebrow')->maxLength(120),
                        TextInput::make('data.heading')->label('Heading')->maxLength(255)
                            ->helperText('Wrap words in asterisks to show them in green, like *this*.'),
                        Textarea::make('data.lead')->label('Supporting text')->rows(2)->maxLength(600),
                        Fields::rich('data.body', 'Body')
                            ->visible($typeIn(['statement', 'intro', 'rich_text', 'contact_form'])),
                        Fields::media('data.media_id', 'Image')
                            ->visible($typeIn(['hero', 'page_hero', 'intro', 'split'])),
                        Grid::make(3)
                            ->visible($typeIn(['hero', 'intro']))
                            ->schema([
                                TextInput::make('data.badge')->label('Graphic label')->maxLength(40),
                                TextInput::make('data.float_title')->label('Graphic title')->maxLength(40),
                                TextInput::make('data.float_text')->label('Graphic text')->maxLength(40),
                            ]),
                        Toggle::make('data.reverse')->label('Show the image on the left')
                            ->visible($typeIn(['split'])),
                        Grid::make(2)->schema([
                            TextInput::make('data.cta_label')->label('Button label')->maxLength(60),
                            TextInput::make('data.cta_url')->label('Button link')->maxLength(255),
                            TextInput::make('data.secondary_cta_label')->label('Second button label')->maxLength(60),
                            TextInput::make('data.secondary_cta_url')->label('Second button link')->maxLength(255),
                        ]),
                        TextInput::make('data.note')->label('Reassurance line')->maxLength(120)
                            ->visible($typeIn(['hero', 'pricing'])),
                        Grid::make(2)
                            ->visible($typeIn(['hero', 'consultation_form']))
                            ->schema([
                                TextInput::make('data.form_heading')->label('Form heading')->maxLength(120),
                                TextInput::make('data.form_cta')->label('Form button label')->maxLength(60),
                            ]),
                        Toggle::make('data.show_all')->label('Show every service, grouped by category')
                            ->visible($typeIn(['services_grid'])),
                        Fields::items('data.items', 'Items', withIcon: true, withLink: true, withMedia: true)
                            ->helperText(fn (Get $get) => $get('type') === 'comparison'
                                ? 'Title is the usual approach. Text is how you do it instead.'
                                : ($get('type') === 'hero' ? 'Each item is one hero slide: its title is the tab, its text is the caption.' : null))
                            ->visible($typeIn(['hero', 'statement', 'intro', 'value_grid', 'process', 'comparison', 'split', 'dual_cta', 'consultation_form', 'contact_form'])),
                    ]),
            ]),
            Fields::seo(),
        ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->searchable()->sortable(),
                TextColumn::make('slug')->prefix('/'),
                TextColumn::make('status')->badge(),
                IconColumn::make('is_system')->label('Built in')->boolean(),
                TextColumn::make('updated_at')->since()->sortable(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make()->visible(fn (Page $record) => ! $record->is_system),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPages::route('/'),
            'create' => CreatePage::route('/create'),
            'edit' => EditPage::route('/{record}/edit'),
        ];
    }
}
