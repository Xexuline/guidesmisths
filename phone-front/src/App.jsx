// import logo from './logo.svg';
import React, { Component } from 'react'
import './App.scss';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Layout from './components/layout/layout'
import PhonesContainer from './containers/phonesContainer/phonesContainer'
import DescriptionContainer from './containers/descriptonContainer/descriptionContainer'

class App extends Component {
  changeSelected() {
  }

  render() {
    return (
      <div className="App">
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
