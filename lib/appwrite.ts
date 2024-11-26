import { UserDataProps } from "@/constants/propUser";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.veri.payment",
  projectId: "673ae6fc00334cfc7cdc",
  databaseId: "673ae889002a763a7362",
  useCollecitonId: "673ae8be002df54bdca3",
  videoCollectionId: "673ae8e20001ebd90495",
  storageId: "673aea790010aedae0ce",
};

let client: Client;

client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId) // Your Project ID
  .setPlatform(config.platform); // Your package name / bundle identifier

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

// Sign-up users
export const createUser = async (value: UserDataProps) => {
  const { email, password, username, firstName, lastName } = value;
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatar.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.useCollecitonId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        Email: email,
        username,
        firstName,
        lastName,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user.");
  }
};

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to sign-in", error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    console.log(currentAccount);

    return currentAccount;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.useCollecitonId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    throw new Error('Error', error);
  }
}
