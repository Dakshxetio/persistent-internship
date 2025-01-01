/*import { Client, Account, } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite server endpoint
  .setProject("6773b9f00027544e9ef6"); // Replace with your Project ID

const account = new Account(client);

export { client, account };
*/
import { Client, Account, ID } from "appwrite";

// Initialize Appwrite Client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("6773b9f00027544e9ef6"); // Replace with your project ID

// Initialize Account Service
const account = new Account(client);

// Export necessary objects
export { client, account, ID };
