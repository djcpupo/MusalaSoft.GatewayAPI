using Microsoft.VisualStudio.TestTools.UnitTesting;
using MusalaSoft.GatewayAPI.Logic;
using MusalaSoft.GatewayAPI.Models;
using MusalaSoft.GatewayAPI.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace MusalaSoft.GatewayAPI.Logic.Tests
{
    [TestClass()]
    public class GatewayBLTests
    {
        [TestMethod()]
        public void GetListTest()
        {
            var list = new GatewayList_Response()
            {
                List = new List<Gateway>()
            };
            Assert.IsFalse(list.List.Count > 0);
        }

        [TestMethod()]
        public void GatewayExistsTest()
        {
            var gateway1 = new Gateway()
            {
                ID = 1,
                IPv4 = "1.2.3.2",
                Name = "Test",
                SerialNumber = "1"
            };
            var gateway2 = new Gateway()
            {
                ID = 2,
                IPv4 = "1.2.3.2",
                Name = "Test2",
                SerialNumber = "2"
            };
            var db = new List<Gateway>();
            db.Add(gateway1);
            db.Add(gateway2);
            var gateway = db.Find(g => g.ID == 1);
            Assert.IsNotNull(gateway);
        }

        [TestMethod()]
        public void CreateGatewayTest()
        {
            var gateway1 = new Gateway()
            {
                ID = 1,
                IPv4 = "1.2.3.2",
                Name = "Test",
                SerialNumber = "1"
            };
            var gateway2 = new Gateway()
            {
                ID = 2,
                IPv4 = "1.2.3.2",
                Name = "Test2",
                SerialNumber = "2"
            };
            var gateway3 = new Gateway()
            {
                IPv4 = "1.2.3.5",
                Name = "Test3",
                SerialNumber = "3"
            };
            var db = new List<Gateway>();
            db.Add(gateway1);
            db.Add(gateway2);
            IPAddress ip;
            bool ValidateIP = IPAddress.TryParse(gateway3.IPv4, out ip);
            Assert.IsTrue(ValidateIP);
            Assert.IsTrue(db.Where(g=>g.SerialNumber == gateway3.SerialNumber).Count() == 0);
        }
    }
}