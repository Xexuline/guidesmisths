// import logo from './logo.svg';
import './App.scss';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Layout from './components/layout/layout'

function App() {
  return (
    <div className="App">
      <Layout 
        header={ <Header></Header> }
        footer={ <Footer></Footer> }
        left={ <div>left</div> }
        right={ <div>rigth</div> }
        >
        <p>hola</p>
      </Layout>
    </div>
  );
}

export default App;
