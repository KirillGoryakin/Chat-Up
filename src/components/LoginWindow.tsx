import { Button, Flex } from "@chakra-ui/react";
import { useAppDispatch } from "hooks/reduxHooks";
import { logIn, logInWithGoogle } from "store/slices/AuthSlice";
import { FormInput } from "./FormInput";
import { GoogleButton } from "./GoogleButton";

type LoginFormEvent = {
  target: {
    email: { value: string };
    password: { value: string };
  };
};

const LoginWindow = () => {
  const dispatch = useAppDispatch();
  
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    const
      { target } = e as typeof e & LoginFormEvent,
      email = target.email.value.trim(),
      password = target.password.value;

    dispatch(logIn({ email, password }));
  }
  
  return (
    <Flex
      as='form'
      onSubmit={handleSubmit}
      flexDirection='column'
      alignItems='center'
      p={4} gap={4}
    >
      <FormInput size='lg' placeholder="Email" name='email' />
      <FormInput size='lg' placeholder="Password" type='password' name='password' />
      <Button type='submit'>Log In</Button>

      <GoogleButton onClick={() => dispatch(logInWithGoogle())}>
        Log In with Google
      </GoogleButton>
    </Flex>
  )
}

export { LoginWindow };