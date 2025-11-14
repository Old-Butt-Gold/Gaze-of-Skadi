namespace GoS.Application.Dto;

public class BaseEnumDto<T> where T : Enum
{
    public int Value { get; set; }
    public required string Name { get; set; }
    
    public static BaseEnumDto<T> FromEnum(T enumValue)
    {
        return new BaseEnumDto<T>
        {
            Value = Convert.ToInt32(enumValue),
            Name = enumValue.ToString()
        };
    }
}