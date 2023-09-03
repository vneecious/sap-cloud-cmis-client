import {
  getDestinationFromDestinationService,
  Destination,
} from "@sap-cloud-sdk/connectivity";
import { expect } from "chai";
import { CmisClient } from "../src/CmisClient";
import { loadEnv } from "@sap/xsenv";

import { Object as CmisDocument } from "../src/generated/CreateDocumentApi";

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

  it.only("should load repositories from DMS", async () => {
    const result = await cmisClient.getRepositories();
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

    expect(result).to.have.property("succinctProperties");
  });

  let documentCheckOut;
  it("should checkout the created document", async () => {
    const result = await cmisClient.checkOut(
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
    const result = await cmisClient.checkOut(
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
    const result = await cmisClient.checkIn(
      document.succinctProperties["cmis:objectId"]
    );

    document = result;

    expect(result.succinctProperties)
      .to.have.property("cmis:versionLabel")
      .eq("2.0");
  });

  it("should create a document from a source", async () => {
    const result = await cmisClient.createDocumentFromSource(
      document.succinctProperties["cmis:objectId"],
      null,
      {
        cmisProperties: {
          "cmis:name": `${document.succinctProperties["cmis:name"]}-copy`,
        },
      }
    );
  });

  /**
   * Skipped due to unexpected HTTP 500 error from the service.
   * Error Details:
   *   - exception: "runtime"
   *   - message: "Method 'getLogonName' is not supported for grant type 'client_credentials'client_credentials"
   * TODO: Revisit and check once the service issue is resolved.
   */
  it.skip("should set an object as favorite", async () => {
    const result = await cmisClient.createFavorite(
      document.succinctProperties["cmis:objectId"]
    );
  });

  let folder;
  it("should create a folder in root", async () => {
    const result = await cmisClient.createFolder(`folder-${Date.now()}`);
    folder = result;
    expect(result).to.have.property("succinctProperties");
  });

  it("should create link", async () => {
    const result = await cmisClient.createLink(
      "http://sap.com",
      `SAP-${Date.now()}`
    );
    expect(result.succinctProperties)
      .to.have.property("cmis:objectTypeId")
      .eq("sap:link");
  });

  it("should run queries", async () => {
    const result = await cmisClient.cmisQuery("select * from cmis:document", {
      maxItems: 10,
    });
    expect(result).to.have.property("results");
  });

  it("should create a secondary type", async () => {
    const typeName = `my:ST${Date.now()}`;
    try {
      const result = await cmisClient.createType({
        id: typeName,
        description: "a secondary type test",
        displayName: typeName,
        localName: typeName,
        localNamespace: "my.org",
        queryName: typeName,
      });
    } catch (erro) {
      console.warn(erro.response.data);
    }
  });

  it("should update the properties of an object", async () => {
    const oldName = document.succinctProperties["cmis:name"];
    const newName = `${oldName}-updated`;
    const result = await cmisClient.updateProperties(
      document.succinctProperties["cmis:objectId"],
      {
        cmisProperties: {
          "cmis:name": newName,
        },
      }
    );
    expect(result.succinctProperties).to.have.property("cmis:name").eq(newName);
  });

  /**
   * Skipped due to unexpected HTTP 400 error from the service.
   * Error Details:
   *   - Unauthorized
   * TODO: Revisit and check once the service issue is resolved.
   */
  it.skip("should create a share object", async () => {
    const result = await cmisClient.createShare("my share");
  });

  it("should delete an object", async () => {
    const result = await cmisClient.deleteObject(
      document.succinctProperties["cmis:objectId"]
    );
  });

  it("should delete permanently an object", async () => {
    const result = await cmisClient.deletePermanently(
      document.succinctProperties["cmis:objectId"]
    );
  });

  it("should delete a tree", async () => {
    const result = await cmisClient.deleteTree(
      folder.succinctProperties["cmis:objectId"]
    );
  });

  it.only("should download a file", async () => {
    const filename = `test-downloadFile-${Date.now().toString()}.txt`;
    const fileContent = "Lorem ipsum dolor";
    const createdDocument = await cmisClient.createDocument(
      filename,
      Buffer.from("Lorem ipsum dolor", "utf-8")
    );

    const result = await cmisClient.downloadFile(
      createdDocument.succinctProperties["cmis:objectId"]
    );

    expect(result).be.eq(fileContent);
  });
});
