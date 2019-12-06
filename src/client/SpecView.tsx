import React from 'react'
import styled from '@emotion/styled'
import {spacing, H4} from '@workday/canvas-kit-react-core'

import Card from '@workday/canvas-kit-react-card'
import Tabs from './Tabs'
import SpecList from './SpecList'
import {extLinkIcon} from '@workday/canvas-system-icons-web'
import {SystemIcon} from '@workday/canvas-kit-react-icon'

const allSpecData = {
  specs: {
    total: [
      {
        testName: 'Modal.spec.tsx',
        passed: true
      },
      {
        testName: 'Button.spec.tsx',
        passed: true
      }
    ]
  }
}

const failSpecData = {
  specs: {
    total: [
      {
        testName: 'SidePanel.spec.tsx',
        passed: false
      },
      {
        testName: 'FormField.spec.tsx',
        passed: false,
        errorMessage:
          "Timed out retrying: expected '<div.css-p94cei-Popup__Container.ele5ym80>' not to be 'visible"
      }
    ]
  }
}

const data = {
  points: {
    total: [
      {
        id: 1,
        name: 'tab-1',
        text: 'Spec',
        passed: true,
        content: () => <SpecList data={allSpecData} />
      },
      {
        id: 2,
        name: 'tab-2',
        text: 'Failures',
        passed: true,
        content: () => <SpecList data={failSpecData} />
      }
    ]
  }
}

const Container = styled('div')({
  margin: '0 10%',
  paddingTop: 30,
  maxHeight: '60%',
  overflowY: 'auto',
  textAlign: 'left'
})

const RunNumber = styled('div')({
  fontSize: '24',
  fontWeight: 700,
  // textDecoration: 'all'
  color: 'rgb(94, 106, 117)',
  marginBottom: 20
})

class SpecView extends React.Component<{}, {}> {
  static defaultProps = {
    projectTitle: 'Project Title',
    projectLink: ''
  }
  public render() {
    return (
      <Container>
        <RunNumber>
          <a>RUN #342</a>
        </RunNumber>
        <Card padding={spacing.zero} style={{border: 'none'}}>
          <Tabs data={data} />
        </Card>
      </Container>
    )
  }
}

export default SpecView
