import {
  getDestinationFromDestinationService,
  Destination,
} from "@sap-cloud-sdk/connectivity";
import { expect } from "chai";
import { CmisClient } from "./CmisClient";
import { loadEnv } from "@sap/xsenv";

describe("CmisClient integration with BTP - DMS Service", function () {
  this.timeout(10000);

  let cmisClient: CmisClient;
  before(async () => {
    // !Before running the tests, ensure the project has bindings with both a UAA Service and a Destination Service.
    loadEnv("test-env.json");
    const destination = await getDestinationFromDestinationService({
      destinationName: process.env.TEST_DESTINATION_NAME,
    });
    if (!destination) {
      throw new Error("Could not fetch the destination. Tests aborted");
    }
    cmisClient = new CmisClient({ destinationName: "sdm-i550329" });
  });

  it("should load repositories from DMS", async () => {
    const result = await cmisClient.fetchRepository();
    const repository = Object.values(result)[0];
    expect(repository).to.have.property("repositoryId");
  });

  it("should create a folder in root", async () => {
    const result = await cmisClient.createFolder({
      name: `folder-${Date.now()}`,
      succinct: true,
    });
    expect(result).to.have.property("succinctProperties");
  });

  it("should create a document in root", async () => {
    const result = await cmisClient.createDocument({
      filename: `File-${Date.now().toString()}.txt`,
      content: Buffer.from("Lorem ipsum dolor", "utf-8"),
      succinct: true,
    });

    expect(result.succinctProperties).to.have.property(
      "cmis:contentStreamLength"
    );
  });

  it("should run queries", async () => {
    const result = await cmisClient.query("select * from cmis:document");
    expect(result).to.have.property("results");
  });
});
