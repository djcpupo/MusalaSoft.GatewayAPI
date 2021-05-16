using MusalaSoft.GatewayAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MusalaSoft.GatewayAPI.Responses
{
    public class GatewayList_Response
    {
        public int Page { get; set; }
        public int PageElementsCount { get; set; }
        public List<Gateway> List { get; set; }
        public int Total { get; set; }
    }
}