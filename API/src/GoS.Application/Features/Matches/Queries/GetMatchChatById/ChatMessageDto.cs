using GoS.Application.Dto;
using GoS.Domain.Matches.Enums;

namespace GoS.Application.Features.Matches.Queries.GetMatchChatById;

public record ChatMessageDto
{
    public required PlayerInfoDto PlayerInfo { get; set; }
    public required ChatDataDto Data { get; set; }
}

public class ChatDataDto
{
    public int Time { get; set; }
    public required BaseEnumDto<ChatType> Type { get; set; }
    public required string Message { get; set; }
    public string? SoundUrl { get; set; }
    public string? ImageUrl { get; set; }
}
