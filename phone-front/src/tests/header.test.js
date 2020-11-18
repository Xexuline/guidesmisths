import { render, fireEvent } from '@testing-library/react';
import Header from '../components/header/header';
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
const history = createMemoryHistory({ initialEntries: ['/new', '/'] })

describe('base header test', () => {
  let component
  beforeEach(() => {
    component = render(
      <Router history={ history }>
        <Header />
      </Router>
    )
    
  })

  it('should render', () => {
    expect(component).toBeDefined()
  })

  it('should click on new', () => {
    const btn = document.querySelector('.icon-plus')
    fireEvent.click(btn)
    expect(btn).toBeDefined()
    expect(history.location.pathname).toBe('/new')
    
  })

  it('should click on go to prev', () => {
    const btn = document.querySelector('.icon-arrow')
    expect(btn).toBeDefined()
  })


})