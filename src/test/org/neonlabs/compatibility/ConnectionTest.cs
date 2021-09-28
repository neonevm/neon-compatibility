namespace org.neonlabs.compatibility
{
    using Allure.Xunit.Attributes;
    using Xunit;

    [AllureSuite("Nethereum")]
    public class ConnectionTest
    {
        [AllureXunit(DisplayName = "Connection test")]
        public void ShouldConnectAsync()
        {
            var web3 = Connection.Connect();
            Assert.NotNull(web3);
        }

        [AllureXunit(DisplayName = "Balance")]
        public async void ShouldGetBalance()
        {
            var balance = await Balance.GetBalance();
            Assert.NotNull(balance);
        }
    }
}