
import './App.css';
import { Container } from 'react-bootstrap';
import { Customer} from './compnents/Customer'
import {Product} from './compnents/Product';
import Store from './compnents/Store';
import Sale from './compnents/Sale';
import {HeaderComponent} from './HeaderComponent';
import {FooterComponent} from './FooterComponent';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App(){
    return (

      <BrowserRouter>
      <div className="App">
        
            <HeaderComponent />
              <Container>
                <Switch>
                  <Route path="/" component={Customer} exact/>
                  <Route path="/product" component={Product} />
                  <Route path="/store" component={Store} />
                  <Route path="/sale" component={Sale} />
                </Switch>
              </Container>

              <FooterComponent />

        </div>
        </BrowserRouter>
      
    );
  }
export default App;

  
