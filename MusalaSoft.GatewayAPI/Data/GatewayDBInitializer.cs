using MusalaSoft.GatewayAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MusalaSoft.GatewayAPI.Data
{
    public class GatewayDBInitializer : DropCreateDatabaseIfModelChanges<MusalaSoftGatewayAPIContext>
    {
        protected override void Seed(MusalaSoftGatewayAPIContext context)
        {
            IList<PeripheralStatus> defaultStandards = new List<PeripheralStatus>();

            defaultStandards.Add(new PeripheralStatus() { Name = "Online" });
            defaultStandards.Add(new PeripheralStatus() { Name = "Offline" });

            context.PeripheralStatuses.AddRange(defaultStandards);

            base.Seed(context);
        }
    }
}