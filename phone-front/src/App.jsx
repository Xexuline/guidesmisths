// import logo from './logo.svg';
import React, { Component } from 'react'
import './App.scss';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Layout from './components/layout/layout'
import PhonesContainer from './containers/phonesContainer/phonesContainer'
import DescriptionContainer from './containers/descriptonContainer/descriptionContainer'
import Modal from './components/modal/modal'
import Spinner from './components/loader/loader'
import { PhoneService } from './services/phone'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      phoneList: []
    }

    this.getPhonesList = this.getPhonesList.bind(this)
  }

  getPhonesList() {
    this.setState({ loading: true })
    PhoneService.getList()
      .then(({data: phoneList}) => {
        this.setState({ 
          loading: false,
          phoneList
        })
      })
  }

  componentDidMount() {
    this.getPhonesList()
  }

  lockBody(loading){
    const body = document.querySelector('body')
    // debugger
    body.classList[loading ? 'add' : 'remove']('modal-open')
  }

  componentDidUpdate(prevProp, prevState) {
    // debugger
    if(prevState.loading !== this.state.loading) {
      this.lockBody(this.state.loading)
    }
  }

  render() {
    // const classNames = ['App', this.state.loading ? 'modal-open' : null].join(' ')
    return (
      <BrowserRouter>
        <div className='App'>
          <div className="App__wrapper">
            <Header />
            <Switch>
              <Route path="/" exact={ true } component={ () => <PhonesContainer phones={ this.state.phoneList } /> }></Route>
              <Route path="/new" exact={ true } component={ () => <div>create new</div>}></Route>
              <Route path="/update/:id" exact={ true } component={ () => <div>create new</div>}></Route>
              <Route path="/:id" component={ () => <div>con id</div> }></Route>
            </Switch>
            { this.state.loading ? <Modal><Spinner /></Modal> : null }
          </div>
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
