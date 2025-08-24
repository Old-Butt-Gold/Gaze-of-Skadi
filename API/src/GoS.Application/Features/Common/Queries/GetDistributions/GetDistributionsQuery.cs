using GoS.Domain.Common.Models;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetDistributions;

public record GetDistributionsQuery : IRequest<Distribution?>;