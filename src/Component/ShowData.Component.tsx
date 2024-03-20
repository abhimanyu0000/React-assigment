import React, { useState, useEffect } from 'react';
import  {useFormContext}  from 'react-hook-form';
import { Box, Text, Badge } from '@chakra-ui/react';

const ShowData: React.FC = () => {
    const { watch,formState } = useFormContext();
    const [displayData, setDisplayData] = useState(false);
    const formData = watch();
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            setTimeout(() => {
                setDisplayData(true);
            }, 3000);
        }
    }, [formState.isSubmitSuccessful]);
    return (
        <Box mt={6}>
        {formState.isSubmitSuccessful && displayData && (
            <Box p={4}  borderRadius="md">
                <Text fontWeight="bold">Submitted Data:</Text>
                <Text>First Name: {formData.firstName}</Text>
                <Text>Last Name: {formData.lastName}</Text>
                <Text>Last Name: {formData.gender.value}</Text>
                <Text>Date of Birth: {formData.dateOfBirth}</Text>
                <Text>Email: {formData.email}</Text>
                <Text>Phone Number: {formData.phoneNumber}</Text>
                <Text>Tech Stack:</Text>
                {formData.techStack.map((tech: { name: string }, index: number) => (
                    <Badge key={index} variant="solid" colorScheme="teal" mr={2}>
                        {tech.name}
                    </Badge>
                ))}
            </Box>
        )}
    </Box>
    );
};

export default ShowData;