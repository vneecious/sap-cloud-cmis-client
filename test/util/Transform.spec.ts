import FormData from 'form-data';
import {
  CmisProperty,
  InputObject,
  transformJsonToFormData,
  transformObjectToCmisProperties,
  transformToQueryArrayFormat,
} from '../../src/util/Transform';

describe('Transform Utility', () => {
  it('transformInputToBody: should transform input to expected output', () => {
    const input: Array<InputObject> = [
      {
        someKey: 'someValue',
        anotherKey: ['value1', 'value2'],
      },
      {
        someKey: 'secondValue',
        anotherKey: ['value3', 'value4'],
      },
    ];

    const expectedOutput: CmisProperty = {
      'someKey[0]': 'someValue',
      'anotherKey[0][0]': 'value1',
      'anotherKey[0][1]': 'value2',
      'someKey[1]': 'secondValue',
      'anotherKey[1][0]': 'value3',
      'anotherKey[1][1]': 'value4',
    };

    const result = transformToQueryArrayFormat(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('Transform Utility', () => {
  it('transformInputToPropetyBody: should transform input to expected output', () => {
    const input: InputObject = {
      someKey: 'someValue',
      anotherKey: 'anotherValue',
    };

    const expectedOutput: CmisProperty = {
      'propertyId[0]': 'someKey',
      'propertyValue[0]': 'someValue',
      'propertyId[1]': 'anotherKey',
      'propertyValue[1]': 'anotherValue',
    };

    const result = transformObjectToCmisProperties(input);
    expect(JSON.stringify(result)).toBe(JSON.stringify(expectedOutput));
  });

  it('transformInputToPropetyBody: should transform input with array value to expected output', () => {
    const input: InputObject = {
      someKey: 'someValue',
      anotherKey: ['anotherValue1', 'anotherValue2'],
    };

    const expectedOutput: CmisProperty = {
      'propertyId[0]': 'someKey',
      'propertyValue[0]': 'someValue',
      'propertyId[1]': 'anotherKey',
      'propertyValue[1][0]': 'anotherValue1',
      'propertyValue[1][1]': 'anotherValue2',
    };

    const result = transformObjectToCmisProperties(input);
    expect(JSON.stringify(result)).toBe(JSON.stringify(expectedOutput));
  });
});

describe('Transform Utility', () => {
  let appendMock: jest.SpyInstance;

  beforeEach(() => {
    appendMock = jest.spyOn(FormData.prototype, 'append');
  });

  afterEach(() => {
    appendMock.mockRestore();
  });

  it('should transform a JSON object to FormData', () => {
    const jsonData = {
      key1: 'value1',
      key2: 'value2',
    };

    transformJsonToFormData(jsonData);

    // Verifique se o método append foi chamado com os valores corretos
    expect(appendMock).toHaveBeenCalledWith('key1', 'value1');
    expect(appendMock).toHaveBeenCalledWith('key2', 'value2');
  });
});
