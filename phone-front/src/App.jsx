import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import Header from './components/header/header'
import PhonesContainer from './containers/phonesContainer/phonesContainer'
import DescriptionContainer from './containers/descriptonContainer/descriptionContainer'
import CreationContainer from './containers/creationContainer/creationContainer'
import Modal from './components/modal/modal'
import Spinner from './components/loader/loader'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <main className="App__wrapper">
            <Header />
            <Switch>
              <Route path="/" exact={ true } component={ PhonesContainer }></Route>
              <Route path="/new" exact={ true } component={ CreationContainer }></Route>
              <Route path="/update/:id" exact={ true } component={ DescriptionContainer }></Route>
              <Route path="/:id" component={ DescriptionContainer }></Route>
            </Switch>
            <Modal>
              <Spinner />
            </Modal>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
