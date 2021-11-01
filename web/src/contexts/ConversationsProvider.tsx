import useLocalStorage from "@/hooks/useLocalStorage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

type ConversationType = {
  recipients: string[];
  messages: {
    sender: string;
    text: string;
  }[];
};

type FormattedConversationType = {
  recipients: {
    id: string;
    name: string;
  }[];
  selected: boolean;
  conversations: string[];
  messages: {
    text: string;
    sender: string;
    fromMe: boolean;
    senderName: string;
  }[];
};

interface AddMessageToConversionProps {
  recipients: string[];
  text: string;
  sender: string;
}

interface ContextInterface {
  conversations: FormattedConversationType[];
  createConversation: (recipients: string[]) => void;
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedConversation: FormattedConversationType;
  sendMessage: (recipients: string[], text: string) => void;
}

interface ProviderProps {
  children?: React.ReactNode;
  id: string;
}

const ConversationsContext = createContext<ContextInterface | null>(null);

export function useConversations() {
  return useContext(ConversationsContext);
}

export const ConversationsProvider = ({ children, id }: ProviderProps) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const { contacts } = useContacts()!;

  const { socket } = useSocket()!;

  function createConversation(recipients: string[]) {
    setConversations((prevConversations: any) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  const formattedConversations: FormattedConversationType[] = conversations.map(
    (conversation: ConversationType, index: number) => {
      const recipients = conversation.recipients.map((recipient) => {
        const contact = contacts.find((contact) => {
          return contact.id === recipient;
        });
        const name = (contact && contact.name) || recipient;
        return { id: recipient, name };
      });
      const messages = conversation.messages.map((message) => {
        const contact = contacts.find((contact) => {
          return contact.id === message.sender;
        });
        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;
        return { ...message, senderName: name, fromMe };
      });
      const selected = index === selectedConversationIndex;
      return { ...conversations, recipients, selected, messages };
    }
  );

  const addMessageToConversion = useCallback(
    ({ recipients, text, sender }: AddMessageToConversionProps) => {
      setConversations((prevConversations: any) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map(
          (conversation: ConversationType) => {
            if (arrayEquality(conversation.recipients, recipients)) {
              madeChange = true;
              return {
                ...conversation,
                messages: [...conversation.messages, newMessage],
              };
            }
            return conversation;
          }
        );

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", addMessageToConversion);
    } else {
      return;
    }
    return () => {
      socket.off("receive-message");
    };
  }, [socket, addMessageToConversion]);

  function sendMessage(recipients: string[], text: string) {
    socket?.emit("send-message", { recipients, text });
    addMessageToConversion({ recipients, text, sender: id });
  }

  const value = {
    conversations: formattedConversations,
    createConversation,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

function arrayEquality(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((element: string, index) => {
    return element === b[index];
  });
}
