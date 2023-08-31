import {
  getDestinationFromDestinationService,
  Destination,
} from "@sap-cloud-sdk/connectivity";
import { expect } from "chai";
import { CmisClient } from "./CmisClient";
import { loadEnv } from "@sap/xsenv";

describe("CmisClient integration with BTP - DMS Service", () => {
  before(async () => {
    // !Before running the tests, ensure the project has bindings with both a UAA Service and a Destination Service.
    loadEnv("test-env.json");
    const destination = await getDestinationFromDestinationService({
      destinationName: process.env.TEST_DESTINATION_NAME,
    });
    if (!destination) {
      throw new Error("Could not fetch the destination. Tests aborted");
    }
  });

  it("should load repositories from DMS", async () => {
    const myClassInstance = new CmisClient({ destinationName: "sdm-i550329" });
    const result = await myClassInstance.fetchRepository();
    const repository = Object.values(result)[0];
    expect(repository).to.have.property("repositoryId");
  });
});
