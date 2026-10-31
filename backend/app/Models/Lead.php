<?php

namespace App\Models;

use App\Enums\LeadStatus;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lead extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'full_name', 'business_name', 'email', 'phone', 'website', 'service_id', 'service_name', 'budget',
        'message', 'status', 'source_page', 'ip_address', 'user_agent', 'fingerprint',
    ];

    protected function casts(): array
    {
        return ['status' => LeadStatus::class];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(LeadNote::class)->latest();
    }

    /** Every other time this email has reached out, newest first. */
    public function submissionHistory(): Collection
    {
        return static::query()
            ->where('email', $this->email)
            ->whereKeyNot($this->getKey())
            ->latest()
            ->get();
    }

    public function changeStatus(LeadStatus $status, ?User $by = null): void
    {
        if ($this->status === $status) {
            return;
        }

        $from = $this->status->getLabel();
        $this->update(['status' => $status]);

        $this->notes()->create([
            'user_id' => $by?->getKey(),
            'type' => LeadNote::TYPE_STATUS,
            'body' => "Status changed from {$from} to {$status->getLabel()}",
        ]);
    }
}
