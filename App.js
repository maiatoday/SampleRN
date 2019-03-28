/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import Reactotron from "reactotron-react-native";
import ToastExample from "./ToastExample";
import { DeviceEventEmitter } from "react-native";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { text: "Boo! 👻" };
  }

  onToasterPop = event => {
    Reactotron.debug("Event: ping toaster popped: " + event.message);
    this.setState({text: event.message})
  };

  componentDidMount() {
    Reactotron.debug("Component mount");
    DeviceEventEmitter.addListener("onToasterPop", this.onToasterPop);
  }

  componentWillUnmount() {
    Reactotron.debug("Component Unmount");
    DeviceEventEmitter.removeListener("onToasterPop")
  }

  render() {
    Reactotron.log("hello rendering world");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the 🔥 Sample App!</Text>
        <Button
          onPress={() => {
            if (Platform.OS === "android") {
              //    Civic.connect()
              Reactotron.debug("*Press me pressed*");
              ToastExample.show("Awesome", ToastExample.SHORT, msg => {
                Reactotron.debug(msg);
              });
            } else {
              Reactotron.warn("*not implemented*");
            }
          }}
          title="Press Me"
        />
        <Text style={{ padding: 10, fontSize: 42 }}>{this.state.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
