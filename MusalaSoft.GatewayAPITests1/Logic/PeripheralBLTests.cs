using Microsoft.VisualStudio.TestTools.UnitTesting;
using MusalaSoft.GatewayAPI.Logic;
using MusalaSoft.GatewayAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusalaSoft.GatewayAPI.Logic.Tests
{
    [TestClass()]
    public class PeripheralBLTests
    {
        [TestMethod()]
        public void AddPeripheralTest()
        {
            Peripheral peripheral1 = new Peripheral()
            {
                DateCreated = DateTime.Now,
                GatewayID = 1,
                StatusID = 1,
                UID = 234,
                Vendor = "Cisco"
            };
            Peripheral peripheral2 = new Peripheral()
            {
                DateCreated = DateTime.Now,
                GatewayID = 1,
                StatusID = 1,
                UID = 235,
                Vendor = "LG"
            };
            Peripheral peripheral3 = new Peripheral()
            {
                DateCreated = DateTime.Now,
                GatewayID = 1,
                StatusID = 1,
                UID = 235,
                Vendor = "Lenovo"
            };
            Assert.IsNull(peripheral1.Status);
            Assert.IsTrue(peripheral2.GatewayID != 0);
            List<Peripheral> db = new List<Peripheral>();
            db.Add(peripheral1);
            db.Add(peripheral2);
            //Test UID
            Assert.IsTrue(db.Where(p => p.UID == peripheral3.UID).Count() > 0);
        }
    }
}