using GoS.Application.Features.Heroes.Common;
using GoS.Application.Features.Heroes.Common.Interfaces;
using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroRanking;

public record GetHeroRankingsQuery(int HeroId) : IRequest<HeroRanking?>, IHeroIdRequest;