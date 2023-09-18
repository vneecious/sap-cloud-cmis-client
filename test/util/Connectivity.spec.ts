import { getDestinationFromSdmBinding } from '../../src';

describe('Connectivity Utility', () => {
  it('should return a destination poiting to the SDM url', async () => {
    const destination = await getDestinationFromSdmBinding(
      process.env.SDM_SERVICE_NAME,
    );
    expect(destination.url).toContain('api-sdm-di.cfapps');
  });
});
