import React from 'react';
import MovieAPI from './components/MovieAPI';
import { Redirect} from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Auth from './components/auth';
import { Box } from '@mui/material';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();
const App = () => {
 
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ paddingBottom: "1rem", minHeight: "100vh" }}>
      <Header />
        <Switch>
        <Route path="/" exact><Auth /></Route>
        <Route path='/movieapi'><MovieAPI /></Route>
        <Route path='*'><Redirect to='/' /></Route>
      </Switch>
    </Box> 
    </ThemeProvider>
  );
};

export default App;

