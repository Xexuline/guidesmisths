import { render } from '@testing-library/react';
import App from '../App';
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'
 
const mockStore = configureStore([]);
const history = createMemoryHistory()

describe('base app test', () => {
  let store
  let component
  beforeEach(() => {
    store = mockStore({
      ui: {},
    })
    component = render(
      <Provider store={store}>
        <Router history={ history }>
          <App />
        </Router>
      </Provider>
    );
  })

  it('should render', () => {
    expect(component).toMatchSnapshot()
  });
})
