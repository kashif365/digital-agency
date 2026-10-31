<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum LeadStatus: string implements HasColor, HasLabel
{
    case New = 'new';
    case Contacted = 'contacted';
    case Qualified = 'qualified';
    case ProposalSent = 'proposal_sent';
    case Won = 'won';
    case Lost = 'lost';
    case Archived = 'archived';

    public function getLabel(): string
    {
        return match ($this) {
            self::ProposalSent => 'Proposal Sent',
            default => ucfirst($this->value),
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::New => 'info',
            self::Contacted => 'primary',
            self::Qualified, self::ProposalSent => 'warning',
            self::Won => 'success',
            self::Lost => 'danger',
            self::Archived => 'gray',
        };
    }
}
