import { Box, Center, VStack, Heading, Button } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import bg from '../assets/world.gif'

const Home = () => {
  return (
    <Box bgImage={bg} bgPos='center' bgRepeat='no-repeat' bgSize='cover' w='100%' p='8'>
      <Center h='100%'>
        <VStack h='100%' justify='space-between'>
          <VStack>
            <Heading
              as='h2'
              size='2xl'
              textAlign='center'
              sx={{ '-webkit-text-stroke-width': '2px', '-webkit-text-stroke-color': 'purple' }}
            >
              County Quest
            </Heading>
            <Heading
              as='h4'
              size='md'
              textAlign='center'
              sx={{ '-webkit-text-stroke-width': '1px', '-webkit-text-stroke-color': 'purple' }}
            >
              Test your knowledge about the world
            </Heading>
          </VStack>
          <Button as={NavLink} to='quiz' colorScheme='purple'>
            Let`s Start!
          </Button>
          <Button as={NavLink} to='leaderboard' colorScheme='purple' variant='link'>
            Check the Leaderboard
          </Button>
        </VStack>
      </Center>
    </Box>
  )
}

export default Home
