using AutoMapper;
using GoS.Application.Abstractions;
using GoS.Application.Dto;
using GoS.Application.Features.Matches.Queries.GetMatchById;
using GoS.Domain.Matches.Enums;
using GoS.Domain.Matches.Models;
using GoS.Domain.Resources.Models.ChatWheels;
using MediatR;

namespace GoS.Application.Features.Matches.Queries.GetMatchChatById;

internal sealed class GetMatchChatByIdHandler(ISender sender, IMapper mapper, IResourceManager resourceManager)
    : IRequestHandler<GetMatchChatByIdQuery, IEnumerable<ChatMessageDto>?>
{
    public async Task<IEnumerable<ChatMessageDto>?> Handle(GetMatchChatByIdQuery request, CancellationToken ct)
    {
        var match = await sender.Send(new GetMatchByIdQuery(request.MatchId), ct);
        if (match is null) return null;

        var chatResources = await resourceManager.GetChatWheelsAsync();
        return GetChatDataForPlayers(chatResources!, match);
    }

    private IEnumerable<ChatMessageDto> GetChatDataForPlayers(Dictionary<string, ChatWheel> chatResources, Match match)
    {
        foreach (var chat in match.Chat)
        {
            var player = match.Players[(int)chat.Slot];
            var playerInfo = mapper.Map<PlayerInfoDto>(player);

            switch (chat.Type)
            {
                case ChatType.Chat:
                    yield return new ChatMessageDto
                    {
                        PlayerInfo = playerInfo,
                        Data = new ChatDataDto
                        {
                            Time = chat.Time,
                            Message = chat.Key,
                            Type = mapper.Map<BaseEnumDto<ChatType>>(chat.Type)
                        }
                    };
                    break;

                case ChatType.ChatWheel when chatResources.TryGetValue(chat.Key, out var resource):
                    yield return new ChatMessageDto
                    {
                        PlayerInfo = playerInfo,
                        Data = new ChatDataDto
                        {
                            Time = chat.Time,
                            Message = resource.Message!,
                            Type = mapper.Map<BaseEnumDto<ChatType>>(chat.Type),
                            SoundUrl = resource.Url,
                            ImageUrl = resource.Image,
                        }
                    };
                    break;
            }
        }
    }
}
