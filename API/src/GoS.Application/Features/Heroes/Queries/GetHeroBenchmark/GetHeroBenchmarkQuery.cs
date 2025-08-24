using GoS.Domain.Heroes.Models;
using MediatR;

namespace GoS.Application.Features.Heroes.Queries.GetHeroBenchmark;

public record GetHeroBenchmarkQuery(int HeroId) : IRequest<Benchmark?>;