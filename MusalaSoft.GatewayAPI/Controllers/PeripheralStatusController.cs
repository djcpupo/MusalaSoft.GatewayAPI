using System.Linq;
using System.Web.Http;
using MusalaSoft.GatewayAPI.Data;
using MusalaSoft.GatewayAPI.Models;

namespace MusalaSoft.GatewayAPI.Controllers
{
    public class PeripheralStatusController : ApiController
    {
        private MusalaSoftGatewayAPIContext db = new MusalaSoftGatewayAPIContext();

        // GET: api/PeripheralStatus
        public IQueryable<PeripheralStatus> GetPeripheralStatuses()
        {
            return db.PeripheralStatuses;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}