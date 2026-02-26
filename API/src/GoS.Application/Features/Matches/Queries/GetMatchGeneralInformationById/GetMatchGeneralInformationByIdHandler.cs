using AutoMapper;
using GoS.Application.Dto;
using GoS.Application.Features.Common.Queries.GetLeagues;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.BaseEnums;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchGeneralInformationById;

internal sealed class GetMatchGeneralInformationByIdHandler(ISender sender, IMapper mapper)
    : IRequestHandler<GetMatchGeneralInformationByIdQuery, MatchGeneralInformationDto?>
{
    public async Task<MatchGeneralInformationDto?> Handle(GetMatchGeneralInformationByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null) return null;

        return new MatchGeneralInformationDto
        {
            IsMatchParsed = mapper.Map<BaseEnumDto<BooleanState>>(match.Version is > 0 ? BooleanState.True : BooleanState.False),
            Players = match?.Players.Select(mapper.Map<PlayerInfoDto>).ToList() ?? [],
            MatchGeneral = MapMatchOverview(match!)
        };
    }

    private MatchHeaderInformationDto MapMatchOverview(Match match) =>
        new()
        {
            Winner = mapper.Map<BaseEnumDto<TeamEnum>>(match.RadiantWin == BooleanState.True
                ? TeamEnum.Radiant
                : TeamEnum.Dire),
            RadiantScore = match.RadiantScore,
            DireScore = match.DireScore,
            GameMode = mapper.Map<BaseEnumDto<GameMode>>(match.GameMode),
            LobbyType = mapper.Map<BaseEnumDto<LobbyType>>(match.LobbyType),
            Duration = match.Duration,
            StartTime = match.StartTime,
            Region = mapper.Map<BaseEnumDto<Region>>(match.Region),
            ReplayUrl = match.ReplayUrl,
            Patch = mapper.Map<BaseEnumDto<Patch>>(match.Patch),
            RadiantTeam = mapper.Map<MatchTeamDto?>(match.RadiantTeam),
            DireTeam = mapper.Map<MatchTeamDto?>(match.DireTeam),
            League = mapper.Map<LeagueDto?>(match.League),
        };
}
