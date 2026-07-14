@props([
    'header' => null,
    'footer' => null,
])

<x-mail::layout>
    {{-- Header --}}
    <x-slot:header>
        <x-mail::header :url="config('app.url')">
            {{ $header ?? config('app.name', 'JSSED 2026') }}
        </x-mail::header>
    </x-slot:header>

    {{-- Body --}}
    {{ $slot }}

    {{-- Footer --}}
    <x-slot:footer>
        <x-mail::footer>
            © {{ date('Y') }} {{ config('app.name', 'JSSED 2026') }}. Tous droits réservés.
        </x-mail::footer>
    </x-slot:footer>
</x-mail::layout>
