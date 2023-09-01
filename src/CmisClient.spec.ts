import {
  getDestinationFromDestinationService,
  Destination,
} from "@sap-cloud-sdk/connectivity";
import { expect } from "chai";
import { CmisClient } from "./CmisClient";
import { loadEnv } from "@sap/xsenv";

import { Object as CmisDocument } from "./generated/CreateDocumentApi";

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

  let document: CmisDocument;
  it("should create a document in root", async () => {
    const result = await cmisClient.createDocument(
      `File-${Date.now().toString()}.txt`,
      Buffer.from("Lorem ipsum dolor", "utf-8")
    );

    document = result.succinctProperties;
    expect(result.succinctProperties).to.have.property(
      "cmis:contentStreamLength"
    );
  });

  const fileName = `File-${Date.now().toString()}.txt`;

  it("should create an empty document", async () => {
    const result = await cmisClient.createDocument(fileName, "");

    document = result;

    expect(result.succinctProperties).to.have.property(
      "cmis:contentStreamLength"
    );
  });

  let documentCheckOut;
  it("should checkout the created document", async () => {
    const result = await cmisClient.checkOutDocument(
      document.succinctProperties["cmis:objectId"]
    );

    documentCheckOut = result;

    expect(result.succinctProperties)
      .to.have.property("cmis:isPrivateWorkingCopy")
      .eq(true);
  });

  it("should cancel checkout", async () => {
    const result = await cmisClient.cancelCheckOutDocument(
      documentCheckOut.succinctProperties["cmis:objectId"]
    );
    expect(result).to.be.eq("");
  });

  it("should checkout the again", async () => {
    const result = await cmisClient.checkOutDocument(
      document.succinctProperties["cmis:objectId"]
    );

    document = result;

    expect(result.succinctProperties)
      .to.have.property("cmis:isPrivateWorkingCopy")
      .eq(true);
  });

  it("should append content stream the document", async () => {
    try {
      const result = await cmisClient.appendContentStream(
        document.succinctProperties["cmis:objectId"],
        fileName,
        Buffer.from("This content was appended", "utf-8"),
        {
          isLastChunk: true,
        }
      );

      document = result;

      expect(result.succinctProperties).to.have.property(
        "cmis:contentStreamLength"
      );
    } catch (error) {
      console.error(error.response.data);
    }
  });

  it("should checkin the modified document", async () => {
    const result = await cmisClient.checkInDocument(
      document.succinctProperties["cmis:objectId"]
    );
    expect(result.succinctProperties)
      .to.have.property("cmis:versionLabel")
      .eq("2.0");
  });

  it("should create a folder in root", async () => {
    const result = await cmisClient.createFolder(`folder-${Date.now()}`);
    expect(result).to.have.property("succinctProperties");
  });

  it("should run queries", async () => {
    const result = await cmisClient.cmisQuery("select * from cmis:document");
    expect(result).to.have.property("results");
  });
});
