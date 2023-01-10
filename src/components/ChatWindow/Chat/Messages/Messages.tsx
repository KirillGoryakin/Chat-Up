import { Flex } from "@chakra-ui/react";
import { Message } from "./Message";

const Messages = () => {
  const messages = [
    {text: 'Some text', isOur: false},
    {text: 'A lot of text text text text text text', isOur: false},
    {text: 'My reply', isOur: true},
    {text: 'I', isOur: true},
    {text: 'like', isOur: true},
    {text: 'to', isOur: true},
    {text: 'reply', isOur: true},
    {text: 'with', isOur: true},
    {text: 'one', isOur: true},
    {text: 'word', isOur: true},
    {text: 'per', isOur: true},
    {text: 'message', isOur: true},
    {text: 'I hate when people reply like that 😡.', isOur: false},
    {text: 'Please stop', isOur: false},
    {text: 'Also here is a long text for ya', isOur: true},
    {text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio fuga corrupti cumque voluptates saepe sequi voluptatem id numquam repellat sunt voluptate ratione, labore possimus ut expedita ex provident? Blanditiis, a. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio fuga corrupti cumque voluptates saepe sequi voluptatem id numquam repellat sunt voluptate ratione, labore possimus ut expedita ex provident? Blanditiis, a.', isOur: true},
    {text: 'Thanks, here is mine:', isOur: false},
    { text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio fuga corrupti cumque voluptates saepe sequi voluptatem id numquam repellat sunt voluptate ratione, labore possimus ut expedita ex provident? Blanditiis, a. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio fuga corrupti cumque voluptates saepe sequi voluptatem id numquam repellat sunt voluptate ratione, labore possimus ut expedita ex provident? Blanditiis, a. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio fuga corrupti cumque voluptates saepe sequi voluptatem id numquam repellat sunt voluptate ratione, labore possimus ut expedita ex provident? Blanditiis, a. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio fuga corrupti cumque voluptates saepe sequi voluptatem id numquam repellat sunt voluptate ratione, labore possimus ut expedita ex provident? Blanditiis, a.', isOur: false},
  ];
  
  return (
    <Flex
      w='100%'
      overflowY='auto'
      flexDirection='column'
      px={5}
      pt={2}
    >
      {messages.map((msg, i) => <Message key={i} message={msg} />)}
    </Flex>
  )
}

export { Messages };