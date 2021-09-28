namespace org.neonlabs.compatibility
{
    using System;
    using System.Threading.Tasks;
    using Nethereum.Web3;
    using dotenv.net.Utilities;

    public class Connection
    {
        public static async Task Connect()
        {
            new Config();

            Console.WriteLine("===================");
            Console.WriteLine(EnvReader.GetStringValue("HTTP_URL"));

            var web3 = new Web3(EnvReader.GetStringValue("HTTP_URL"));
            var balance = await web3.Eth.GetBalance.SendRequestAsync("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");
            Console.WriteLine($"Balance in Wei: {balance.Value}");

            var etherAmount = Web3.Convert.FromWei(balance.Value);
            Console.WriteLine($"Balance in Ether: {etherAmount}");
        }
    }
}