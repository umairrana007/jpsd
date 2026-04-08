const { generateJazzCashHash, generateEasyPaisaSignature } = require('./src/lib/payments/hashUtils');
const { getPaymentConfig, isSimulationMode } = require('./src/lib/config/paymentConfig');

console.log('--- Phase 8 Task 2 Tactical Test ---');

const config = getPaymentConfig();
console.log('Mode:', config.mode);
console.log('Is Simulation:', isSimulationMode());

const jcHash = generateJazzCashHash({ amount: 1000 }, config.jazzcash.salt);
console.log('JazzCash Hash:', jcHash);

const epSig = generateEasyPaisaSignature('test_payload', config.easypaisa.apiKey);
console.log('EasyPaisa Signature:', epSig);

if (jcHash.startsWith('JCHASH-') && epSig.startsWith('EPSIG-')) {
    console.log('✅ TEST PASSED: Mock values generated correctly.');
} else {
    console.log('❌ TEST FAILED: Unexpected mock values.');
}
