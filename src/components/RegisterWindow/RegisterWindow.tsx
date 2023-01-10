import { Button, Flex, Input } from "@chakra-ui/react";

const RegisterWindow = () => {
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
      <Button type='submit'>Sign Up</Button>
    </Flex>
  )
}

export { RegisterWindow };