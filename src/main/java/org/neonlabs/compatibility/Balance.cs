namespace NeonCompatibility.org.neonlabs.compatibility
{
    using System;
    using System.Threading.Tasks;
    using Nethereum.Hex.HexTypes;
    using Nethereum.Web3;
    public class Balance
    {
        public static async Task<HexBigInteger> GetBalance()
        {
            var web3 = Connection.Connect();
            var balance = await web3.Eth.GetBalance.SendRequestAsync("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");
            Console.WriteLine($"Balance in Wei: {balance.Value}");

            var etherAmount = Web3.Convert.FromWei(balance.Value);
            Console.WriteLine($"Balance in Ether: {etherAmount}");

            return balance;
        }
    }
}
