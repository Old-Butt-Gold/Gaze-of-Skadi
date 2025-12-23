using GoS.Application.Abstractions;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchOverviewById;

internal sealed class GetMatchOverviewByIdHandler(ISender sender, IResourceManager resourceManager)
    : IRequestHandler<GetMatchOverviewByIdQuery, Match?>
{
    public async Task<Match?> Handle(GetMatchOverviewByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);

        if (match is null)
        {
            return null;
        }
        
        return match;
    }
}