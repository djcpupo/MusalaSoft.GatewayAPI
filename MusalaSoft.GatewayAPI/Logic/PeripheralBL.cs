using MusalaSoft.GatewayAPI.Data;
using MusalaSoft.GatewayAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MusalaSoft.GatewayAPI.Logic
{
    public class PeripheralBL
    {
        private MusalaSoftGatewayAPIContext db = new MusalaSoftGatewayAPIContext();
        public bool RemovePeripheral(int id)
        {
            var peripheral = db.Peripherals.Find(id);
            db.Peripherals.Remove(peripheral);
            return db.SaveChanges() == 1;
        }

        public Peripheral AddPeripheral(Peripheral peripheral)
        {
            var newPeriperal = db.Peripherals.Create();
            newPeriperal.DateCreated = peripheral.DateCreated;
            newPeriperal.StatusID = peripheral.StatusID;
            newPeriperal.UID = peripheral.UID;
            newPeriperal.Vendor = peripheral.Vendor;
            newPeriperal.GatewayID = peripheral.GatewayID;
            db.Peripherals.Add(newPeriperal);
            db.SaveChanges();
            return newPeriperal;
        }
    }
}