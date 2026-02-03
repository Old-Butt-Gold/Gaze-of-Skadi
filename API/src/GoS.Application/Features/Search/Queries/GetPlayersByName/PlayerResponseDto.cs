namespace GoS.Application.Features.Search.Queries.GetPlayersByName;

public class PlayerResponseDto
{
    public long? LastMatchTime { get; set; }
    public Uri? AvatarFull { get; set; }
    public string PersonaName { get; set; } = string.Empty;
    public long AccountId { get; set; }
}
