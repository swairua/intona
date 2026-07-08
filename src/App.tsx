import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Equipment from './pages/Equipment'
import Safety from './pages/Safety'
import Quality from './pages/Quality'
import Sustainability from './pages/Sustainability'
import Careers from './pages/Careers'
import Gallery from './pages/Gallery'
import News from './pages/News'
import Clients from './pages/Clients'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import RequestQuotation from './pages/RequestQuotation'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-quotation" element={<RequestQuotation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
