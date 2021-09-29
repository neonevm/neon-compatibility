namespace NeonCompatibility.org.neonlabs.compatibility
{
    using dotenv.net;
    public class Config
    {
        public Config()
        {
            DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] { "../../../../../.env" }));
        }
    }
}