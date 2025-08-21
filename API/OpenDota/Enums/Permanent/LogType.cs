using System.Text.Json.Serialization;

namespace OpenDota.Enums.Permanent;

public enum LogType
{
    [JsonPropertyName("buyback_log")] 
    BuybackLog,
    
    [JsonPropertyName("connection_log")]
    ConnectionLog,
    
    [JsonPropertyName("max_hero_hit")]
    MaxHeroHit,
    
    [JsonPropertyName("obs_left_log")]
    ObsLeftLog,
    
    [JsonPropertyName("obs_log")]
    ObsLog,
    
    [JsonPropertyName("sen_left_log")]
    SenLeftLog,
    
    [JsonPropertyName("sen_log")]
    SenLog,
}