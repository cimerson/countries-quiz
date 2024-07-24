import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ConfettiExplosion from 'react-confetti-explosion'

import { Box, Step, Stepper, VStack, useSteps, Button, HStack, Heading } from '@chakra-ui/react'

import QuestionContent from './QuestionContent'

import { updateResults } from '../reduxToolkit/resultsSlice'

import { timeout } from '../utils/utils'


const QuizStepper = ({ questions }) => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: questions.length,
  })

  const [stateQuestions, setStateQuestions] = useState([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [played, setPlayed] = useState(0)
  const [corect, setCorect] = useState(0)
  const [incorect, setincorect] = useState(0)
  const [isExploding, setIsExploding] = useState(false)
  
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
    if (!timeLeft) return

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    return () => clearInterval(intervalId);
  }, [timeLeft])

  const onNext = () => {
    goToNext()
    setTimeLeft(30)
  }

  const onFinish = async () => {
    setIsExploding(true)
    dispatch(updateResults({played: played, corect: corect, incorect: incorect}))
    await timeout(2000)
    navigate('/results')
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
        {isExploding && <ConfettiExplosion 
          force={0.8}
          duration={2000}
          particleCount={250}
          width={1600}
        />}
        <QuestionContent 
          stateQuestions={stateQuestions}
          timeLeft={timeLeft}
          activeStep={activeStep}
          played={played}
          corect={corect}
          incorect={incorect}
          setPlayed={setPlayed}
          setCorect={setCorect}
          setincorect={setincorect}
        />
        <HStack>
          {activeStep !== (0) && <Button colorScheme='purple' onClick={goToPrevious}>
            back
          </Button>
          }
          {activeStep !== 9 && <Button colorScheme='purple' onClick={onNext}>
            next
          </Button>
          }
          {activeStep === 9 && <Button colorScheme='orange' onClick={onFinish} >
            finish
          </Button>
          }
        </HStack>
      </VStack>
    </Box>
  )
}

export default QuizStepper
