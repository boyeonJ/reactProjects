import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import Tours from './components/Tours';

function App() {
return (
    <React.Fragment>
        <Navbar />
        <Home />
        <About />
        <Services />
        <Tours />
        <Footer />
    </React.Fragment>
);
}

export default App;