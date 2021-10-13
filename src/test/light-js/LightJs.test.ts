import light, { balanceOf$ } from '@parity/light.js';
import Api from '@parity/api';

/*
// Wait for web3.currentProvider to be injected
window.addEventListener('load', () => {
  // Tell light.js to use MetaMask provider
  light.setProvider(window.web3.currentProvider);

  balanceOf$('0x123').subscribe(console.log); // Logs the balance
});
*/

describe('light.js', async () => {
  it('Connection test', async () => {
    const provider = new Api.Provider.Http(process.env.PROXY_URL);
    light.setProvider(provider);
    const api = new Api(provider);
  })
})