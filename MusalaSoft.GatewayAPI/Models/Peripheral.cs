using MusalaSoft.GatewayAPI.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MusalaSoft.GatewayAPI.Models
{
    public class Peripheral : IValidatableObject
    {
        public int ID { get; set; }
        public int UID { get; set; }
        public string Vendor { get; set; }
        public DateTime DateCreated { get; set; }
        [Required]
        public int StatusID { get; set; }
        public PeripheralStatus Status { get; set; }
        public int GatewayID { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            using (var context = new MusalaSoftGatewayAPIContext())
            {
                var existingPeripheral = context.Peripherals.FirstOrDefault(u => u.UID == this.UID);
                if (existingPeripheral != null)
                {
                    yield return new ValidationResult("A Peripheral with UID '"+ this.UID.ToString() + "' already exist", new[] { "UID" });
                }
                var status = context.PeripheralStatuses.FirstOrDefault(u=>u.ID == this.StatusID);
                if (status == null)
                {
                    yield return new ValidationResult("The status with ID '" + StatusID.ToString() + "' does not exist", new[] { "StatusID" });
                }
            }
        }
    }
}