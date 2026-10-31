<?php

namespace App\Filament\Resources\BlogPosts;

use App\Enums\ContentStatus;
use App\Filament\Resources\BlogPosts\Pages\CreateBlogPost;
use App\Filament\Resources\BlogPosts\Pages\EditBlogPost;
use App\Filament\Resources\BlogPosts\Pages\ListBlogPosts;
use App\Filament\Support\Fields;
use App\Models\BlogPost;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use UnitEnum;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-newspaper';

    protected static string|UnitEnum|null $navigationGroup = 'Blog';

    protected static ?string $navigationLabel = 'Posts';

    protected static ?string $modelLabel = 'post';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Article')->columns(2)->schema([
                Fields::title(),
                Fields::slug(),
                Textarea::make('excerpt')->rows(2)->maxLength(500)->columnSpanFull(),
                Fields::rich('body')->required()->columnSpanFull(),
            ]),
            Section::make('Publishing')->columns(2)->schema([
                Select::make('status')->options(ContentStatus::class)->default(ContentStatus::Draft)->required()->live()->native(false),
                DateTimePicker::make('published_at')
                    ->label('Publish at')
                    ->seconds(false)
                    ->requiredIf('status', ContentStatus::Scheduled->value)
                    ->helperText('Scheduled posts go live automatically at this time.'),
                Select::make('blog_category_id')->label('Category')->relationship('category', 'name')->preload(),
                Fields::media(),
                TextInput::make('author_name')->maxLength(120),
                TextInput::make('author_bio')->maxLength(500),
            ]),
            Fields::seo(),
        ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('published_at', 'desc')
            ->columns([
                TextColumn::make('title')->searchable()->sortable()->limit(60),
                TextColumn::make('category.name'),
                TextColumn::make('status')->badge(),
                TextColumn::make('published_at')->dateTime('M j, Y g:i a')->sortable()->placeholder('Not set'),
            ])
            ->filters([
                SelectFilter::make('status')->options(ContentStatus::class),
                SelectFilter::make('blog_category_id')->label('Category')->relationship('category', 'name'),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBlogPosts::route('/'),
            'create' => CreateBlogPost::route('/create'),
            'edit' => EditBlogPost::route('/{record}/edit'),
        ];
    }
}
