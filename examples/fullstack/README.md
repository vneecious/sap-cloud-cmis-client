# Fullstack Example with SAP Cloud CMIS Client

This repository provides an illustrative example showcasing the integration of the *SAP Cloud CMIS Client* within a full-stack application context. Follow the steps below to get this example up and running.

## How to Run

### Step 1: Download the Project Directory

- Navigate to [this website](https://download-directory.github.io) and paste the following URL: `https://github.com/vneecious/sap-cloud-cmis-client/blob/master/examples/fullstack`.
- Initiate the download of the folder as a ZIP archive.

### Step 2: Extract the Files

Locate the downloaded ZIP on your system and extract its contents.

### Step 3: Install Dependencies

Execute the following command to ensure all necessary dependencies are in place:

```bash
npm install
```

### Step 4: Adjust Configuration Files

To set up the correct environment, you'll need to rename the `.default-env.json` files:

```bash
mv ./.default-env.json ./default-env.json
mv ./app/.default-env.json ./app/default-env.json
```

> **Note:** Double-check to ensure both files are correctly renamed.

### Step 5: Bind to BTP Services

Link the project to your Business Technology Platform (BTP) services with:

```bash
cds bind -2 <your-sdm>, <your-xsuaa>, <your-destination>
```

### Step 6: Configure your UAA

Ensure your XSUAA is set to "dedicated". Additionally, the correct `redirect_uris` must be specified. Refer to the `xs-security.json-example` for guidance.

> **Note:** If you're using the Business Application Studio, you might encounter the `invalid redirect` error. In such cases, simply copy the provided URL, incorporate it into your `xs-security.json`, and then update the service.

```bash
cf update-service <your_xsuaa> -c xs-security.json
```

### Step 7: Launch the Project

Kickstart the project using the following command:

```bash
npm run start:dev
```

> **Note:** Once launched, the approuter will be accessible at `http://localhost:5000`.
