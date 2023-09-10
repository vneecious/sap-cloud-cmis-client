const cds = require('@sap/cds');

const projectRootFolder = __dirname + '/..';
const { GET, POST, PUT, DELETE } = cds.test(
  'serve',
  '--project',
  projectRootFolder
);

describe('Sample Service CRUD Operations', () => {
  const BASE_URL = '/odata/v4/sample/Files';

  beforeAll(async () => {
    const SampleService = await cds.connect.to('SampleService');
  });

  let sampleDocument;
  it('Should retrieve all files and expect a successful response', async () => {
    const { data, status } = await GET(BASE_URL);
    sampleDocument = data.value[0];
    expect(status).toBe(200);
  });

  it('Should retrieve a specific file and match it with previously fetched sample', async () => {
    const specificFileURL = `${BASE_URL}('${sampleDocument.id}')`;
    const { status, data } = await GET(specificFileURL);
    expect(data).toMatchObject(sampleDocument);
  });

  let newDocument;
  it('Should create a new document and expect a valid UUID for the document id', async () => {
    const { status, data } = await POST(BASE_URL, {});
    newDocument = data;
    expect(newDocument.id).toMatch(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
  });

  it('Should upload content to the new document and expect a successful response', async () => {
    const fileContent = Buffer.from('this is an txt file', 'utf-8');
    const contentUploadURL = `${BASE_URL}('${newDocument.id}')/content`;
    const { status } = await PUT(contentUploadURL, fileContent);
    expect(status).toBe(204);
  });

  it('Should delete the newly created document and expect a successful response', async () => {
    const deleteDocumentURL = `${BASE_URL}('${newDocument.id}')`;
    const { status } = await DELETE(deleteDocumentURL);
    expect(status).toBe(204);
  });
});
