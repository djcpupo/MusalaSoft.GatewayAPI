using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MusalaSoft.GatewayAPI.Data;
using MusalaSoft.GatewayAPI.Logic;
using MusalaSoft.GatewayAPI.Models;
using MusalaSoft.GatewayAPI.Responses;

namespace MusalaSoft.GatewayAPI.Controllers
{
    public class GatewaysController : ApiController
    {
        private MusalaSoftGatewayAPIContext db = new MusalaSoftGatewayAPIContext();
        private GatewayBL gatewayBL = new GatewayBL();

        // GET: api/Gateways
        public GatewayList_Response GetGateways(int? page = 1, int? count = 1000)
        {
            return gatewayBL.GetList(page.Value, count.Value);
        }

        // GET: api/Gateways/5
        [ResponseType(typeof(Gateway))]
        public IHttpActionResult GetGateway(int id)
        {
            Gateway gateway = gatewayBL.GetFullGateway(id);
            if (gateway == null)
            {
                return NotFound();
            } 

            return Ok(gateway);
        }

        // PUT: api/Gateways/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGateway(int id, Gateway gateway)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gateway.ID)
            {
                ModelState.AddModelError("ID", new Exception("ID did not match"));
                return BadRequest(ModelState);
            }
            db.Entry(gateway).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!gatewayBL.GatewayExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(gateway);
        }

        // POST: api/Gateways
        [ResponseType(typeof(Gateway))]
        public IHttpActionResult PostGateway(Gateway gateway)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }   
            if(gateway.Peripherals.Count > 10)
            {
                ModelState.AddModelError("gateway.Peripherals", new Exception("Only 10 peripherals allowed"));
                return BadRequest(ModelState);
            }
            gateway = gatewayBL.CreateGateway(gateway);
            return CreatedAtRoute("DefaultApi", new { id = gateway.ID }, gateway);
        }

        // DELETE: api/Gateways/5
        [ResponseType(typeof(Gateway))]
        public IHttpActionResult DeleteGateway(int id)
        {
            Gateway gateway = db.Gateways.Find(id);
            if (gateway == null)
            {
                return NotFound();
            }

            gatewayBL.DeleteGatewway(id);
            return Ok(gateway);
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