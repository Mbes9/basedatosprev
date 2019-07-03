import React from "react";
import Table from "./components/Table";
import GridItem from "./components/GridItem";
import Card from "./components/Card/Card";
import CardHeader from "./components/Card/CardHeader";
import CardBody from "./components/Card/CardBody";
import { Button } from "@material-ui/core";
import { Update } from "@material-ui/icons";
import { getMessages } from "./services/messages";

class App extends React.Component {
  state = {
    isReady: false,
    messages: []
  };

  componentDidMount() {
    this.reloadMessages();
  }

  reloadMessages = () =>
    getMessages()
      .then(({ data }) => {
        this.setState({ messages: data });
      })
      .catch(err => console.log("error", err));

  render() {
    const { messages } = this.state;
    return (
      <div>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h2 style={{ marginRight: 25 }}>Mensajería</h2>
              <Button
                variant="text"
                style={{ color: "white" }}
                onClick={this.reloadMessages}
              >
                <Update style={{ marginRight: 5 }} />
                Recargar
              </Button>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={[
                  "ID",
                  "Token",
                  "Título",
                  "Contenido",
                  "Link Mobile",
                  "Link Web"
                ]}
                tableData={messages}
              />
            </CardBody>
          </Card>
        </GridItem>
      </div>
    );
  }
}

export default App;
