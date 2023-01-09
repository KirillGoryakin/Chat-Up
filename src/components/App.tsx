import { Box } from "@chakra-ui/react";
import { Header } from "./Header";
import { Window } from "./Window";

const App = () => {
  return (
    <div>
      <Header />

      <Box
        maxW={1200}
        mx='auto'
        mt={100}
      >
        <Window />
      </Box>
    </div>
  );
}

export { App };