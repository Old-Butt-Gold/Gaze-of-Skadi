using AutoMapper;
using GoS.Application.Dto;

namespace GoS.Application.AutoMapper;

public class EnumToBaseEnumDtoConverter<T> : ITypeConverter<T, BaseEnumDto<T>>
    where T : Enum
{
    public BaseEnumDto<T> Convert(T source, BaseEnumDto<T> destination, ResolutionContext context) 
        => BaseEnumDto<T>.FromEnum(source);
}