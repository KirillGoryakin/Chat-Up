import { Flex } from "@chakra-ui/react";
import { ChatItem } from "./ChatItem";
import { SidebarHeading } from "./SidebarHeading";

const Sidebar = () => {
  const chats: any = [
    { name: 'Name Name', avatar: 'https://bit.ly/dan-abramov'},
    { name: 'Kirill Goryakin', avatar: 'https://avatars.githubusercontent.com/u/115032657?v=4'},
    { name: 'A Really Freaking Long Name Name Name Name Name', avatar: ''},
  ];
  
  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      borderRight='2px solid #282626'
      minW={300}
      w='100%'
      py={30}
    >
      <SidebarHeading />

      <div style={{
        width: '100%',
        overflowY: 'auto',
      }}>
        {chats.map((chat: any, i: number) => <ChatItem key={i} chat={chat} />)}
      </div>
    </Flex>
  )
}

export { Sidebar };