using AutoMapper;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchPlayersById;

internal sealed class GetMatchPlayersByIdHandler(ISender sender, IMapper mapper) : IRequestHandler<GetMatchPlayersByIdQuery, IEnumerable<PlayerInfoDto>?>
{
    public async Task<IEnumerable<PlayerInfoDto>?> Handle(GetMatchPlayersByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        return match?.Players.Select(mapper.Map<PlayerInfoDto>).ToList();
    }
}
