import { useEffect, useState } from 'react'

import { Box, Heading, Image, SimpleGrid, Button, Center, Progress } from '@chakra-ui/react'

import ReactCountryFlag from 'react-country-flag'

import monuments from '../assets/monuments.jpg'

import { getQustionByType } from '../utils/utils'


const QuestionContent = ({ timeLeft, stateQuestions, activeStep, played, corect, incorect, setPlayed, setCorect, setincorect }) => {

  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState()

  useEffect(() => {
    if (stateQuestions) {

      setQuestions(stateQuestions)
    }
  }, [stateQuestions])

  useEffect(() => {
    if (questions) {

      setQuestion(questions[activeStep])
    }
  }, [questions, activeStep])

  const onAnswer = (choise, index) => {
    question.answered = true
    setPlayed(played + 1)
    if (question.name === choise) {
      question.corect= true
      setCorect(corect + 1)
    } else {
      const updatedChoises = question.choises
      updatedChoises[index].color = 'red.500'
      question.inCorect = true
      setincorect(incorect +1)
      question.choises = updatedChoises
    }
  }

  const option = question && question.questionType
  const choises = question && question.choises
  const capital = question && question.capital
  const code = question && question.code
  const name = question && question.name

  return (
    <Box flex='1' h='100%' w='100%' display='flex' flexDir='column' justifyContent='space-between'>
      <Center>
        {option === 0 && <Box>
          <Image
            src={monuments}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            w='20.833vw'
          />
        </Box>
        }
        {option === 1 && <Box>
          <ReactCountryFlag
            countryCode={code}
            svg
            style={{
              width: '20.833vw',
              height: 'auto',
            }}
            aria-label={name}
            title={code}
          />
        </Box>
        }
      </Center>
      <Box>
        {question && !question.answered && <Progress value={timeLeft * 3.333} bgColor='red.500' colorScheme='purple' />}
        <Heading as='h4' size='md' textAlign='center' p='2'>
          {getQustionByType(option, capital)}
        </Heading>
        <SimpleGrid columns={{ sm: 4, lg: 2 }} rowGap='2' columnGap='2'>
          {choises && choises.map((choise, index) => {
            if(question.answered){
              return (
                <Button isDisabled={question.answered} key={index} bgColor={choise.color} colorScheme='purple' variant='outline' w='100%'>
                  {choise.name}
                </Button>
              )
            }
            return(
              <Button key={index} colorScheme='purple' variant='outline' w='100%' onClick={() => onAnswer(choise.name, index)}>
                  {choise.name}
              </Button>
            )
        })}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default QuestionContent
