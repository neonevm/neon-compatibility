using Nethereum.RPC.Eth;

namespace NeonCompatibility.Tests.org.neonlabs.compatibility
{
    using Allure.Xunit.Attributes;
    using NeonCompatibility.org.neonlabs.compatibility;
    using Xunit;

    [AllureSuite("Nethereum")]
    public class ConnectionTest
    {
        [AllureXunit(DisplayName = "Connection test")]
        public void ShouldConnect()
        {
            var web3 = Connection.Connect();
            Assert.NotNull(web3);
        }
        
        [AllureXunit(DisplayName = "Subprojects are filled in")]
        public void ShouldHaveData()
        {
            var web3 = Connection.Connect();
            Assert.NotNull(web3);
            // Assert.All<IEthAccounts>(web3.Eth.Accounts.,w=>
            // {
            //     Assert.NotNull(w);
            //     // Assert.Collection(web3.Eth.Accounts);
            // });
            // web3.Eth.Accounts
            // web3.Eth.Accounts
            // web
            // Assert.All(web3, w=>w);
        }

        [AllureXunit(DisplayName = "GetBalance Async")]
        public async void ShouldGetBalanceAsync()
        {
            var balance = await Balance.GetBalance();
            Assert.NotNull(balance);
        }
        
        [AllureXunit(DisplayName = "GetBalance Async")]
        public async void ShouldGetInitialBalanceAsync()
        {
            var balance = await Balance.GetBalance();
            Assert.NotNull(balance);
        }
    }
}