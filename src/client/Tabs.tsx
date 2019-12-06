import React from 'react'
import styled from '@emotion/styled'
import {css, jsx} from '@emotion/core'
import {colors} from '@workday/canvas-kit-react-core'

import Card from '@workday/canvas-kit-react-card'

import './App.css'

export interface TabProps {
  isActive: boolean
  onActiveTab: () => void
  content: any
}

export interface TabsState {
  selectedTabId: number
}

export interface TabsProps {
  data: any
}

const TabsContainer = styled('div')({
  display: 'flex',
  borderBottom: '1px solid #ced3d9',
  paddingLeft: '20px'
})

const TabText = styled('div')<Pick<TabProps, 'isActive'>>(
  {
    padding: '10px 22px',
    fontSize: '14px',
    fontWeight: 500,
    marginRight: '4px',
    maxWidth: 280,
    boxSizing: 'border-box',
    border: '2px solid transparent',
    position: 'relative',
    marginTop: 20,
    color: '#333333',
    cursor: 'pointer',
    borderRadius: '4px 4px 0 0',
    display: 'inline-flex'
  },
  ({isActive}) => {
    return {
      borderBottom: isActive ? `3px solid ${colors.blueberry400}` : 'none',
      '&:hover': {
        backgroundColor: isActive ? '#d7eafc' : '#f0f1f2'
      }
    }
  }
)

const SpecRow = styled('div')({
  display: 'flex',
  borderBottom: `1px solid ${colors.soap400}`,
  padding: 15
})

class Tab extends React.Component<TabProps, {}> {
  public render() {
    return (
      <TabText isActive={this.props.isActive} onClick={this.props.onActiveTab}>
        <p>
          {this.props.content}
        </p>
      </TabText>
    )
  }
}

class Tabs extends React.Component<TabsProps, TabsState> {
  isActive = (id: number) => {
    return this.state.selectedTabId === id
  }

  setActiveTab = (selectedTabId: number) => {
    this.setState({selectedTabId})
  }

  state = {
    selectedTabId: 1
  }

  public render() {
    var total = this.props.data.points.total,
      tabs = total.map((el: any, i: any) => {
        return (
          <Tab
            key={i}
            content={el.text}
            isActive={this.isActive(el.id)}
            onActiveTab={() => this.setActiveTab(el.id)}
          />
        )
      })

    return (
      <div>
        <TabsContainer>
          {tabs}
        </TabsContainer>
        <SpecRow>
          {total
            .find((tab: any) => tab.id === this.state.selectedTabId)
            .content()}
        </SpecRow>
      </div>
    )
  }
}

export default Tabs
