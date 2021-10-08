import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import Header from "./components/Header";
import Login from "./components/Login";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
  onError: (e) => { console.log(e) },
})

 const Chat = (props) => {
    return (
      <ChatRoom
        userId={props.match.params.userId}
        roomId={props.match.params.roomId}
      />
    );
  };

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
            <Route exact path="/">
                <Header />
                <Login />
            </Route>
            <Route path="/chat/:roomId/:userId" component={Chat} />
        </Switch>
      </Router>
		</ApolloProvider>
  );
}

export default App;
