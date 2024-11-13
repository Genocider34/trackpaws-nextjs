import { functions } from "../../functions/firebase";
import { httpsCallable } from "firebase/functions";

type DeleteUserResponse = {
    message: string;
}

export const deleteUserByAdmin = async (userIdToDelete: string): Promise<void> => {
  const deleteUserAccount = httpsCallable(functions, "deleteUserAccount");
  try {
    const result = await deleteUserAccount({ userIdToDelete });
    const data = result.data as DeleteUserResponse;
    console.log(data.message);
  } catch (error: any) {
    console.error("Error deleting user account:", error.message);
  }
};
