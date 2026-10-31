<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactSubmission extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'email', 'phone', 'subject', 'message', 'read_at',
        'source_page', 'ip_address', 'user_agent', 'fingerprint',
    ];

    protected function casts(): array
    {
        return ['read_at' => 'datetime'];
    }
}
