using MusalaSoft.GatewayAPI.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;

namespace MusalaSoft.GatewayAPI.Models
{
    public class Gateway : IValidatableObject
    {
        public int ID { get; set; }
        public string SerialNumber { get; set; }
        public string Name { get; set; }
        public string IPv4 { get; set; }
        public IList<Peripheral> Peripherals { get; } = new List<Peripheral>();
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            using (var context = new MusalaSoftGatewayAPIContext())
            {
                var existingGateway = context.Gateways.FirstOrDefault(u => u.SerialNumber == this.SerialNumber && u.ID != this.ID);
                if (existingGateway != null)
                {
                    yield return new ValidationResult("A Gateway with this serial number already exist", new[] { "SerialNumber" });
                }
            }
            IPAddress ip;
            bool ValidateIP = IPAddress.TryParse(IPv4, out ip);
            if (!ValidateIP)
                yield return new ValidationResult("IP address format is invalid", new[] { "IPv4" });
        }
    }
}