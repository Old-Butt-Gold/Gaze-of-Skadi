using GoS.Domain.Players.Models;
using MediatR;

namespace GoS.Application.Features.Players.Queries.GetPlayerById;

public record GetPlayerByIdQuery(long AccountId) : IRequest<Player?>;