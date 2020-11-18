import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import Header from './components/header/header'
import PhonesContainer from './containers/phonesContainer/phonesContainer'
import DescriptionContainer from './containers/descriptonContainer/descriptionContainer'
import Modal from './components/modal/modal'
import Spinner from './components/loader/loader'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  lockBody(loading){
    const body = document.querySelector('body')
    body.classList[loading ? 'add' : 'remove']('modal-open')
  }

  componentDidUpdate(prevProp) {
    if(prevProp.loading !== this.props.loading) {
      this.lockBody(this.state.loading)
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <main className="App__wrapper">
            <Header />
            <Switch>
              <Route path="/" exact={ true } component={ () => <PhonesContainer /> }></Route>
              <Route path="/new" exact={ true } component={ () => <div>create new</div>}></Route>
              <Route path="/update/:id" exact={ true } component={ () => <div>create new</div>}></Route>
              <Route path="/:id" component={ () => <DescriptionContainer /> }></Route>
            </Switch>
            <Modal>
              <Spinner />
            </Modal>
            {/* { this.props.loading ? <Modal><Spinner /></Modal> : null } */}
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
