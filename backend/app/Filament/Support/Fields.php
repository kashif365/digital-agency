<?php

namespace App\Filament\Support;

use App\Enums\ContentStatus;
use App\Models\Media;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Str;

/** Field definitions reused across resources so every editor behaves the same way. */
class Fields
{
    public const ICONS = [
        'search', 'map-pin', 'wrench', 'mouse-pointer-click', 'share-2', 'users', 'pen-line', 'video',
        'monitor-smartphone', 'layout-template', 'palette', 'mail', 'gauge', 'chart-column', 'sparkles',
        'target', 'message-circle', 'lightbulb', 'refresh-cw', 'handshake', 'compass', 'rocket',
        'trending-up', 'heart-pulse', 'house', 'shopping-cart', 'car', 'truck', 'briefcase', 'hammer',
        'graduation-cap', 'building-2', 'circle-check', 'megaphone', 'file-text', 'layers',
        'shield-check', 'clock', 'globe', 'award', 'eye', 'list-checks',
    ];

    public static function title(string $name = 'title', string $label = 'Title'): TextInput
    {
        return TextInput::make($name)
            ->label($label)
            ->required()
            ->maxLength(255)
            ->live(onBlur: true)
            ->afterStateUpdated(function (Set $set, ?string $state, string $operation) {
                if ($operation === 'create') {
                    $set('slug', Str::slug((string) $state));
                }
            });
    }

    public static function slug(): TextInput
    {
        return TextInput::make('slug')
            ->required()
            ->maxLength(255)
            ->alphaDash()
            ->unique(ignoreRecord: true);
    }

    public static function status(): Select
    {
        return Select::make('status')
            ->options([
                ContentStatus::Draft->value => ContentStatus::Draft->getLabel(),
                ContentStatus::Published->value => ContentStatus::Published->getLabel(),
            ])
            ->default(ContentStatus::Draft->value)
            ->required()
            ->native(false);
    }

    public static function icon(string $name = 'icon'): Select
    {
        return Select::make($name)
            ->label('Icon')
            ->options(array_combine(self::ICONS, self::ICONS))
            ->searchable();
    }

    /** Picks from the media library, or uploads a new image in place. */
    public static function media(string $name = 'featured_media_id', string $label = 'Featured image'): Select
    {
        return Select::make($name)
            ->label($label)
            ->options(fn () => Media::query()->latest()->limit(200)->pluck('title', 'id'))
            ->searchable()
            ->createOptionForm(self::mediaForm())
            ->createOptionUsing(fn (array $data) => Media::create($data)->getKey());
    }

    public static function mediaForm(): array
    {
        return [
            FileUpload::make('path')
                ->label('Image')
                ->image()
                ->disk('public')
                ->directory('media')
                ->visibility('public')
                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                ->maxSize(5120)
                ->helperText('JPEG, PNG or WebP up to 5 MB. Saved as optimized WebP.')
                ->required(),
            TextInput::make('title')->required()->maxLength(255),
            TextInput::make('alt_text')
                ->label('Alt text')
                ->required()
                ->maxLength(255)
                ->helperText('Describe the image for screen readers and search engines.'),
            TextInput::make('folder')->default('general')->required()->maxLength(60),
        ];
    }

    public static function rich(string $name, ?string $label = null): RichEditor
    {
        return RichEditor::make($name)
            ->label($label ?? Str::headline($name))
            ->toolbarButtons([
                ['bold', 'italic', 'link'],
                ['h2', 'h3'],
                ['bulletList', 'orderedList', 'blockquote'],
                ['undo', 'redo'],
            ]);
    }

    /** Title and short text pairs stored as JSON. */
    public static function items(string $name, string $label, bool $withIcon = false, bool $withLink = false, bool $withMedia = false): Repeater
    {
        return Repeater::make($name)
            ->label($label)
            ->schema(array_filter([
                TextInput::make('title')->required()->maxLength(160),
                Textarea::make('text')->rows(2)->maxLength(600),
                $withIcon ? self::icon() : null,
                $withLink ? TextInput::make('cta_label')->label('Button label')->maxLength(60) : null,
                $withLink ? TextInput::make('cta_url')->label('Button link')->maxLength(255) : null,
                $withMedia ? self::media('media_id', 'Slide image') : null,
            ]))
            ->itemLabel(fn (array $state) => $state['title'] ?? null)
            ->collapsed()
            ->defaultItems(0)
            ->reorderableWithButtons();
    }

    public static function seo(): Section
    {
        return Section::make('Search and social')
            ->description('Leave blank to fall back to the title and summary above.')
            ->relationship('seo')
            ->collapsed()
            ->schema([
                TextInput::make('meta_title')->maxLength(70),
                Textarea::make('meta_description')->rows(2)->maxLength(170),
                TextInput::make('canonical_url')->url()->maxLength(255),
                self::media('og_media_id', 'Social sharing image'),
                Toggle::make('noindex')->label('Hide from search engines'),
            ]);
    }

    /** Label/URL pairs for navigation and footer links. */
    public static function links(string $name, string $label): Repeater
    {
        return Repeater::make($name)
            ->label($label)
            ->schema([
                TextInput::make('label')->required()->maxLength(60),
                TextInput::make('url')->required()->maxLength(255),
            ])
            ->columns(2)
            ->reorderableWithButtons()
            ->defaultItems(0);
    }
}
