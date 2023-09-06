import {
  DestinationAuthToken,
  DestinationWithName,
  registerDestination,
} from '@sap-cloud-sdk/connectivity';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import { getServices } from '@sap/xsenv';

type Sdm = {
  name: string;
  instance_name: string;
  label: string;
  tags: string[];
  plan: string;
  credentials: {
    endpoints: {
      ecmservice: {
        timeout: number;
        url: string;
      };
      migrationservice: {
        url: string;
      };
    };
    'html5-apps-repo': {
      app_host_id: string;
    };
    saasregistryenabled: boolean;
    'sap.cloud.service': string;
    service_key_name: string;
    uaa: {
      apiurl: string;
      clientid: string;
      clientsecret: string;
      'credential-type': string;
      identityzone: string;
      identityzoneid: string;
      sburl: string;
      subaccountid: string;
      tenantid: string;
      tenantmode: string;
      uaadomain: string;
      url: string;
      verificationkey: string;
      xsappname: string;
      zoneid: string;
    };
    uri: string;
  };
};

export async function createAndRegisterLocalDestinationFromSDMService() {
  const services = getServices({
    sdm: { tag: 'sdm' },
  });
  const sdm = services.sdm as Sdm;

  const destination: DestinationWithName = {
    name: process.env.TEST_DESTINATION_NAME,
    type: 'HTTP',
    url: sdm.credentials.endpoints.ecmservice.url,
    authentication: 'OAuth2ClientCredentials',
    clientId: sdm.credentials.uaa.clientid,
    clientSecret: sdm.credentials.uaa.clientsecret,
    tokenServiceUrl: sdm.credentials.uaa.url + '/oauth/token',
    authTokens: [],
  };

  const response = await executeHttpRequest({
    url:
      destination.tokenServiceUrl +
      '?grant_type=client_credentials&response_type=token',
    authentication: 'BasicAuthentication',
    username: destination.clientId,
    password: destination.clientSecret,
  });

  const { access_token, expires_in } = response;

  destination.authTokens.push({
    type: 'Bearer',
    value: access_token,
    http_header: {
      key: 'Authorization',
      value: `Bearer ${access_token}`,
    },
    expiresIn: expires_in,
  } as DestinationAuthToken);

  await registerDestination(destination);
}
