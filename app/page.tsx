import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import ChatController from "@/components/ChatController"; // Import the new ChatController

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  // No need to throw an error here, ChatController can handle null accessToken
  // if (!accessToken) {
  //   throw new Error("Failed to get access token.");
  // }

  return (
    <div className={"grow flex flex-col"}>
      {/* Render ChatController and pass the accessToken */}
      <ChatController accessToken={accessToken} />
    </div>
  );
}
