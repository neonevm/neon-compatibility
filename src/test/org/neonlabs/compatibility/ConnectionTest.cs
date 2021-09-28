namespace org.neonlabs.compatibility
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Allure.Xunit.Attributes;

    [AllureSuite("Nethereum")]
    public class ConnectionTest
    {
        [AllureXunit(DisplayName = "Connection test")]
        public void ShouldConnect()
        {
            Connection.Connect().Wait();
        }
    }
}