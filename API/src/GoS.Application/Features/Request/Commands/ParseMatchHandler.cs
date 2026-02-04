using GoS.Application.Abstractions;
using GoS.Application.Options;
using MediatR;

namespace GoS.Application.Features.Request.Commands;

internal sealed class ParseMatchHandler(IRequester<OpenDotaHttpRequesterOptions> requester) : IRequestHandler<ParseMatchCommand, bool>
{
    public async Task<bool> Handle(ParseMatchCommand request, CancellationToken ct)
    {
        await requester.PostRequestAsync<object>($"request/{request.MatchId}", null, ct);
        return true;
    }
}
