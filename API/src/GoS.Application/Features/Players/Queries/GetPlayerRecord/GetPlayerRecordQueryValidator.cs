using FluentValidation;
using GoS.Application.Features.Players.Common.Interfaces;

namespace GoS.Application.Features.Players.Queries.GetPlayerRecord;

public class GetPlayerRecordValidator : AbstractValidator<GetPlayerRecordsQuery>
{
    public GetPlayerRecordValidator(IValidator<IPlayerEndpointParametersRequest> parametersValidator)
    {
        RuleFor(x => x)
            .SetValidator(parametersValidator);
    }
}
