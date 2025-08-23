using System.Text.Json.Serialization;

namespace GoS.Domain.Resources.Models.ItemColors;

public enum ItemType
{
    Rare,
    Artifact,

    [JsonPropertyName("secret_shop")]
    SecretShop,

    Consumable,
    Common,
    Epic,
    Component,
}
