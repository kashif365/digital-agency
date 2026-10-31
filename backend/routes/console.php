<?php

use Illuminate\Support\Facades\Schedule;

// Admin API tokens expire after 8 hours. This clears the expired rows.
Schedule::command('sanctum:prune-expired --hours=24')->daily();
