<?php

use Illuminate\Support\Facades\Route;

// This host only serves the API and admin panel. The public site is the Next.js app.
Route::redirect('/', '/admin');
