// import logo from './logo.svg';
import React, { Component } from 'react'
import './App.scss';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Layout from './components/layout/layout'
import PhonesContainer from './containers/phonesContainer/phonesContainer'
import DescriptionContainer from './containers/descriptonContainer/descriptionContainer'
import { PhoneService } from './services/phone'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      phoneList: []
    }

    this.getPhonesList = this.getPhonesList.bind(this)
  }
  changeSelected() {
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

  render() {
    return (
      <div className="App">
        { this.state.phoneList.length && this.state.phoneList.map(el => <div key={`${el._id}"`}>{ el.name }</div>) }
        <Layout 
          header={ <Header /> }
          footer={ <Footer /> }
          left={ <PhonesContainer selectPhone={ this.changeSelected }/> }
          right={ <DescriptionContainer/> }
          >
        </Layout>
      </div>
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
