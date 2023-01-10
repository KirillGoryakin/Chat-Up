import { Button, Flex, Input } from "@chakra-ui/react";

const LoginWindow = () => {
  const handleSubmit: React.FormEventHandler = (e) => {

  }
  
  return (
    <Flex
      as='form'
      onSubmit={handleSubmit}
      flexDirection='column'
      alignItems='center'
      p={4} gap={4}
    >
      <Input size='lg' placeholder="Login" name='login' />
      <Input size='lg' placeholder="Password" type='password' name='password' />
      <Button type='submit'>Log In</Button>
    </Flex>
  )
}

export { LoginWindow };