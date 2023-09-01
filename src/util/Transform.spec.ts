import { expect } from "chai";
import sinon from "sinon";
import {
  InputObject,
  CmisProperty,
  transformDeepObjectToCmisProperties,
  transformObjectToCmisProperties,
  transformJsonToFormData,
} from "./Transform";
import FormData from "form-data";

describe("Transform Utility", () => {
  it("transformInputToBody: should transform input to expected output", () => {
    const input: Array<InputObject> = [
      {
        someKey: "someValue",
        anotherKey: ["value1", "value2"],
      },
      {
        someKey: "secondValue",
        anotherKey: ["value3", "value4"],
      },
    ];

    const expectedOutput: CmisProperty = {
      "someKey[0]": "someValue",
      "anotherKey[0][0]": "value1",
      "anotherKey[0][1]": "value2",
      "someKey[1]": "secondValue",
      "anotherKey[1][0]": "value3",
      "anotherKey[1][1]": "value4",
    };

    const result = transformDeepObjectToCmisProperties(input);
    expect(result).to.deep.equal(expectedOutput);
  });
});

describe("Transform Utility", () => {
  it("transformInputToPropetyBody: should transform input to expected output", () => {
    const input: InputObject = {
      someKey: "someValue",
      anotherKey: "anotherValue",
    };

    const expectedOutput: CmisProperty = {
      "propertyId[0]": "someKey",
      "propertyValue[0]": "someValue",
      "propertyId[1]": "anotherKey",
      "propertyValue[1]": "anotherValue",
    };

    const result = transformObjectToCmisProperties(input);
    expect(result).to.deep.equal(expectedOutput);
  });
});

describe("Transform Utility", () => {
  let appendStub: sinon.SinonStub;

  beforeEach(() => {
    appendStub = sinon.stub(FormData.prototype, "append");
  });

  afterEach(() => {
    appendStub.restore();
  });

  it("should transform a JSON object to FormData", () => {
    const jsonData = {
      key1: "value1",
      key2: "value2",
    };

    transformJsonToFormData(jsonData);

    // Verifique se o método append foi chamado com os valores corretos
    expect(appendStub.calledWith("key1", "value1")).to.be.true;
    expect(appendStub.calledWith("key2", "value2")).to.be.true;
  });
});
