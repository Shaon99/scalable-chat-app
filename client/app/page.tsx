"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "../context/socketProvider";
import {
  Send,
  SquarePen,
  Search,
  ChevronRight,
  Mail,
  Ellipsis,
  Image,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    // <div className="flex flex-col h-full max-h-screen bg-gray-700 p-4 rounded-md">
    //   {/* Chat Header */}
    //   <div className="mb-4 text-center">
    //     <h2 className="text-xl font-semibold text-gray-200">
    //       {username} Chat Room
    //     </h2>
    //   </div>

    //   {/* Messages Container */}
    //   <div className="flex-1 mb-4 overflow-y-auto p-4 bg-white rounded-lg shadow-lg">
    //     <div className="space-y-3">
    //       {messages.map((msg, index) => (
    //         <div
    //           key={index}
    //           className={`mb-2 ${
    //             msg.userId === loggedInUserId ? "text-right" : "text-left"
    //           }`}
    //         >
    //           <div
    //             className={`flex items-center ${
    //               msg.userId === loggedInUserId
    //                 ? "justify-end"
    //                 : "justify-start"
    //             }`}
    //           >
    //             {msg.imageUrl && (
    //               <img
    //                 src={msg.imageUrl}
    //                 alt={`${msg.user}'s avatar`}
    //                 className="w-8 h-8 rounded-full mr-2"
    //               />
    //             )}
    //             <div
    //               className={`inline-block px-4 py-2 rounded-lg ${
    //                 msg.userId === loggedInUserId
    //                   ? "bg-blue-500 text-white"
    //                   : "bg-gray-300 text-black"
    //               }`}
    //             >
    //               {msg.message}
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Input Box and Send Button */}
    //   <div className="flex items-center space-x-2">
    //     <Input
    //       placeholder="Type your message here."
    //       value={message}
    //       onChange={(e) => setMessage(e.target.value)}
    //     />
    //     <Button onClick={handleSend}>
    //       <Send className="mr-2 h-4 w-4" /> Send
    //     </Button>
    //   </div>
    // </div>
    <div className="grid grid-cols-12 gap-0 border-b border-gray-300">
      {/* sidebar chat */}
      <div className="col-span-3">
        <div className="p-5 flex items-center justify-between border-b border-r border-gray-300">
          <h2 className="text-lg font-bold flex items-center">
            Messages{" "}
            <span className="ml-2 text-lg font-bold text-purple-500">(14)</span>
          </h2>
          <div className="flex space-x-3">
            <SquarePen className="h-5 w-5 text-gray-800 font-light" />
            <Search className="h-5 w-5 text-gray-800 font-light" />
          </div>
        </div>
        <div className="h-screen border-r border-gray-300">
          <div className="p-5 flex items-center justify-between">
            <span className="flex items-center text-green-500 font-bold">
              <svg
                className="h-3 w-3 mr-1"
                fill="currentColor"
                viewBox="0 0 8 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" />
              </svg>{" "}
              Online Now
            </span>
            <span className="flex items-center font-bold">
              See All
              <ChevronRight className="ml-1 h-3.5 w-3.5 text-white bg-black rounded-full" />
            </span>
          </div>
          <div className="px-4  flex items-center justify-between">
            <div className="relative inline-flex flex-col items-center">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0">
                <svg
                  className="h-2.5 w-2.5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="px-5 py-6">
            <h2 className="text-lg font-bold flex items-center">
              <Mail className="h-5 w-5 mr-3 text-purple-500 font-light" />
              Inbox
            </h2>

            <div className="flex items-center space-x-3 py-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0">
                  <svg
                    className="h-3 w-3 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="4" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 w-48">
                <div className="flex justify-between items-center">
                  <div className="font-bold">John Doe</div>
                  <div className="text-gray-400 text-xs">2:30 PM</div>
                </div>
                <div className="flex justify-between items-center"></div>
                <div className="text-gray-600 font-bold overflow-hidden text-sm text-ellipsis whitespace-nowrap">
                  This is the latest message that nig...
                </div>
              </div>
              {/* Unread Count Badge */}
              <div className="flex items-center justify-center w-4 h-4 bg-purple-500 text-white text-xs font-bold rounded-full">
                5
              </div>
            </div>

            <div className="flex items-center space-x-3 py-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0">
                  <svg
                    className="h-3 w-3 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="4" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 w-48">
                <div className="flex justify-between items-center">
                  <div className="font-bold">John Doe</div>
                  <div className="text-gray-400 text-xs">2:30 PM</div>
                </div>
                <div className="text-gray-500 overflow-hidden text-sm text-ellipsis whitespace-nowrap">
                  This is the latest message that nig...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main chat */}
      <div className="col-span-6">
        <div className="p-4 flex items-center justify-between border-b border-r border-gray-300">
          <div className="relative">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="h-9 w-9"
              />
              <AvatarFallback className="h-9 w-9 text-sm">CN</AvatarFallback>{" "}
            </Avatar>
            <div className="absolute bottom-0 right-0">
              <svg
                className="h-2 w-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 8 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" />
              </svg>
            </div>
          </div>
          <div className="flex-1 px-3">
            <div className="flex justify-between items-center">
              <div className="font-bold">John Doe</div>
              <div className="flex space-x-3">
                <Search className="h-5 w-5 text-gray-800 font-light" />
                <Ellipsis className="h-5 w-5 text-gray-800 font-light" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="h-screen flex items-start bg-[#f8f7f3] bg-pattern border-r border-gray-300  overflow-y-auto p-4">
          
        </div> */}
        <div className="h-screen flex flex-col bg-[#faf8f4]">
          {/* Chat Container (Scrollable) */}
          <div className="flex-grow overflow-y-auto p-4 border-r border-gray-300 bg-pattern">
            {/* Chat Messages */}
            <div className="mb-4">
              <div className="bg-white p-3 rounded-lg max-w-sm shadow-md">
                <p className="text-gray-700">Hello, how are you today?</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">10:45 AM</p>
            </div>

            <div className="mb-4 flex justify-end">
              <div className="bg-[#f2ece2] p-3 rounded-lg max-w-sm shadow-md">
                <p className="text-gray-700">
                  I'm good, thanks! What about you?
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">10:46 AM</p>
            </div>

            {/* Add more messages here as needed */}
          </div>

          {/* Input Field (Fixed to Bottom) */}
          <div className="w-full px-6 pt-3 flex items-center pb-24">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 mr-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <Button onClick={handleSend} className="rounded-full" title="Send">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* right bar */}
      <div className="col-span-3">
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center">Profile</h2>
          <div className="flex space-x-3">
            <Ellipsis className="h-5 w-5 text-gray-800 font-light" />
          </div>
        </div>
        <div className="flex flex-col items-center p-5">
          <div className="flex items-center justify-center">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="h-20 w-20"
              />
              <AvatarFallback className="h-20 w-20 text-sm">CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="font-bold text-lg mt-1">John Doe</div>{" "}
          {/* Added margin for spacing */}
          <div className="text-purple-500 text-sm">Software Engineer</div>
          <div className="text-purple-500 text-sm">jhondoer@gmail.com</div>
        </div>
        <div className="p-5">
          <h2 className="text-lg font-bold flex items-center">
            <Image className="h-5 w-5 mr-3 text-purple-500 font-light" />
            Media
          </h2>
          <div className="grid grid-cols-3 gap-1 p-4">
            <img
              className="rounded-lg w-full h-32 object-cover"
              src="https://via.placeholder.com/300x300"
              alt="media1"
            />
            <img
              className="rounded-lg w-full h-32 object-cover"
              src="https://via.placeholder.com/300x300"
              alt="media2"
            />
            <img
              className="rounded-lg w-full h-32 object-cover"
              src="https://via.placeholder.com/300x300"
              alt="media3"
            />
            <img
              className="rounded-lg w-full h-32 object-cover"
              src="https://via.placeholder.com/300x300"
              alt="media4"
            />
            <img
              className="rounded-lg w-full h-32 object-cover"
              src="https://via.placeholder.com/300x300"
              alt="media5"
            />
            <img
              className="rounded-lg w-full h-32 object-cover"
              src="https://via.placeholder.com/300x300"
              alt="media6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
