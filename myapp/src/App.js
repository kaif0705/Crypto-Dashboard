import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import Exchanges from './Components/Exchanges'
import Coins from './Components/Coins'
import CoinDetails from './Components/CoinDetails'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="App">
      <Router>

        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/exchanges' element={<Exchanges />} />
          <Route path='/coins' element={<Coins />} />
          <Route path='/coins/:id' element={<CoinDetails />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
