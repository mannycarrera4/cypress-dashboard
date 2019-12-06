import React from 'react'
import styled from '@emotion/styled'
import {colors, H1} from '@workday/canvas-kit-react-core'

import './App.css'

const HeaderContainer = styled('div')({
  backgroundImage:
    'linear-gradient(to right bottom, rgb(8, 117, 225), rgb(0, 92, 185));',
  height: 350,
  textAlign: 'left'
})

const TypeContainer = styled('div')({
  color: colors.frenchVanilla100,
  padding: '50px 10%'
})

const ProjectName = styled(H1)({
  color: colors.frenchVanilla100,
  fontWeight: 700,
  fontSize: '36px'
})
const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <TypeContainer>
        <ProjectName>Project Name</ProjectName>
        <H1>Project Link</H1>
      </TypeContainer>
    </HeaderContainer>
  )
}

export default Header
