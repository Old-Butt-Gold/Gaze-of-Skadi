using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Options;
using GoS.Domain.Search.Models;
using MediatR;

namespace GoS.Application.Features.Search.Queries.GetPlayersByName;

internal sealed class GetPlayersByNameHandler(IRequester<OpenDotaHttpRequesterOptions> requester, IMapper mapper)
    : IRequestHandler<GetPlayersByNameQuery, IEnumerable<PlayerResponseDto>?>
{
    public async Task<IEnumerable<PlayerResponseDto>?> Handle(GetPlayersByNameQuery request, CancellationToken ct)
    {
        var parameters = new[]
        {
            new KeyValuePair<string, string>("q", request.PersonaName)
        };

        var response = await requester.GetResponseAsync<IEnumerable<PlayerResponse>>("search", parameters, ct);

        return response is null ? null : mapper.Map<IEnumerable<PlayerResponseDto>>(response);
    }
}
