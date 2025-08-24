using GoS.Application.EndpointParameters;
using GoS.Domain.Matches.Models;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetPublicMatches;

public record GetPublicMatchesQuery(PublicMatchesEndpointParameters Parameters) : IRequest<IEnumerable<PublicMatch>?>;