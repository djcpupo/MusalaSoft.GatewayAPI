using MusalaSoft.GatewayAPI.Data;
using MusalaSoft.GatewayAPI.Models;
using MusalaSoft.GatewayAPI.Responses;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MusalaSoft.GatewayAPI.Logic
{
    public class GatewayBL
    {
        private MusalaSoftGatewayAPIContext db = new MusalaSoftGatewayAPIContext();
        public GatewayList_Response GetList(int page, int count)
        {
            var total = db.Gateways.Count();
            var list = db.Gateways.Include("Peripherals").OrderBy(p => p.ID).Skip((page - 1) * count).Take(count);
            var response = new GatewayList_Response()
            {
                Page = page,
                PageElementsCount = list.Count(),
                List = list.ToList(),
                Total = total
            };
            return response;
        }
        public Gateway GetFullGateway(int id)
        {
            Gateway gateway = db.Gateways.Where(g => g.ID == id).Include("Peripherals").Include("Peripherals.Status").FirstOrDefault();
            return gateway;
        }

        public bool GatewayExists(int id)
        {
            return db.Gateways.Count(e => e.ID == id) > 0;
        }

        public bool DeleteGatewway(int id)
        {
            var gateway = db.Gateways.Include(e => e.Peripherals).Where(g=>g.ID == id).First();
            db.Gateways.Remove(gateway);
            return db.SaveChanges() == 1;
        }

        public Gateway CreateGateway(Gateway gateway)
        {
            var newGateway = db.Gateways.Create();
            newGateway.IPv4 = gateway.IPv4;
            newGateway.Name = gateway.Name;
            newGateway.SerialNumber = gateway.SerialNumber;
            foreach (var peripheral in gateway.Peripherals)
            {
                var newPeriperal = db.Peripherals.Create();
                newPeriperal.DateCreated = DateTime.Now;
                newPeriperal.StatusID = peripheral.StatusID;
                newPeriperal.UID = peripheral.UID;
                newPeriperal.Vendor = peripheral.Vendor;
                newGateway.Peripherals.Add(newPeriperal);
            }
            db.Gateways.Add(newGateway);
            db.SaveChanges();
            return newGateway;
        }

    }
}