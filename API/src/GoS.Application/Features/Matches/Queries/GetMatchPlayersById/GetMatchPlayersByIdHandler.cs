using AutoMapper;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.BaseEnums;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchPlayersById;

internal sealed class GetMatchPlayersByIdHandler(ISender sender, IMapper mapper)
    : IRequestHandler<GetMatchPlayersByIdQuery, MatchPlayerInformationDto?>
{
    public async Task<MatchPlayerInformationDto?> Handle(GetMatchPlayersByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null) return null;

        return new MatchPlayerInformationDto
        {
            IsMatchParsed = mapper.Map<BaseEnumDto<BooleanState>>(match.Version is > 0 ? BooleanState.True : BooleanState.False),
            Players = match?.Players.Select(mapper.Map<PlayerInfoDto>).ToList() ?? [],
        };
    }
}
