service SampleService {
    entity Files {
        key id           : String;
            name         : String;
            content      : LargeBinary @Core.MediaType : contentType  @Core.ContentDisposition.Filename : name;
            contentType  : String
                                       @Core.IsMediaType;
            CMISObjectId : String;
    };
}
