"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "../context/socketProvider";
import { Send } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  const { user } = useUser();

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Show a loading state while user data is fetched
  }

  // Access the username or any other user properties
  const username = user.fullName; // Assuming 'username' is a property in your user object
  const loggedInUserId = user?.id; // Get the logged-in user's ID

  return (
    <div className="flex flex-col h-full max-h-screen bg-gray-700 p-4 rounded-md">
      {/* Chat Header */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-gray-200">
          {username} Chat Room
        </h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 mb-4 overflow-y-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.userId === loggedInUserId ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`flex items-center ${
                  msg.userId === loggedInUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt={`${msg.user}'s avatar`}
                    title={msg.user}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.userId === loggedInUserId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Box and Send Button */}
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Type your message here."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSend}>
          <Send className="mr-2 h-4 w-4" /> Send
        </Button>
      </div>
    </div>
  );
}
