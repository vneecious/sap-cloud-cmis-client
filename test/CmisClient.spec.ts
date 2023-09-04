import { getDestinationFromDestinationService } from "@sap-cloud-sdk/connectivity";
import { expect } from "chai";
import { CmisClient } from "../src/CmisClient";
import { loadEnv } from "@sap/xsenv";
import fs from "fs";
import path from "path";

import { CreateDocumentResponse, CreateFolderResponse } from "../src/generated";

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

  let document: CreateDocumentResponse;
  it("should create a document in root", async () => {
    const result = await cmisClient.createDocument(
      `File-${Date.now().toString()}.txt`,
      Buffer.from("Lorem ipsum dolor", "utf-8")
    );

    document = result;
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
    await cmisClient.createDocumentFromSource(
      document.succinctProperties["cmis:objectId"],
      null,
      {
        cmisProperties: {
          "cmis:name": `${document.succinctProperties["cmis:name"]}-copy`,
        },
      }
    );
  });

  // NOTE: the repository MUST be set as 'Favorites' in order for this test to succeed.
  // This feature is only avaliable for 'Application Option'
  it.skip("should set an object as favorite", async () => {
    await cmisClient.createFavorite(
      document.succinctProperties["cmis:objectId"]
    );
  });

  let folder: CreateFolderResponse;
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
      await cmisClient.createType({
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
        succinct: true,
      }
    );

    expect(result.succinctProperties).to.have.property("cmis:name").eq(newName);
  });

  // NOTE: the repository MUST be set as 'Collaboration' in order for this test to succeed.
  // This feature is only avaliable for 'Application Option'
  it.skip("should create a share folder", async () => {
    await cmisClient.createShare("my share");
  });

  it("should delete an object", async () => {
    await cmisClient.deleteObject(document.succinctProperties["cmis:objectId"]);
  });

  it("should delete permanently an object", async () => {
    await cmisClient.deletePermanently(
      document.succinctProperties["cmis:objectId"]
    );
  });

  it("should delete a tree", async () => {
    await cmisClient.deleteTree(folder.succinctProperties["cmis:objectId"]);
  });

  it("should download a file", async () => {
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

  // NOTE: The repository MUST be onboarded with the property `isThumbnailEnabled` set to `true`
  // in order for this test to succeed.
  it("should generate a thumbnail", async () => {
    const filePath = path.join(__dirname, "chico.jpg");
    const content = fs.createReadStream(filePath);
    const fileName = `chico-${Date.now()}.jpg`;

    document = await cmisClient.createDocument(fileName, content);
    await cmisClient.generateThumbnail(
      document.succinctProperties["cmis:objectId"]
    );
  });

  it("should get ACL property from an object", async () => {
    const result = await cmisClient.getACLProperty(
      document.succinctProperties["cmis:objectId"]
    );
    expect(result).to.have.property("acl");
  });

  it("should get allowable actions", async () => {
    await cmisClient.getAllowableActions(
      document.succinctProperties["cmis:objectId"]
    );
  });

  let subFolder: CreateFolderResponse;
  it("should get children", async () => {
    // Create some folder and subfolder
    folder = await cmisClient.createFolder(`folder-${Date.now()}`);
    subFolder = await cmisClient.createFolder(`subFolder1-${Date.now()}`, {
      folderPath: folder.succinctProperties["cmis:name"],
    });

    const result = await cmisClient.getChildren(
      folder.succinctProperties["cmis:objectId"]
    );
    expect(result).to.have.property("objects");
  });

  it("should get deleted children", async () => {
    await cmisClient.getDeletedChildren();
  });

  it("should get descendants", async () => {
    await cmisClient.getDescendants(folder.succinctProperties["cmis:objectId"]);
  });

  it("should get folder tree", async () => {
    await cmisClient.getFolderTree(folder.succinctProperties["cmis:objectId"]);
  });

  it("should get object", async () => {
    await cmisClient.getObject(folder.succinctProperties["cmis:objectId"], {
      includeAllowableActions: true,
    });
  });

  it("should get parent", async () => {
    await cmisClient.getParent(subFolder.succinctProperties["cmis:objectId"]);
  });

  it("should get properties of the given object", async () => {
    await cmisClient.getProperties(
      document.succinctProperties["cmis:objectId"]
    );
  });
});
