import FormData from "form-data";

export type CmisProperty = Record<string, string>;
export type InputObject = Record<any, any | any[]>;

export function transformDeepObjectToCmisProperties(
  input: Array<InputObject>
): CmisProperty {
  const result: CmisProperty = {};

  input.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      const value = item[key];

      if (Array.isArray(value)) {
        value.forEach((subItem, subIndex) => {
          result[`${key}[${index}][${subIndex}]`] = subItem;
        });
      } else {
        result[`${key}[${index}]`] = value;
      }
    });
  });

  return result;
}

export function transformObjectToCmisProperties(
  input: InputObject
): CmisProperty {
  const result: CmisProperty = {};
  Object.entries(input).forEach((entry, idx) => {
    result[`propertyId[${idx}]`] = entry[0];
    result[`propertyValue[${idx}]`] = entry[1];
  });
  return result;
}

export function transformJsonToFormData(data: Object): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  return formData;
}
