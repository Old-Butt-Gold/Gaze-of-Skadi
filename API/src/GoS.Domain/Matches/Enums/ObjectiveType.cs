using System.Text.Json.Serialization;

namespace GoS.Domain.Matches.Enums;

public enum ObjectiveType
{
    [JsonPropertyName("building_kill")]
    BuildingKill,

    [JsonPropertyName("CHAT_MESSAGE_FIRSTBLOOD")]
    ChatMessageFirstBlood,

    [JsonPropertyName("CHAT_MESSAGE_ROSHAN_KILL")]
    ChatMessageRoshanKill,

    [JsonPropertyName("CHAT_MESSAGE_AEGIS")]
    ChatMessageAegis,

    [JsonPropertyName("CHAT_MESSAGE_COURIER_LOST")]
    ChatMessageCourierLost,

    [JsonPropertyName("CHAT_MESSAGE_AEGIS_STOLEN")]
    ChatMessageAegisStolen,
    
    [JsonPropertyName("CHAT_MESSAGE_MINIBOSS_KILL")]
    ChatMessageTormentorKill,
}
