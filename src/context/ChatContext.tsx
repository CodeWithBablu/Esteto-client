// import { ChatType } from "@/lib";
import { ReactNode, createContext, useState } from "react";

interface ChatContextProps {
  isChatOpen: boolean;
  setChatOpen: (isOpen: boolean) => void;
}

export const ChatContext = createContext<ChatContextProps>({
  isChatOpen: false,
  setChatOpen: () => { },
});

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setChatOpen] = useState<boolean>(false);

  return (
    <ChatContext.Provider value={{ isChatOpen, setChatOpen }}>
      {children}
    </ChatContext.Provider>
  );
};
