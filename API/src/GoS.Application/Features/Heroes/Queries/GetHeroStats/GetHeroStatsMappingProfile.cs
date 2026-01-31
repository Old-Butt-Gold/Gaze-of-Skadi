using AutoMapper;
using GoS.Domain.Heroes.Models;

namespace GoS.Application.Features.Heroes.Queries.GetHeroStats;

public class GetHeroStatsMappingProfile : Profile
{
    public GetHeroStatsMappingProfile()
    {
        CreateMap<HeroStats, HeroStatsGroupedDto>()
            .ForMember(dest => dest.Turbo, opt => opt.MapFrom(src => src))
            .ForMember(dest => dest.Pro, opt => opt.MapFrom(src => src))
            .ForMember(dest => dest.Ranked, opt => opt.MapFrom(src => src));

        CreateMap<HeroStats, TurboStatsDto>()
            .ForMember(dest => dest.Pick, opt => opt.MapFrom(src => src.TurboPicks))
            .ForMember(dest => dest.Win, opt => opt.MapFrom(src => src.TurboWins));

        CreateMap<HeroStats, ProStatsDto>()
            .ForMember(dest => dest.Pick, opt => opt.MapFrom(src => src.ProPick))
            .ForMember(dest => dest.Win, opt => opt.MapFrom(src => src.ProWin))
            .ForMember(dest => dest.Ban, opt => opt.MapFrom(src => src.ProBan));

        CreateMap<HeroStats, RankedStatsDto>()
            .ForMember(dest => dest.Herald, opt => opt.MapFrom(src => new RankTierStatsDto
            {
                Pick = src.HeraldPicks,
                Win = src.HeraldWins
            }))
            .ForMember(dest => dest.Guardian, opt => opt.MapFrom(src => new RankTierStatsDto
            {
                Pick = src.GuardianPicks,
                Win = src.GuardianWins
            }))
            .ForMember(dest => dest.Crusader, opt => opt.MapFrom(src => new RankTierStatsDto
            {
                Pick = src.CrusaderPicks,
                Win = src.CrusaderWins
            }))
            .ForMember(dest => dest.Archon, opt => opt.MapFrom(src => new RankTierStatsDto
            {
                Pick = src.ArchonPicks,
                Win = src.ArchonWins
            }))
            .ForMember(dest => dest.Legend, opt => opt.MapFrom(src => new RankTierStatsDto
            {
                Pick = src.LegendPicks,
                Win = src.LegendWins
            }))
            .ForMember(dest => dest.Ancient, opt => opt.MapFrom(src => new RankTierStatsDto
            {
                Pick = src.AncientPicks,
                Win = src.AncientWins
            }))
            .ForMember(dest => dest.Divine, opt => opt.MapFrom(src => new RankTierStatsDto
            {
                Pick = src.DivinePicks,
                Win = src.DivineWins
            }))
            .ForMember(dest => dest.Pub, opt => opt.MapFrom(src => new RankTierStatsDto
            {
                Pick = src.PubPicks,
                Win = src.PubWins
            }));
    }
}
