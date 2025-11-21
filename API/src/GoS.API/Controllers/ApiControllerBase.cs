using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class ApiControllerBase : ControllerBase
{
    protected readonly ISender Sender;

    protected ApiControllerBase(ISender sender)
    {
        Sender = sender;
    }

    protected async Task<IActionResult> HandleQueryAsync<T>(IRequest<T?> query, CancellationToken ct = default)
    {
        var result = await Sender.Send(query, ct);
        
        // Если результат null, возвращаем 404, иначе 200 OK
        return result is null ? NotFound() : Ok(result);
    }
}