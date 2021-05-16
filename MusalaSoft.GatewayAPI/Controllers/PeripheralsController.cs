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

namespace MusalaSoft.GatewayAPI.Controllers
{
    public class PeripheralsController : ApiController
    {
        private MusalaSoftGatewayAPIContext db = new MusalaSoftGatewayAPIContext();
        PeripheralBL peripheralBL = new PeripheralBL();

        // GET: api/Peripherals
        public IQueryable<Peripheral> GetPeripherals()
        {
            return db.Peripherals;
        }

        // GET: api/Peripherals/5
        [ResponseType(typeof(Peripheral))]
        public IHttpActionResult GetPeripheral(int id)
        {
            Peripheral peripheral = db.Peripherals.Find(id);
            if (peripheral == null)
            {
                return NotFound();
            }

            return Ok(peripheral);
        }

        // PUT: api/Peripherals/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPeripheral(int id, Peripheral peripheral)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != peripheral.ID)
            {
                return BadRequest();
            }

            db.Entry(peripheral).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PeripheralExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Peripherals
        [ResponseType(typeof(Peripheral))]
        public IHttpActionResult PostPeripheral(Peripheral peripheral)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (peripheral.GatewayID == 0)
            {
                ModelState.AddModelError("GatewayID", new Exception("GatewayID is required"));
                return BadRequest(ModelState);
            }
            var gateway = db.Gateways.Find(peripheral.GatewayID);
            if(gateway == null)
            {
                return NotFound();
            }
            var periferalCount = db.Peripherals.Where(p => p.GatewayID == peripheral.GatewayID).Count();
            if (periferalCount >= 10)
            {
                ModelState.AddModelError("peripheral", new Exception("Only 10 peripherals allowed"));
                return BadRequest(ModelState);
            }
            peripheral = peripheralBL.AddPeripheral(peripheral);

            return CreatedAtRoute("DefaultApi", new { id = peripheral.ID }, peripheral);
        }

        // DELETE: api/Peripherals/5
        [ResponseType(typeof(Peripheral))]
        public IHttpActionResult DeletePeripheral(int id)
        {
            Peripheral peripheral = db.Peripherals.Find(id);
            if (peripheral == null)
            {
                return NotFound();
            }

            db.Peripherals.Remove(peripheral);
            db.SaveChanges();

            return Ok(peripheral);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PeripheralExists(int id)
        {
            return db.Peripherals.Count(e => e.ID == id) > 0;
        }
    }
}