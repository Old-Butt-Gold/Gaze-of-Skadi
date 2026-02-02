using System.Text.Json.Serialization;

namespace GoS.Domain.Steam;

public class SteamNewsResponse
{
    [JsonPropertyName("appnews")]
    public required AppNews AppNews { get; set; }
}

public class AppNews
{
    [JsonPropertyName("appid")]
    public int AppId { get; set; }

    [JsonPropertyName("newsitems")]
    public required NewsItems NewsItems { get; set; }

    [JsonPropertyName("count")]
    public int Count { get; set; }
}

public class NewsItems
{
    [JsonPropertyName("newsitem")]
    public required List<NewsItem> NewsItemList { get; set; }
}

public class NewsItem
{
    [JsonPropertyName("gid")]
    public string Gid { get; set; } = string.Empty;

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("url")]
    public string Url { get; set; } = string.Empty;

    [JsonPropertyName("is_external_url")]
    public bool IsExternalUrl { get; set; }

    [JsonPropertyName("author")]
    public string Author { get; set; } = string.Empty;

    [JsonPropertyName("contents")]
    public string Contents { get; set; } = string.Empty;

    [JsonPropertyName("feedlabel")]
    public string FeedLabel { get; set; } = string.Empty;

    [JsonPropertyName("date")]
    public long Date { get; set; }

    [JsonPropertyName("feedname")]
    public string FeedName { get; set; } = string.Empty;

    [JsonPropertyName("feed_type")]
    public int FeedType { get; set; }

    [JsonPropertyName("appid")]
    public int AppId { get; set; }

    [JsonPropertyName("tags")]
    public Tags? Tags { get; set; }
}

public class Tags
{
    [JsonPropertyName("tag")]
    public List<string>? TagList { get; set; }
}
