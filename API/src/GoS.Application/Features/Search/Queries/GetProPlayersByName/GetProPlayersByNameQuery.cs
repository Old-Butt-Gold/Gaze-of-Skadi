using GoS.Domain.Search.Models;
using MediatR;

namespace GoS.Application.Features.Search.Queries.GetProPlayersByName;

public record GetProPlayersByNameQuery(string? Name) : IRequest<IEnumerable<ProPlayer>?>;