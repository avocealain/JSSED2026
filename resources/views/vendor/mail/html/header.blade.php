@props(['url'])

<table class="header" align="center" width="50%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td class="content-cell" align="center">
<a href="{{ $url }}" style="display: inline-block;">
{{ $slot }}
</a>
</td>
</tr>
</table>
