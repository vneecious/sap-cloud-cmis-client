## A JavaScript CMIS Client for SAP Cloud SDK

**`sap-cloud-cmisjs`** is a specialized CMIS client designed for the SAP Cloud SDK (JavaScript) and CAP (NodeJS). It consolidates the [SAP-provided OpenAPI specifications](https://api.sap.com/package/SAPDocumentManagementServiceIntegrationOptionCMISAPI/overview) into one cohesive package. Additionally, I've baked in some developer-friendly utilities to streamline your integration process and enhance productivity.

### 📦 Installation

```bash
npm install sap-cloud-cmisjs
```

### 🚧 Prerequisites

To interface with the SAP Document Management Service, consider one of the two approaches below:

1. Destination Setup: Bind your project to an instance of the Destination Service and establish a destination that targets the SDM service.
2. SDM Direct Binding: Simply bind your project to an instance of the SDM Service.

In both approaches, destinations are used. The key difference is that for the second method, the destination is generated at runtime. [More details here](https://github.com/vneecious/sap-cloud-cmisjs/blob/9ab3a3a18547e2b0ff46d890c3f0c0b351c1a64c/examples/cap-js/srv/sample-service.js#L47).

### 🛠️ Usage:

Before invoking any other methods, it's essential to call `getRepositories`. This ensures a connection to the instance and fetches all available repositories.

TypeScript

```typescript
import { CmisClient } from 'sap-cloud-cmisjs';

const cmisClient = new CmisClient({ destinationName: 'YOUR_DESTINATION_NAME' });

// Load repositories
await cmisClient.getRepositories();

// Retrieve all descendants from the root folder
const descendants = await cmisClient.getDescendants();
console.log(descendants);
```

JavaScript

```javascript
const { CmisClient } = require('sap-cloud-cmisjs');
const cmisClient = new CmisClient({ destinationName: 'YOUR_DESTINATION_NAME' });

// Load repositories
await cmisClient.getRepositories();

// Retrieve all descendants from the root folder
const descendants = await cmisClient.getDescendants();
console.log(descendants);
```

### 🚀 Examples

#### 💡 [Basic CRUD with Cloud Application Programming (CAP)](https://github.com/vneecious/sap-cloud-cmisjs/tree/main/examples/cap-js)

This example demonstrates basic Create, Read, Update, and Delete operations. It's a great starting point if you are wondering how to start.

Usage:
```bash
cd examples/cap-js/
npm install
cds serve
```

There are also some integration tests available in the **/test** directory.


# API

I've chosen to split the API between the services specified by CMIS 1.1 that are available, and the helpers introduced by SAP to enhance the user experience with SAP DMS.

## Table of Contents

1. [CMIS Services](#cmis)
   - [ACL](#acl)
   - [Discovery](#disc)
   - [Navigation](#navigation)
   - [Object](#object)
   - [Repository](#repository)
   - [Versioning](#versioning)
2. [SAP DMS Helpers](#dms)

## CMIS Services

<a class=acl></a>

### ACL<hr>

**[addAclProperty](https://api.sap.com/api/AddAclPropertyApi/overview)**

Adds the given ACEs to the ACL of an object. [CMIS 1.1 Reference](http://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-3670001)

**[getACLProperty](https://api.sap.com/api/GetAclPropertyApi/overview)**

Retrieves the current ACL applied to a specific object, optionally expressed using only CMIS-defined permissions. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-3710002)

**[removeAclProperty](https://api.sap.com/api/RemoveAclPropertyApi/overview)**

Removes the given ACEs from the ACL of an object. [CMIS 1.1 Reference](http://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-3670001)

<a class=disc></a>

### Discovery<hr>

**[cmisQuery](https://api.sap.com/api/CMISQueryApi/overview)**

Executes a CMIS query statement against the contents of the repository. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-3150001)

<a class=navigation></a>

### Navigation<hr>

**[getChildren](https://api.sap.com/api/GetChildrenApi/overview)**

Gets the list of child objects contained in the speciﬁed folder. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-2000001)

**[getDescendants](https://api.sap.com/api/GetDescendantsApi/overview)**

Gets the set of descendant objects contained in the speciﬁed folder or any of its child-folders. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-2040002)

**[getFolderTree](https://api.sap.com/api/GetFolderTreeApi/overview)**

Gets the set of descendant folder objects contained in the speciﬁed folder. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-2080003)

**[getParent](https://api.sap.com/api/GetParentApi/overview)**

Gets the parent folder(s) for the speciﬁed ﬁleable object. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-2160005)

<a class=object></a>

### Object<hr>

**[appendContentStream](https://api.sap.com/api/AppendContentStreamApi/overview)**

ApAppends to the content stream for the speciﬁed document object. [CMIS 1.1 Reference](http://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-29700019)

**[createDocument](https://api.sap.com/api/CreateDocumentApi)**

Creates a document object of the speciﬁed type (given by the cmis:objectTypeId property) in the (optionally) speciﬁed location. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-2250001)

**[createDocumentFromSource](https://api.sap.com/api/CreateDocumentFromSourceApi/overview)**

Creates a document object as a copy of the given source document in the (optionally) speciﬁed location. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-2290002)

**[createFolder](https://api.sap.com/api/CreateFolderApi/overview)**

Creates a folder object of the speciﬁed type in the speciﬁed location. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-2330003)

**[deleteObject](https://api.sap.com/api/DeleteObjectApi/overview)**

Deletes the speciﬁed object. If the object is a PWC the checkout is discarded. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-28500016)

**[deleteTree](https://api.sap.com/api/DeleteTreeApi/overview)**

Deletes the speciﬁed folder object and all of its child- and descendant-objects. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-28900017)

**[getAllowableActions](https://api.sap.com/api/GetAllowableActionsApi/overview)**

Gets the list of allowable actions for an object. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-2490007)

**[getObject](https://api.sap.com/api/GetObjectApi/overview)**

Gets the speciﬁed information for the object. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-2530008)

**[getProperties](https://api.sap.com/api/GetPropertiesApi/overview)**

Gets the list of properties for the object. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-2570009)

**[moveObject](https://api.sap.com/api/MoveObjectApi/overview)**

Moves the speciﬁed ﬁle-able object from one folder to another. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-28100015)

**[updateProperties](https://api.sap.com/api/UpdatePropertiesApi/overview)**

Updates properties and secondary types of the speciﬁed object. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-27300013)

<a class=repository></a>

### Repository<hr>

**[createType](https://api.sap.com/api/CreateSecondaryTypeApi/overview)**

Creates a new type deﬁnition that is a subtype of an existing speciﬁed parent type. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-1870006)

**[getRepositories](https://api.sap.com/api/ServiceApi/overview)**

Returns a list of CMIS repositories available from this CMIS service endpoint. [CMIS 1.1 Reference](http://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-1670001)

**getRepositoryInfo**

Returns information about the CMIS repository, the optional capabilities it supports and its access control information if applicable. [CMIS 1.1 Reference](http://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-1710002)

**[getTypeChildren](https://api.sap.com/api/GetTypeChildrenApi/overview)**

Returns the list of object-types deﬁned for the repository that are children of the speciﬁed type. [CMIS 1.1 Reference](http://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-1750003)

**[getTypeDefinition](https://api.sap.com/api/GetTypeDefinitionApi/overview)**

Gets the deﬁnition of the speciﬁed object-type. [CMIS 1.1 Reference](http://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-1830005)

**[getTypeDescendants](https://api.sap.com/api/GetTypeDescendantsApi/overview)**

Returns the set of the descendant object-types deﬁned for the Repository under the speciﬁed type. [CMIS 1.1 Reference](http://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-1790004)

### Versioning<hr>

**[cancelCheckOut](https://api.sap.com/api/CancelCheckOutDocumentApi/overview)**

Reverses the eﬀect of a check-out. Removes the Private Working Copy of the checked-out document, allowing other documents in the version series to be checked out again. If the private working copy has been created by `createDocument`, `cancelCheckOut` will delete the created document. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-3280002)

**[checkIn](https://api.sap.com/api/CheckInDocumentApi/overview)**

Checks-in the Private Working Copy document. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-990004)

**[checkOut](https://api.sap.com/api/CheckOutDocumentApi/overview)**

Create a private working copy (PWC) of the document. [CMIS 1.1 Reference](https://docs.oasis-open.org/cmis/CMIS/v1.1/os/CMIS-v1.1-os.html#x1-3240001)

<a class=dms></a>

## SAP DMS Helpers

**[createFavorite](https://api.sap.com/api/CreateFavoriteApi/overview)**

Creates favorite link object for the specified object if favorites repository is configured. With this call, the server creates a user folder in favorites repositories, creates a sap:link file to the object and applies user ACL.

**[createShare](https://api.sap.com/api/CreateShareApi/overview)**

Creates a folder of `sap:share` type under the specified repository. Supported only by [Collaboration enabled repositories](https://help.sap.com/docs/document-management-service/sap-document-management-service/collaboration-repositories-for-shared-folders).

**[downloadFile](https://api.sap.com/api/DownloadFileApi/overview)**

Returns the requested document content directly or redirects to a URL that provides the document content.

**[createLink](https://api.sap.com/api/CreateLinkApi/overview)**

Creates a `sap:link` type object under a specified repository for which the name and URL for the link should be provided.

**[deletePermanetly](https://api.sap.com/api/DeletePermanentlyApi/overview)**

Serves as a delete operation in the recycle bin, enabling the permanent deletion of objects from the recycle bin.

**[generateThumbnail](https://api.sap.com/api/GenerateThumbnailApi/overview)**

Generates a thumbnail for a given document id.

**[getDeletedChildren](https://api.sap.com/api/GetDeletedChildrenApi/overview)**

Returns the list of child objects deleted from the specified folder. This is one of the recycle bin APIs that provides information about the immediate children deleted from a specified folder. When the folder objectId is not mentioned, the root is considered by default.

**[restoreObject](https://api.sap.com/api/RestoreObjectApi/overview)**

It restores the deleted object. This is one of the recycle bin APIs that recovers deleted objects. The objectId can be of a document or a folder.

**[zipCreationForDownload](https://api.sap.com/api/ZipCreationForDownload/overview)**

Creates a ZIP object temporarily on server which can be downloaded using Zip Content Downloaded API with provided folder/multiple object Ids

**[zipDownload](https://api.sap.com/api/GetZipContentStream/overview)**

Downloads the ZIP that has been created using ZIP Content Creation API for a Folder/ Multiple files on the server for the same session

**[zipExtractAndUpload](https://api.sap.com/api/MassUploadApi/overview)**

Creates a folder with the zip name and all the contents inside the zip, folder or document are created inside it. The maximum size that can be uploaded is 4GB and the maximum entries in zip can be 10000.
