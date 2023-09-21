using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class errorController : BaseApiCOntroller
{
    [HttpGet("not-found")]
    public ActionResult GetNotFound()
    {
        return NotFound();
    }

    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
        return BadRequest(new ProblemDetails { Title = "This is a bad request" });
    }

    [HttpGet("unauthorized")]
    public ActionResult GetUnauthorized()
    {
        return Unauthorized();
    }

    [HttpGet("validation-error")]
    public ActionResult GetValidationError()
    {
        ModelState.AddModelError("Problem1", "This is a problem one error");
        ModelState.AddModelError("Problem2", "This is a problem two error");
        return ValidationProblem();
    }

    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
        throw new Exception("This is a server error");
    }


}

