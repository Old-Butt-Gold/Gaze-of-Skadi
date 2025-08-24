using GoS.Application.EndpointParameters;

namespace GoS.Application.Features.Players.Common.Interfaces;

public interface IPlayerEndpointParametersRequest
{
    PlayerEndpointParameters Parameters { get; }
}