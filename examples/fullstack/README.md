# Fullstack Example with SAP Cloud CMIS Client

This repository offers a demonstration showcasing the integration of the _SAP Cloud CMIS Client_ within a full-stack application context. Follow the instructions below to set up and run this example.

## How to Run

### Prerequisites:

Ensure you have created instances and keys for all necessary services.

For **xsuaa**:

```bash
cf create-service xsuaa application my-sample-uaa -c xs-security.json
cf create-service-key my-sample-uaa my-sample-uaa-key
```

For **sdm** (also known as DMS):

```bash
cf create-service sdm standard my-sample-sdm
cf create-service-key my-sample-sdm my-sample-sdm-key
```

> **Note:** Don't forget to [onboard your repository](https://help.sap.com/docs/document-management-service/sap-document-management-service/onboarding-repository).

For **destination**:

```bash
cf create-service destination lite my-sample-destination
cf create-service-key my-sample-destination my-sample-destination-key
```

Next, create a destination for the DMS Service. Ensure you set the _Authentication_ to `OAuth2UserTokenExchange`.
The easiest way to achieve this is by creating the destination from the DMS Service Instance, then exporting and deleting the destination. Finally, import it again after modifying its Authentication property and re-entering the Client Secret.

With everything set up, you can proceed to the following steps.

---

### Step 1: Download the Project Directory

- Go to [this website](https://download-directory.github.io) and paste the following URL: `https://github.com/vneecious/sap-cloud-cmis-client/blob/master/examples/fullstack`.
- Begin the folder's download as a ZIP archive.

### Step 2: Extract the Files

Find the downloaded ZIP on your system and unpack its contents.

### Step 3: Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### Step 4: Adjust `default-env.json` and `./app/xs-app.json` files

Replace `my-sample-sdm` with the name of the destination you created in the prerequisites.

### Step 5: Bind to BTP Services

First, bind the services to your local project:

```bash
cf bind-local -path .env -service-names my-sample-uaa
cf bind-local -path .env -service-names my-sample-destination
```

Then bind your CAP project to uaa and destination instances:

```bash
cds bind -2 my-sample-uaa
cds bind -2 my-sample-destination
```

### Step 6: Launch the Project

Start the project using the following command:

```bash
npm run start:dev
```

> **Note 1:** Once launched, the approuter will be accessible at `http://localhost:5001`.

> **Note 2:** If you're using the Business Application Studio, you might come across the `invalid redirect` error. If this happens, copy the given URL, add it to your `xs-security.json`, and update the service using the command below:

```bash
cf update-service my-sample-uaa -c xs-security.json
```
