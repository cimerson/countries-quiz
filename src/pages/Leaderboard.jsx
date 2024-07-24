import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Box, Heading, Button, Center, Card, VStack, Table, Thead, Tbody, Tr, Th, Td, TableContainer,} from '@chakra-ui/react'

import bg from '../assets/world-map.jpg'
import Trophy from '../assets/trophy-icon.svg'

import { removeNullValues } from '../utils/utils'


const Leaderboard = () => {

  const [results, setResults] = useState([])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('results'))
    
    if (items) {
      const notNull = removeNullValues(items)
      const sorted = notNull.sort(( a, b ) => { return b.corect - a.corect })
      setResults(sorted)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box bgImage={bg} bgPos='center' bgRepeat='no-repeat' bgSize='cover' w='100%' h='100%' p='8'>
      <VStack h='100%'>
        <Box>
          <Center>
            <Trophy style={{ height: '9.259vh' }} />
          </Center >
          <Center>
            <Heading
              as='h2'
              size='2xl'
              textAlign='center'
              sx={{ color: 'yellow.500', textWrap: 'nowrap' }}
              pb='2'
            >
              Leaderboard
            </Heading>
          </Center>
        </Box>
        <Card h='100%' sx={{overflowY: 'hidden'}}>
          <TableContainer flex='1' p='4' sx={{overflowY: 'auto'}}>
            <Table size='sm' colorScheme='purple'>
              <Thead>
                <Tr>
                  <Th>name</Th>
                  <Th>played questions</Th>
                  <Th>points</Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result, index) => (
                  <Tr key={index}>
                    <Td>{result && result.name}</Td>
                    <Td>{result && result.played}</Td>
                    <Td>{result && result.corect * 10}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
        <Box pt='2'>
          <Button as={NavLink} to='/' colorScheme='purple'>
            Back to start
          </Button>
        </Box>
      </VStack>
    </Box >
  )
}

export default Leaderboard
