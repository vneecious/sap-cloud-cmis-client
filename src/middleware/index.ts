import { transformJsonToFormData } from "../util/Transform";

export const jsonToFormData = (options) => {
  return (request) => {
    request.data = transformJsonToFormData(request.data);
    return options.fn(request);
  };
};
