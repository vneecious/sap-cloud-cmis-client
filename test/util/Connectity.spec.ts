import { loadEnv } from '@sap/xsenv';
import { getDestinationFromSdmBinding } from '../../src/util/Connectivity';

describe('Transform Utility', () => {
  beforeAll(() => {
    // !Before running the tests, ensure the project has bindings with both Sdm (DMS) Service
    loadEnv('test-env.json');
  });
  it('can create destinatino from Sdm Service', async () => {
    await getDestinationFromSdmBinding();
  });
});
