import FormData from "form-data";

export type TransformOutput = Record<string, string>;
export type TransformInput = Record<any, any | any[]>;

export function transformInputToBody(
  input: Array<TransformInput>
): TransformOutput {
  const result: TransformOutput = {};

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

export function transformInputToPropetyBody(
  input: TransformInput
): TransformOutput {
  const result: TransformOutput = {};
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
