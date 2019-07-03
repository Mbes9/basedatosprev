import React from "react";
import Table from "./components/Table";
import GridItem from "./components/GridItem";
import {
  MessageRounded,
  DataUsageRounded,
  UpdateRounded
} from "@material-ui/icons";
import { getMessages } from "./services/messages";
import CustomTabs from "./components/CustomTabs";
import { Button } from "@material-ui/core";

class App extends React.Component {
  state = {
    isReady: false,
    messages: [],
    cacheData: []
  };

  componentDidMount() {
    this.reloadData();
  }

  reloadData = () => {
    this.reloadMessages();
  };

  reloadMessages = () =>
    getMessages()
      .then(({ data }) => {
        this.setState({ messages: data });
      })
      .catch(err => console.log("error", err));

  render() {
    const { messages, cacheData } = this.state;
    return (
      <div>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title={
              <React.Fragment>
                <h2 style={{ marginRight: 25 }}>Base de datos</h2>
                <Button
                  variant="text"
                  style={{ color: "white" }}
                  onClick={this.reloadData}
                >
                  <UpdateRounded style={{ marginRight: 5 }} />
                  Recargar
                </Button>
              </React.Fragment>
            }
            headerColor="warning"
            tabs={[
              {
                tabName: "Mensajería",
                tabIcon: MessageRounded,
                tabContent: (
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
                )
              },
              {
                tabName: "Cache",
                tabIcon: DataUsageRounded,
                tabContent: (
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["Clave", "Valor"]}
                    tableData={cacheData}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </div>
    );
  }
}

export default App;
