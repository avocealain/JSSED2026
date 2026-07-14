@props(['url'])

<table class="header" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td class="content-cell" align="center">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'JSSED 2026')
<img src="{{ asset('favicon.png') }}" class="logo" alt="Logo JSSED" style="max-width: 100px; border: none;">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
</table>
