using GoS.Application.Abstractions;
using GoS.Application.Options;
using MediatR;

namespace GoS.Application.Features.Request.Commands;

internal sealed class ParseMatchHandler(IRequester<OpenDotaHttpRequesterOptions> requester) : IRequestHandler<ParseMatchCommand, bool>
{
    public async Task<bool> Handle(ParseMatchCommand request, CancellationToken ct)
    {
        var response = await requester.PostRequestAsync($"request/{request.MatchId}", null, ct);
        response.EnsureSuccessStatusCode();
        return true;
    }
}
