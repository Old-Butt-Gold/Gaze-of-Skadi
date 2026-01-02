using GoS.Application.Dto;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchChatById;

public record ChatMessageDto
{
    public PlayerInfoDto PlayerInfo { get; set; }
    public ChatDataDto Data { get; set; }
}

public class ChatDataDto
{
    public int Time { get; set; }
    public BaseEnumDto<ChatType> Type { get; set; }
    public string Message { get; set; }
    public string? SoundExtension { get; set; }
    public string? Url { get; set; }
    public string? Image { get; set; }
}