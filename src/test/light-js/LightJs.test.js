import light, { balanceOf$ } from '@parity/light.js';

/*
// Wait for web3.currentProvider to be injected
window.addEventListener('load', () => {
  // Tell light.js to use MetaMask provider
  light.setProvider(window.web3.currentProvider);

  balanceOf$('0x123').subscribe(console.log); // Logs the balance
});
*/

describe.skip('light.js', async () => {
    it('Connection test', async () => {
        light.setProvider();
    })
})