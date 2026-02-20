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
        // TODO also save values from https://github.com/odota/media/tree/master/chatwheel, chat.Key = 129002 e.g.
        foreach (var chat in match.Chat.OrderBy(x => x.Time))
        {
            int index = (int)chat.Slot;

            switch (chat.Type)
            {
                case ChatType.Chat:
                    yield return new ChatMessageDto
                    {
                        PlayerIndex = index,
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
                        PlayerIndex = index,
                        Data = new ChatDataDto
                        {
                            Time = chat.Time,
                            Message = resource.Message ?? string.Empty,
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
