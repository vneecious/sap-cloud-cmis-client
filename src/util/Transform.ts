import FormData from "form-data";

export type CmisProperty = Record<string, string>;
export type InputObject = Record<any, any | any[]>;

/**
 * Transforms an array of input objects into a query array format.
 *
 * This function takes an array of input objects and converts each object's key-value pairs
 * into the query array format often used in URL query parameters. If a value is an array,
 * it further breaks down each array item with its index.
 *
 * Example:
 *
 * Input:
 * [{ "username": "John", "permissions": ["read", "write"] }]
 *
 * Output:
 * {
 *   "username[0]": "John",
 *   "permissions[0][0]": "read",
 *   "permissions[0][1]": "write"
 * }
 *
 * @param input - The array of input objects to be transformed.
 * @returns The transformed object in query array format.
 */
export function transformToQueryArrayFormat(
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

/**
 * Transforms an input object into its corresponding CMIS Property/Value format.
 *
 * Given an input object with key-value pairs, this function will convert each pair
 * into the CMIS properties format. For simple key-value pairs, keys are represented
 * as `propertyId[index]` and values as `propertyValue[index]`. For keys associated with
 * an array of values, each value in the array gets its own `propertyValue[index][subIndex]`.
 *
 * Example:
 *
 * Input:
 * {
 *   "cmis:name": "Document",
 *   "cmis:tags": ["tag1", "tag2"]
 * }
 *
 * Output:
 * {
 *   "propertyId[0]": "cmis:name",
 *   "propertyValue[0]": "Document",
 *   "propertyId[1]": "sap:tags",
 *   "propertyValue[1][0]": "tag1",
 *   "propertyValue[1][1]": "tag2"
 * }
 *
 * @param input - The input object with key-value pairs (or key-array pairs) to be transformed.
 * @returns The transformed object in CMIS properties format.
 */

export function transformObjectToCmisProperties(
  input: InputObject
): CmisProperty {
  const result: CmisProperty = {};
  let idx = 0;

  for (const [key, value] of Object.entries(input)) {
    result[`propertyId[${idx}]`] = key;

    if (Array.isArray(value)) {
      value.forEach((v, subIdx) => {
        result[`propertyValue[${idx}][${subIdx}]`] = v;
      });
    } else {
      result[`propertyValue[${idx}]`] = value;
    }

    idx++;
  }

  return result;
}

/**
 * Transforms a JSON object into a FormData object.
 *
 * Given a JSON object, this function iterates over its properties and appends
 * each key-value pair to a new FormData object. The values are converted to string
 * before appending to ensure compatibility with the FormData API.
 *
 * Example:
 *
 * Input:
 * { "username": "John", "age": 25 }
 *
 * Output:
 * FormData { "username" => "John", "age" => "25" }
 *
 * @param data - The JSON object to be transformed into FormData.
 * @returns A new FormData object containing the data from the input object.
 */
export function transformJsonToFormData(data: Object): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  return formData;
}
