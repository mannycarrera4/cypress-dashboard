import React from 'react'
import styled from '@emotion/styled'
import {colors, H1} from '@workday/canvas-kit-react-core'
import {githubIcon} from '@workday/third-party-icons-web/dist/system/es6'
import {SystemIcon} from '@workday/canvas-kit-react-icon'

import './App.css'

export interface HeaderProps {
  projectTitle?: string | React.ReactNode
  link?: string
}

const HeaderContainer = styled('div')({
  backgroundImage:
    'linear-gradient(to right bottom, rgb(8, 117, 225), rgb(0, 92, 185));',
  height: 300,
  textAlign: 'left'
})

const TypeContainer = styled('div')({
  color: colors.frenchVanilla100,
  padding: '150px 10% 10px'
})

const ProjectName = styled(H1)({
  color: colors.frenchVanilla100,
  fontWeight: 700,
  fontSize: '36px'
})

const Link = styled('a')({
  fontWeight: 700,
  marginLeft: '-10px',
  outline: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  }
})

const IconWrapper = styled('div')({
  display: 'inline-flex',
  marginRight: 10,
  alignItems: 'center'
})

class Header extends React.Component<HeaderProps, {}> {
  static defaultProps = {
    projectTitle: 'Project Title',
    projectLink: ''
  }
  public render() {
    const {projectTitle, link} = this.props
    return (
      <HeaderContainer>
        <TypeContainer>
          <ProjectName>
            {projectTitle}
          </ProjectName>
          <Link href={link}>
            <IconWrapper>
              <SystemIcon
                fill={colors.frenchVanilla100}
                accent={colors.frenchVanilla100}
                accentHover={colors.frenchVanilla100}
                size={24}
                icon={githubIcon}
              />
              <span style={{marginLeft: '10px'}}>View Repo on Github</span>
            </IconWrapper>
          </Link>
        </TypeContainer>
      </HeaderContainer>
    )
  }
}

export default Header
