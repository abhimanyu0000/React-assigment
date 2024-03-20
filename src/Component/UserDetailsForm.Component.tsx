
import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Box, Flex, Button, FormControl, InputRightElement, Icon ,FormErrorMessage, Stack, FormLabel, VStack, Input, InputGroup, InputLeftAddon, HStack, Heading, CloseButton } from '@chakra-ui/react';
import { useState } from "react";
import { useFormContext, Controller } from 'react-hook-form';
import { Select, OptionBase, GroupBase ,ChakraStylesConfig} from "chakra-react-select";
import "../App.css";




interface Gender extends OptionBase {
    value: string;
    label: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    gender: Gender[];
    dateOfBirth: string;
    techStack: { name: string }[];
    email: string;
    phoneNumber: string;
};

const genderOptions: Gender[] = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
];



const UserDetailsForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, control } = useFormContext<FormData>();
    const { fields, append, remove } = useFieldArray({ control, name: 'techStack' });
    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = async (data: FormData) => {
        console.log(data);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    


    return (
        <Flex alignItems="center" justifyContent="center" >
            <Box p='20px'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing="4">
                        <Heading alignSelf="flex-start" fontSize='larger'>Basic Details</Heading>
                        <Stack direction={['column', 'row']} spacing={[4, 8]} alignSelf="flex-start">
                            <FormControl isInvalid={!!errors.firstName}>
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <Input placeholder='Enter First Name' id="firstName" {...register('firstName', {
                                    required: 'First Name is required',
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: 'First Name is incorrect'
                                    }
                                })} bg="#CCD3CA" _placeholder={{ color: 'white', fontWeight: 'bold' }} width="250px" />
                                <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.lastName}>
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <Input id="lastName" placeholder='Enter Last Name' {...register('lastName', {
                                    required: 'Last Name is required',
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: 'Last Name is incorrect'
                                    }
                                })} bg="#CCD3CA" _placeholder={{ color: 'white', fontWeight: 'bold' }} width="250px" />
                                <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
                            </FormControl>
                        </Stack>

                        <Heading alignSelf="flex-start" fontSize='larger'>Other Information</Heading>
                        <Stack direction={['column', 'row']} spacing={[4, 8]} alignSelf="flex-start" >

                        <FormControl isInvalid={!!errors.dateOfBirth}>
                                <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                                <Input type="date" id="dateOfBirth" {...register('dateOfBirth', { required: 'Date of Birth is required' })} bg="#CCD3CA" _placeholder={{ color: 'white', fontWeight: 'bold' }} width='250px' />
                                <FormErrorMessage>{errors.dateOfBirth && errors.dateOfBirth.message}</FormErrorMessage>
                            </FormControl>
                            
                            <Controller
                                control={control}
                                name="gender"
                                rules={{ required: 'Gender is required' }}
                                render={({ field: { onChange, value, name }, fieldState: { error } }) => (
                                    <FormControl isInvalid={!!error}>
                                        <FormLabel htmlFor="gender">Gender</FormLabel>
                                        <Select<Gender, false, GroupBase<Gender>>
                                            variant="filled"
                                            useBasicStyles
                                            errorBorderColor="red.500" isInvalid={!!error} 
                                            size='md'
                                            name={name}
                                            onChange={onChange}
                                            value={value}
                                            options={genderOptions}
                                            placeholder="Select Your  Gender"
                                            closeMenuOnSelect={true}
                                            colorScheme="purple"
                                            classNamePrefix="chakra-react-select"
                                        />
                                     
                                        <FormErrorMessage>{error && error.message}</FormErrorMessage>
                                    </FormControl>
                                )}
                            />

                           
                        </Stack>


                        <Stack direction={['column', 'row']} spacing={[4, 8]} alignSelf="flex-start">
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel htmlFor="email">Email Address</FormLabel>
                                <Input w='107%'
                                    id="email"
                                    type="email"
                                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } })}
                                    placeholder="Enter Email Address"
                                    bg="#CCD3CA" _placeholder={{ color: 'white', fontWeight: 'bold' }}
                                    width="250px"
                                />
                                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.phoneNumber}>
                                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>
                                        +91
                                    </InputLeftAddon>
                                    <Input
                                        id="phoneNumber"
                                        type="tel"
                                        inputMode="numeric"
                                        bg="#CCD3CA" _placeholder={{ color: 'white', fontWeight: 'bold' }}

                                        {...register('phoneNumber', { required: 'Phone Number is required', pattern: { value: /^\d{10}$/, message: 'Invalid phone number format' } })}
                                        placeholder="Enter Phone Number"
                                        width="191px"
                                    />
                                </InputGroup>

                                <FormErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</FormErrorMessage>
                            </FormControl>
                        </Stack>


                        <FormControl isInvalid={!!errors.techStack} width="250px" alignSelf="flex-start">
                            <HStack align='baseline' justifyContent='space-between'>
                                <FormLabel>Tech Stack</FormLabel>
                                <Button colorScheme='teal' variant='ghost' onClick={() => append({ name: '' })}>+</Button>
                            </HStack>
                            {fields.map((field, index) => (
                                <Box key={field.id} position="relative">
                                    <Input
                                        {...register(`techStack.${index}.name`, { required: 'Tech Stack is required' })}
                                        placeholder="Enter Tech Stack"
                                        bg="#CCD3CA"
                                        _placeholder={{ color: 'white', fontWeight: 'bold' }}
                                    />
                                    {index !== 0 && ( // Show cross icon for all input boxes except the first one
                                        <CloseButton
                                            position="absolute"
                                            top="50%"
                                            right="5px"
                                            transform="translateY(-50%)"
                                            onClick={() => remove(index)}
                                        />
                                    )}
                                </Box>
                            ))}
                            {fields.length === 0 && ( // Initially show one input box
                                <Box>
                                    <Input
                                        {...register(`techStack.0.name`, { required: 'Tech Stack is required' })}
                                        placeholder="Enter Tech Stack"
                                        bg="#CCD3CA"
                                        _placeholder={{ color: 'white', fontWeight: 'bold' }}
                                    />
                                </Box>
                            )}

                            <FormErrorMessage>{errors.techStack && errors.techStack.message}</FormErrorMessage>
                        </FormControl>


                        <Button alignSelf="flex-end" type="submit" isLoading={isLoading}
                            loadingText='Submitting'
                            colorScheme='teal'
                            variant='outline'>Submit</Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default UserDetailsForm;
