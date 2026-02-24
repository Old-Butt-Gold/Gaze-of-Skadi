using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchObjectivesById;

internal sealed class GetMatchObjectivesByIdHandler(ISender sender, IMapper mapper, IResourceManager resourceManager)
    : IRequestHandler<GetMatchObjectivesByIdQuery, IEnumerable<PlayerObjectivesDto>?>
{
    public async Task<IEnumerable<PlayerObjectivesDto>?> Handle(GetMatchObjectivesByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null)
        {
            return null;
        }

        var resources = await resourceManager.GetObjectiveNamesAsync();
        var hashSet = resources!.ToHashSet();

        return match.Players
            .Select((player, index) => new PlayerObjectivesDto
            {
                PlayerIndex = index,
                Objectives = GetObjectivesForPlayer(hashSet!, player),
            })
            .ToList();
    }

    private ObjectivesDataDto GetObjectivesForPlayer(HashSet<string> objectives, MatchPlayer player)
    {
        var damages = player.Damage
            .Where(x => objectives.Contains(x.Key))
            .Select(damage => new DamageDataDto { Key = damage.Key, Value = damage.Value, })
            .ToList();

        var runes = player.Runes.
            Select(rune => new RunesDataDto { Key = mapper.Map<BaseEnumDto<Runes>>(rune.Key), Value = rune.Value, })
            .ToList();

        return new ObjectivesDataDto
        {
            Damage = damages,
            Runes = runes,
        };
    }
}
