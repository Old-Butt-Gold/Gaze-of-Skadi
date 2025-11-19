using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Dto;
using GoS.Domain.Common.Models;
using GoS.Domain.Extensions;
using MediatR;

namespace GoS.Application.Features.Common.Queries.GetRecordsByField;

internal sealed class GetRecordsByFieldHandler(IRequester requester, IMapper mapper, IResourceManager resourceManager)
    : IRequestHandler<GetRecordsByFieldQuery, IEnumerable<RecordDto>?>
{
    public async Task<IEnumerable<RecordDto>?> Handle(GetRecordsByFieldQuery request, CancellationToken ct)
    {
        var path = $"records/{request.Field.ToSnakeCase()}";
        var records = await requester.GetResponseAsync<IEnumerable<Record>>(path, ct: ct);

        if (records == null)
            return null;
        
        var recordDtos = mapper.Map<IEnumerable<RecordDto>>(records);
        
        var heroes = await resourceManager.GetHeroInfosAsync();

        foreach (var recordDto in recordDtos.Where(x => x.HeroId.HasValue))
        {
            var heroKey = recordDto.HeroId.Value.ToString();
            if (heroes.TryGetValue(heroKey, out var heroInfo))
            {
                recordDto.HeroInfo = mapper.Map<HeroInfoDto>(heroInfo);
            }
        }

        return recordDtos;
    }
}