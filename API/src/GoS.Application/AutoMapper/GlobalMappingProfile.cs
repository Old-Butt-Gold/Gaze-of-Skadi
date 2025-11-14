using System.Reflection;
using AutoMapper;
using GoS.Application.Dto;

namespace GoS.Application.AutoMapper;

public sealed class GlobalMappingProfile : Profile
{
    public static Assembly[] All => 
    [
        Application,
        Domain
    ];
    
    public static Assembly Application => typeof(AssemblyReference).Assembly;
    public static Assembly Domain => typeof(Domain.BaseEnums.Rank).Assembly;
    
    public GlobalMappingProfile() => RegisterEnumConverters(All);

    private void RegisterEnumConverters(Assembly[] assemblies)
    {
        foreach (var assembly in assemblies)
        {
            var enumTypes = assembly.GetTypes()
                .Where(t => t.IsEnum)
                .Distinct()
                .ToList();

            foreach (var method in enumTypes.Select(enumType => typeof(GlobalMappingProfile)
                         .GetMethod(nameof(CreateEnumMap), BindingFlags.NonPublic | BindingFlags.Instance)
                         ?.MakeGenericMethod(enumType)))
            {
                method?.Invoke(this, null);
            }
        }
    }

    private void CreateEnumMap<T>() where T : Enum
        => CreateMap<T, BaseEnumDto<T>>()
            .ConvertUsing(new EnumToBaseEnumDtoConverter<T>());
}