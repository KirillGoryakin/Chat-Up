import { Button, Flex } from "@chakra-ui/react";
import { FormInput } from "components/FormInput";
import { useAppDispatch } from "hooks/reduxHooks";
import { logInWithGoogle, signUp } from "store/authThunks";
import { GoogleButton } from "./GoogleButton";

type RegisterFormEvent = {
  target: {
    firstName: { value: string };
    lastName: { value: string };
    email: { value: string };
    password: { value: string };
    avatar: { value: string };
  };
};

const RegisterWindow = () => {
  const dispatch = useAppDispatch();
  
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    
    const 
      { target } = e as typeof e & RegisterFormEvent,
      firstName = target.firstName.value.trim(),
      lastName = target.lastName.value.trim(),

      email = target.email.value.trim(),
      password = target.password.value,
      avatar = target.avatar.value.trim(),
      name = `${firstName} ${lastName}`;

    dispatch(signUp({email, password, name, avatar}));
  }
  
  return (
    <Flex
      as='form'
      onSubmit={handleSubmit}
      flexDirection='column'
      alignItems='center'
      p={4} gap={4}
    >
      <FormInput placeholder="First Name" name='firstName' />
      <FormInput placeholder="Last Name" name='lastName' />
      <FormInput placeholder="Email" name='email' />
      <FormInput placeholder="Password" name='password' type='password' />
      <FormInput placeholder="Url to avatar (optional)" name='avatar' />
      <Button type='submit'>Sign Up</Button>
      
      <GoogleButton onClick={() => dispatch(logInWithGoogle())}>
        Sign Up with Google
      </GoogleButton>
    </Flex>
  )
}

export { RegisterWindow };