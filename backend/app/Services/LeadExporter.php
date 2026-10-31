<?php

namespace App\Services;

use App\Models\Lead;
use Illuminate\Database\Eloquent\Builder;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LeadExporter
{
    private const HEADINGS = ['ID', 'Received', 'Status', 'Name', 'Business', 'Email', 'Phone', 'Website', 'Service', 'Budget', 'Message'];

    public function download(Builder $query): StreamedResponse
    {
        return response()->streamDownload(function () use ($query) {
            $out = fopen('php://output', 'w');
            fputcsv($out, self::HEADINGS);

            $query->clone()->lazyByIdDesc(500, 'id')->each(function (Lead $lead) use ($out) {
                fputcsv($out, array_map($this->neutralizeFormula(...), [
                    $lead->id,
                    $lead->created_at?->toDateTimeString(),
                    $lead->status->getLabel(),
                    $lead->full_name,
                    $lead->business_name,
                    $lead->email,
                    $lead->phone,
                    $lead->website,
                    $lead->service_name,
                    $lead->budget,
                    $lead->message,
                ]));
            });

            fclose($out);
        }, 'leads-'.now()->format('Y-m-d').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    /** Spreadsheet apps execute cells starting with these, and this text came from the public. */
    private function neutralizeFormula(mixed $value): mixed
    {
        return is_string($value) && preg_match('/^[=+\-@\t\r]/', $value) ? "'".$value : $value;
    }
}
