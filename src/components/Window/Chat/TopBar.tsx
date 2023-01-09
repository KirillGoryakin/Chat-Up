import { Avatar, Flex, Text } from "@chakra-ui/react";

const TopBar = () => {
  return (
    <Flex
      w='100%'
      py={2}
      pl={5}
      borderBottom='2px solid #282626'
      alignItems='center'
    >
      <Avatar
        name='Name Name'
        src='https://bit.ly/dan-abramov'
        mr={4}
      />

      <Text
        fontSize='xl'
        fontWeight={500}
        color='white'
      >
        Name Name
      </Text>
    </Flex>
  )
}

export { TopBar };