import { render  } from '@testing-library/react';
import Modal from '../components/modal/modal';
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'
import Store from '../store/ui/reducers'


const mockStore = configureStore([]);
const history = createMemoryHistory()

describe('base modal test', () => {
  let store
  let component
  beforeEach(() => {
    store = mockStore({ ui: Store})
    component = render(
      <Provider store={store}>
        <Router history={ history }>
          <Modal />
        </Router>
      </Provider>
    );
  })

  it('should render', () => {
    expect(component).toMatchSnapshot()
  });

  it('should render modal when is loading', () => {
    store = mockStore({
      ui: { loader: true },
    })
    component = render(
      <Provider store={store}>
        <Router history={ history }>
          <Modal />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
