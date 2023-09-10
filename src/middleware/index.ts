import { HttpMiddleware, HttpRequestConfig } from '@sap-cloud-sdk/http-client';
import { transformJsonToFormData } from '../util/Transform';

export const jsonToFormData: HttpMiddleware = options => {
  return (request: HttpRequestConfig) => {
    request.data = transformJsonToFormData(request.data);
    return options.fn(request);
  };
};
