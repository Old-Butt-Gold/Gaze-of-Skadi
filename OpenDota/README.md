# OpenDota.NET

## .NET wrapper for the OpenDota API

The OpenDota API provides Dota 2 related data including advanced match data extracted from match replays.

Full documentation is available on [OpenDota](https://docs.opendota.com/).

Some of the data types can be found in the [dotaconstants](https://github.com/odota/dotaconstants) repository.

[![NuGet version](https://badge.fury.io/nu/OpenDota.NET.Remade.svg)](https://badge.fury.io/nu/OpenDota.NET.Remade/)

## Example

```csharp
var openDota = new OpenDotaApi();
var matchDetails = await openDota.Matches.GetMatchByIdAsync(4986133311);

Console.WriteLine($"{matchDetails.RadiantTeam.Name} vs {matchDetails.DireTeam.Name} - {matchDetails.RadiantScore}:{matchDetails.DireScore}.");
Console.WriteLine($"Duration of game: {TimeSpan.FromSeconds(matchDetails.Duration):mm\:ss}.");
```