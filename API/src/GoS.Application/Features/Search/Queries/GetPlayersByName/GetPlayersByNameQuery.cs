using GoS.Domain.Search.Models;
using MediatR;

namespace GoS.Application.Features.Search.Queries.GetPlayersByName;

public record GetPlayersByNameQuery(string PersonaName) : IRequest<IEnumerable<PlayerResponse>?>;