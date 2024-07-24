import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Box, Heading, VStack, Button, Center, StackDivider, Stack, Input, Card, CardHeader, CardBody, FormControl, FormErrorMessage } from '@chakra-ui/react'

import bg from '../assets/world-map.jpg'


const Results = () => {

  const results = useSelector((state) => state.results)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = (data) => {
    const result = {
      name: data.name,
      played: results.played,
      corect: results.corect,
      incorect: results.incorect
    }
    const arr = JSON.parse(localStorage.getItem('results'))
    const newRes = [arr, ...[result]]
    localStorage.setItem('results', JSON.stringify(newRes))
    navigate('/leaderboard')
  }

  return (
    <Box bgImage={bg} bgPos='center' bgRepeat='no-repeat' bgSize='cover' w='100%' h='100%' p='8'>
      <VStack h='100%'>
        <Card align='center' size='lg'>
          <CardHeader>
            <Heading size='md'>RESULTS</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4' pb='8'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  {`You have answerd ${results.played} questions from 10`}
                </Heading>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  {`Corect: ${results.corect}`}
                </Heading>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  {`Incorect: ${results.incorect}`}
                </Heading>
              </Box>
              <Center>
                <Button as={NavLink} to='/quiz' colorScheme='purple' variant='outline'>
                  Try Again
                </Button>
              </Center>
            </Stack>
            <Stack spacing='4' pb='8'>
              <Heading size='xs' textTransform='uppercase'>
                Enter your name to save the results
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={Boolean(errors.name)}>
                  <Input
                    id='name'
                    variant='outline'
                    placeholder='Enter your name'
                    focusBorderColor={errors.email ? 'red.300' : 'purple.300'}
                    {...register('name', { required: true })}
                  />
                  <FormErrorMessage>
                    {errors.name && 'The name is required'}
                  </FormErrorMessage>
                </FormControl>
                <Center pt='4'>
                  <Button colorScheme='purple' type='submit' isLoading={isSubmitting}>
                    Save
                  </Button>
                </Center>
              </form>
            </Stack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}

export default Results
