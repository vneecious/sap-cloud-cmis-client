import { Service, serviceToken } from '@sap-cloud-sdk/connectivity';
import {
  CachingOptions,
  Destination,
  DestinationWithName,
  JwtPayload,
  XsuaaServiceCredentials,
  decodeJwt,
  getDestinationFromServiceBinding,
  registerDestination,
} from '@sap-cloud-sdk/connectivity/dist/scp-cf';

type SdmService = Service & {
  credentials: SdmServiceCredentials;
};

type SdmServiceCredentials = {
  [other: string]: any;
  uaa: {
    [other: string]: any;
    url: string;
  };
};

export async function getDestinationFromSdmBinding(
  serviceName: string
): Promise<Destination> {
  const destination = await getDestinationFromServiceBinding({
    destinationName: serviceName,
    serviceBindingTransformFn: sdmBindingToDestination,
  });

  await registerDestination(destination as DestinationWithName);
  return destination;
}

async function sdmBindingToDestination(
  service: SdmService,
  options?: CachingOptions & {
    jwt?: string | JwtPayload;
    xsuaaCredentials?: XsuaaServiceCredentials;
  }
): Promise<Destination> {
  const transformedService = {
    ...service,
    credentials: { ...service.credentials.uaa },
  };

  const token = await serviceToken(
    transformedService as unknown as Service,
    options
  );

  return buildClientCredentialsDestination(
    token,
    service.credentials.uaa.url,
    service.name
  );
}

/**
 * Adapted from SAP Cloud SDK implementation for converting service bindings to destinations.
 * @see [cloud-sdk-js source code](https://github.com/SAP/cloud-sdk-js/blob/72c0ecc566570ee920a0a184653a42a1eb8de8fe/packages/connectivity/src/scp-cf/destination/service-binding-to-destination.ts#L117)
 */
function buildClientCredentialsDestination(
  token: string,
  url: string,
  name
): Destination {
  const expirationTime = decodeJwt(token).exp;
  const expiresIn = expirationTime
    ? Math.floor((expirationTime * 1000 - Date.now()) / 1000).toString(10)
    : undefined;
  return {
    url,
    name,
    authentication: 'OAuth2ClientCredentials',
    authTokens: [
      {
        value: token,
        type: 'bearer',
        expiresIn,
        http_header: { key: 'Authorization', value: `Bearer ${token}` },
        error: null,
      },
    ],
  };
}
