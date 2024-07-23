import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Box, Step, Stepper, VStack, useSteps, Button, HStack, Heading } from '@chakra-ui/react'

import QuestionContent from './QuestionContent'


const QuizStepper = ({ questions }) => {

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: questions.length,
  })

  const [stateQuestions, setStateQuestions] = useState([])
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    if (questions) {
      const newQuestions = questions.map(obj => ({ ...obj, answered: false, corect: false, inCorect: false }))
      setStateQuestions(newQuestions)
    }
  }, [questions])

  
  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null)
    }
    // exit early when we reach 0
    if (!timeLeft) return

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft])

  // console.log(stateQuestions)
  const onNext = () => {
    goToNext()
    setTimeLeft(30)
  }

  return (
    <Box bgColor='gray.700' w='100%' borderRadius='4' p='4' h='100%'>
      <Stepper index={activeStep}>
        {stateQuestions.map((question, index) => (
          <Step key={index} />
        ))}
      </Stepper>
      <VStack h='100%' w='100%'>
        <Heading
          as='h4'
          size='md'
          textAlign='center'
          p='2'
        >
          {`Question ${activeStep + 1}/10`}
        </Heading>
        <QuestionContent stateQuestions={stateQuestions} timeLeft={timeLeft} activeStep={activeStep}/>
        <HStack>
          {activeStep !== (0) && <Button colorScheme='purple' onClick={goToPrevious}>
            back
          </Button>
          }
          {activeStep !== 9 && <Button colorScheme='purple' onClick={onNext}>
            next
          </Button>
          }
          {activeStep === 9 && <Button as={NavLink} to='/results' colorScheme='orange' >
            finish
          </Button>
          }
        </HStack>
      </VStack>
    </Box>
  )
}

export default QuizStepper
