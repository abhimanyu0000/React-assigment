// App.tsx
import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import UserDetailsForm from './Component/UserDetailsForm.Component';
import ShowData from './Component/ShowData.Component';
import { FormProvider, useForm } from 'react-hook-form';

function App() {
  const methods = useForm(); 

  return (
    <Box m="10px">
      <Heading textAlign='center' mt='10px' fontSize='30px'>User Details</Heading>
      <FormProvider {...methods}>
        <Container maxW={{ base: "100%", sm: "80%", md: "70%", lg: "60%", xl: "50%" }} bg='#F5E8DD' mt="10px" p="4" borderRadius='10px'>
          <Box mt="8">
            <UserDetailsForm />
          </Box>
        </Container>

        <Container maxW={{ base: "100%", sm: "80%", md: "70%", lg: "60%", xl: "50%" }} bg='#F5E8DD' mt="10px" p="4" borderRadius='10px'>
          <Box mt="8">
            <ShowData />
          </Box>
        </Container>
      </FormProvider>
    </Box>
  );
}

export default App;
