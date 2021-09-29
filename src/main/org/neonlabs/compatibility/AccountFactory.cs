namespace NeonCompatibility.org.neonlabs.compatibility
{
    using Nethereum.Hex.HexConvertors.Extensions;
    using Nethereum.Web3.Accounts;
    using static Nethereum.Signer.EthECKey;
    
    public class AccountFactory
    {
        public static Account CreateAccount()
        {
            new Config();
            var ecKey = GenerateKey();
            var privateKey = ecKey.GetPrivateKeyAsBytes().ToHex();
            return new Account(privateKey);
        }
    }
}