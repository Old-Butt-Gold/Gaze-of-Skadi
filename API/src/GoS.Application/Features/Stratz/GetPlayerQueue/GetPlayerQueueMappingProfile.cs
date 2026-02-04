using AutoMapper;
using GoS.Domain.Stratz;

namespace GoS.Application.Features.Stratz.GetPlayerQueue;

public class GetPlayerQueueMappingProfile : Profile
{
    public GetPlayerQueueMappingProfile()
    {
        CreateMap<PlayersQueue, PlayersQueueDto>();
    }
}
