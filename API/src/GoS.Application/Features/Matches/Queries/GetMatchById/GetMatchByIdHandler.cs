using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchById;

internal sealed class GetMatchByIdHandler(IRequester<OpenDotaHttpRequesterOptions> requester)
    : IRequestHandler<GetMatchByIdQuery, Match?>
{
    public Task<Match?> Handle(GetMatchByIdQuery request, CancellationToken ct)
    {
        return requester.GetResponseAsync<Match?>($"matches/{request.MatchId}", ct: ct);
    }
}
