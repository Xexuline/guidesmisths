// import logo from './logo.svg';
import React, { Component } from 'react'
import './App.scss';
import Header from './components/header/header'
import PhonesContainer from './containers/phonesContainer/phonesContainer'
import DescriptionContainer from './containers/descriptonContainer/descriptionContainer'
import Modal from './components/modal/modal'
import Spinner from './components/loader/loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    this.loader = this.loader.bind(this)
  }


  loader(isLoading) {
    if(this.state.loading !== isLoading){
      this.setState({
        loading: isLoading
      })
    }
  }

  lockBody(loading){
    const body = document.querySelector('body')
    body.classList[loading ? 'add' : 'remove']('modal-open')
  }

  componentDidUpdate(prevProp, prevState) {
    if(prevState.loading !== this.state.loading) {
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
            { this.state.loading ? <Modal><Spinner /></Modal> : null }
          </main>
        </div>
      </BrowserRouter>
    );
  }
}
// function App() {

//   function changeSelected() {
//     alert('2')
//   }
  
//   return (
//     <div className="App">
//       <Layout 
//         header={ <Header /> }
//         footer={ <Footer /> }
//         left={ <PhonesContainer selectPhone={ changeSelected }/> }
//         right={ <DescriptionContainer/> }
//         >
//       </Layout>
//     </div>
//   );
// }

export default App;
