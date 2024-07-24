
import { Outlet } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'


const Layout = () => {
  return (
    <Flex w='100wv' h='100vh'>
      <Outlet />
    </Flex>
  )
}

export default Layout
