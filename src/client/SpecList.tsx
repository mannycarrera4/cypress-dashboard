import React from 'react'
import styled from '@emotion/styled'
import {css, jsx} from '@emotion/core'
import {colors} from '@workday/canvas-kit-react-core'

import {
  checkSmallIcon,
  xSmallIcon,
  videoIcon,
  cameraPlusIcon
} from '@workday/canvas-system-icons-web'
import {SystemIcon} from '@workday/canvas-kit-react-icon'

export interface SpecListProps {
  data: any
}

const Status = styled('div')({
  width: 30,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
})

const StatusPass = styled('div')({
  backgroundColor: colors.greenApple400,
  width: 30,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
})

const SpecContainer = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  borderBottom: `1px solid ${colors.soap400}`
})

const SpecDetails = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0',
  alignItems: 'stretch',
  minWidth: 0,
  padding: 15
})

const SpecListContainer = styled('ul')({
  margin: 0,
  paddingLeft: 0
})

const ErrorMessage = styled('div')({
  color: colors.cinnamon400,
  margin: '20px 0'
})

const FailureActionsContainer = styled('div')({
  display: 'inline-flex',
  position: 'absolute',
  right: '30px'
})

class SpecList extends React.Component<SpecListProps, {}> {
  public render() {
    var total = this.props.data.specs.total,
      spec = total.map((el: any, i: any) => {
        return (
          <SpecContainer>
            <Status
              style={{
                backgroundColor: el.passed
                  ? colors.greenApple400
                  : colors.cinnamon400
              }}
            >
              <SystemIcon
                fillHover={colors.frenchVanilla100}
                fill={colors.frenchVanilla100}
                accent={colors.frenchVanilla100}
                accentHover={colors.frenchVanilla100}
                icon={el.passed ? checkSmallIcon : xSmallIcon}
              />
            </Status>
            <SpecDetails>
              <div>
                {el.testName}
              </div>
              {el.errorMessage &&
                <ErrorMessage>
                  {el.errorMessage}
                </ErrorMessage>}
              {el.passed === false &&
                <FailureActionsContainer>
                  <SystemIcon
                    style={{marginRight: '20px'}}
                    title={'View Screenshot'}
                    icon={cameraPlusIcon}
                  />
                  <SystemIcon title={'View Video Recording'} icon={videoIcon} />
                </FailureActionsContainer>}
            </SpecDetails>
          </SpecContainer>
        )
      })

    return (
      <SpecListContainer>
        {spec}
      </SpecListContainer>
    )
  }
}

export default SpecList
