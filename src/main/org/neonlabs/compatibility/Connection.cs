namespace org.neonlabs.compatibility
{
    using System;
    using System.Threading.Tasks;
    using Nethereum.Web3;
    using dotenv.net.Utilities;

    public class Connection
    {
        public static Web3 Connect()
        {
            new Config();

            Console.WriteLine("===================");
            Console.WriteLine(EnvReader.GetStringValue("HTTP_URL"));

            var web3 = new Web3(EnvReader.GetStringValue("HTTP_URL"));
            Console.WriteLine(web3);
            return web3;
        }
    }
}