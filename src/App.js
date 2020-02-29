import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertsComponent from "./components/AlertsComponent";
import Button from "react-bootstrap/Button";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertsData: []
    };
    this.addAlert.bind(this);
    this.removeAlert.bind(this);
  }

  addAlert(text, type, disappearIn=5000) {
    const newAlerts = [...this.state.alertsData];
    newAlerts.push({text, type});
    if (type === 'success' || type === 'info') {
      this.setState({alertsData: newAlerts}, () => {
        window.setTimeout(() => {
          this.removeAlert(text);
        }, disappearIn);
      });
    } else {
      this.setState({alertsData: newAlerts});
    }
  }

  removeAlert(text) {
    const newAlerts = [...this.state.alertsData].filter(obj => obj.text !== text);
    this.setState({alertsData: newAlerts});
  }

  render() {
    return (
        <div className="App">
          {
            this.state.alertsData.map((alert, index) => {
              return (
                  <AlertsComponent key={index} data={alert} addAlert={(text, type) => this.addAlert(text, type)}
                                   removeAlert={(text) => this.removeAlert(text)} />
              )
            })
          }
          <Button className={'m-1 p-1'} variant={'danger'} onClick={e => this.addAlert('This is a danger alert', 'danger')}>Add danger alert</Button>
          <Button className={'m-1 p-1'} variant={'warning'} onClick={e => this.addAlert('This is a warning alert', 'warning')}>Add warning alert</Button>
          <Button className={'m-1 p-1'} variant={'success'} onClick={e => this.addAlert('This is a success alert disappear in 2000 ms', 'success', 2000)}>Add success alert</Button>
          <Button className={'m-1 p-1'} variant={'info'} onClick={e => this.addAlert('This is an info alert disappear in 3000 ms', 'info', 3000)}>Add info alert</Button>
        </div>
    );
  }
}

export default App;
