using AutoMapper;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchCosmeticsById;

internal sealed class GetMatchCosmeticsByIdHandler(ISender sender, IMapper mapper)
    : IRequestHandler<GetMatchCosmeticsByIdQuery, IEnumerable<PlayerCosmeticsDto>?>
{
    public async Task<IEnumerable<PlayerCosmeticsDto>?> Handle(
        GetMatchCosmeticsByIdQuery request,
        CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        return match.Players.Select(p => new PlayerCosmeticsDto
        {
            PlayerInfo = mapper.Map<PlayerInfoDto>(p),
            Cosmetics = mapper.Map<IEnumerable<CosmeticDto>>(p.Cosmetics)
        });
    }
}