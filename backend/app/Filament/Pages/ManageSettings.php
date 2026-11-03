<?php

namespace App\Filament\Pages;

use App\Filament\Support\Fields;
use App\Filament\Support\SettingDefinitions;
use App\Models\WebsiteSetting;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Components\EmbeddedSchema;
use Filament\Schemas\Components\Form;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use UnitEnum;

class ManageSettings extends Page
{
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string|UnitEnum|null $navigationGroup = 'Administration';

    protected static ?string $navigationLabel = 'Site Settings';

    protected static ?string $title = 'Site Settings';

    protected static ?string $slug = 'settings';

    public ?array $data = [];

    public static function canAccess(): bool
    {
        return auth()->user()?->can('manage settings') ?? false;
    }

    public function mount(): void
    {
        $state = [];

        foreach (SettingDefinitions::all() as $key => $isPublic) {
            data_set($state, $key, WebsiteSetting::value($key));
        }

        $state['forms']['budget_ranges'] = array_map(
            fn (string $label) => ['label' => $label],
            $state['forms']['budget_ranges'] ?? []
        );

        $this->form->fill($state);
    }

    public function form(Schema $schema): Schema
    {
        return $schema->statePath('data')->components([
            Tabs::make('Settings')->persistTabInQueryString()->tabs([
                Tab::make('Company')->schema([
                    TextInput::make('company.name')->label('Company name')->required()->maxLength(120)
                        ->regex('/^[^<>]+$/')
                        ->dehydrateStateUsing(fn (?string $state) => trim((string) $state))
                        ->helperText('Replaces {company} everywhere it appears in your content.'),
                    Fields::media('company.logo_media_id', 'Logo'),
                    Fields::media('company.banner_media_id', 'Default page banner')
                        ->helperText('Shown as a wide image below the heading on inner pages. Use real photos of your team, workspace, or work, at least 1920px wide.'),
                    TextInput::make('company.tagline')->maxLength(160),
                    Textarea::make('company.description')->label('Short description')->rows(3)->maxLength(500),
                ]),
                Tab::make('Contact')->schema([
                    TextInput::make('contact.phone')->tel()->maxLength(40),
                    TextInput::make('contact.email')->email()->maxLength(190),
                    Textarea::make('contact.address')->rows(2)->maxLength(300),
                ])->columns(1),
                Tab::make('Social')->schema([
                    TextInput::make('social.facebook')->url()->maxLength(255),
                    TextInput::make('social.instagram')->url()->maxLength(255),
                    TextInput::make('social.linkedin')->label('LinkedIn')->url()->maxLength(255),
                    TextInput::make('social.x')->label('X / Twitter')->url()->maxLength(255),
                    TextInput::make('social.youtube')->label('YouTube')->url()->maxLength(255),
                ])->columns(2),
                Tab::make('Header')->schema([
                    Fields::links('navigation.header', 'Header navigation')
                        ->helperText('The item linking to /services opens the mega menu, built from your services.'),
                    Toggle::make('navigation.show_utility_bar')->label('Show the phone and email bar above the header'),
                    TextInput::make('cta.header_label')->label('Header button label')->required()->maxLength(60),
                    TextInput::make('cta.header_url')->label('Header button link')->required()->maxLength(255),
                ]),
                Tab::make('Footer')->schema([
                    Fields::links('footer.quick_links', 'Quick links'),
                    Fields::links('footer.resources', 'Resources'),
                ]),
                Tab::make('SEO')->schema([
                    TextInput::make('seo.site_title')->label('Default site title')->maxLength(70),
                    TextInput::make('seo.title_template')->label('Page title template')->maxLength(70)
                        ->helperText('Use %s for the page title, for example: %s | {company}'),
                    Textarea::make('seo.default_description')->label('Default meta description')->rows(2)->maxLength(170),
                    Fields::media('seo.default_og_media_id', 'Default social sharing image'),
                ]),
                Tab::make('Analytics')->schema([
                    TextInput::make('analytics.ga4_id')->label('Google Analytics 4 ID')->placeholder('G-XXXXXXXXXX')
                        ->regex('/^G-[A-Z0-9]+$/')->maxLength(30),
                    TextInput::make('analytics.gtm_id')->label('Google Tag Manager ID')->placeholder('GTM-XXXXXXX')
                        ->regex('/^GTM-[A-Z0-9]+$/')->maxLength(30),
                ])->columns(2),
                Tab::make('Forms')->schema([
                    TextInput::make('notifications.lead_email')->label('Lead notification email')->email()->maxLength(190)
                        ->helperText('New leads and contact messages are emailed here. Never shown publicly.'),
                    Textarea::make('forms.success_message')->label('Success message')->rows(2)->maxLength(300),
                    Repeater::make('forms.budget_ranges')->label('Budget options')
                        ->schema([TextInput::make('label')->required()->maxLength(60)])
                        ->reorderableWithButtons()
                        ->defaultItems(0),
                ]),
            ]),
        ]);
    }

    public function content(Schema $schema): Schema
    {
        return $schema->components([
            Form::make([EmbeddedSchema::make('form')])
                ->id('settings-form')
                ->livewireSubmitHandler('save')
                ->footer([Actions::make([Action::make('save')->label('Save settings')->submit('save')])]),
        ]);
    }

    public function save(): void
    {
        abort_unless(static::canAccess(), 403);

        $state = $this->form->getState();
        $state['forms']['budget_ranges'] = array_column($state['forms']['budget_ranges'] ?? [], 'label');

        foreach (SettingDefinitions::all() as $key => $isPublic) {
            WebsiteSetting::put($key, data_get($state, $key), $isPublic);
        }

        Notification::make()->success()->title('Settings saved')->send();
    }
}
