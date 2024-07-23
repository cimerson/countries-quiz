import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'

import { Spinner, Box, Center, VStack, Heading } from '@chakra-ui/react'

import QuizStepper from '../components/QuizStepper'

import { pickRandomCountry, getRandomInt, getShuffledArr } from '../utils/utils'

const GET_COUNTRIES = gql`
  query {
    countries{
      name
      capital
      code
    }
}
`

const Quiz = () => {

  const [questions, setQuestions] = useState([])

  const { loading, error, data } = useQuery(GET_COUNTRIES)

  useEffect(() => {
    const questions = []
    if (data && data.countries) {
      const { countries } = data
      //Generate questions array of 10 random countries
      while (countries.length > 0 && questions.length < 10) {
        const randomCountry = pickRandomCountry(countries)
        //Add question type
        const questionTypeCountry = { ...randomCountry, questionType: getRandomInt(0, 1) }
        //Make array for answesr choises
        const choises = []
        //Push the modified random country in choises array
        // const u = {name: questionTypeCountry.name, color: 'green.500'}
        choises.push({name: questionTypeCountry.name, color: 'green.500'})
        //Generate choises array of 3 random countries + one who will be correct
        while (countries.length > 0 && choises.length < 4) {
          let choiseCountry = pickRandomCountry(countries)
          //Check if country already exists in choise array
          if (!choises.some((option) => option.name === choiseCountry.name)) {
            choises.push({name: choiseCountry.name, color: null})
          }

          // choises.push({name: choiseCountry.name, color: null})
        }
        //Shuffle choises
        const shuffledChoises = getShuffledArr(choises)
        //Add shuffled Choises
        const choisesCountry = { ...questionTypeCountry, choises: shuffledChoises }
        //Check if modified country already exists in questions array
        if (!questions.some((question) => question.name === choisesCountry.name)) {
          questions.push(choisesCountry)
        }
      }
    }
    //Set the questions state
    setQuestions(questions)
  }, [data])

  if (loading) {
    return (
      <Box w='100%' h='100%' p='8'>
        <Center h='100%'>
          <Spinner w='100px' h='100px' colorScheme='purple' />
        </Center>
      </Box>
    )
  }
  
  if (error) {
    return (
      <Box w='100%' h='100%' p='8'>
        <Center h='100%'>
        <Heading as='h4' size='md' textAlign='center'>{error.message}</Heading>
        </Center>
      </Box>
    )
  }

  // console.log('QTTTT', questions) 

  return (
    <Box w='100%' h='100%' p='8'>
      <Center h='100%'>
        <VStack w='100%' h='100%'>
          <Heading
            as='h2'
            size='2xl'
            textAlign='center'
          >
            Country Quest
          </Heading>
          <QuizStepper questions={questions} />
        </VStack>
      </Center>
    </Box>
  )
}

export default Quiz
