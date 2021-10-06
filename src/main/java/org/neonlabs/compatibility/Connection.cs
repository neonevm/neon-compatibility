namespace NeonCompatibility.org.neonlabs.compatibility
{
    using System;
    using dotenv.net.Utilities;
    using Nethereum.Web3;
    public class Connection
    {
        public static Web3 Connect()
        {
            new Config();

            Console.WriteLine("===================");
            Console.WriteLine(EnvReader.GetStringValue("PROXY_URL"));

            var web3 = new Web3(EnvReader.GetStringValue("PROXY_URL"));
            Console.WriteLine(web3);
            return web3;
        }
    }
}