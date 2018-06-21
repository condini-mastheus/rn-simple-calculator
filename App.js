import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      display: '',
      result: ''
    }

    this.handleOperations = this.handleOperations.bind(this)
  }

  renderButtonsWithValue(row, index) {
    return ( 
      <View key={index} style={styles.buttonsRow}>
        {row.map(value => <TouchableOpacity key={value} style={styles.buttonWrapper} onPress={() => this.handleOperations(value)}><Text style={styles.button}>{value}</Text></TouchableOpacity>) }
      </View>
    )
  }

  renderButtonsWithOp(value) {
    return <TouchableOpacity key={value} style={styles.buttonWrapper} onPress={() => this.handleOperations(value)}><Text style={styles.button}>{value}</Text></TouchableOpacity>
  }

  handleOperations(op) {
    
    switch (op) {
      case 'C':
        this.setState({
          display: '',
          result: ''
        })
        break;
      case '=':
        this.setState({
          display: this.state.result,
          result: ''
        })
        break;
      default:
        const display = this.state.display + op
        let result = this.state.result

        try {
          let fixOperation = display.split('x').join('*')
          fixOperation = fixOperation.split('÷').join('/')

          result = (eval(fixOperation))
          
        } catch(error) {
          //throw error
        }

        this.setState({
          display,
          result
        })
        break;
    }

  }

  render() {
    const buttons = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['.', '0', '=']]
    const actions = ['C', '÷', 'x', '-', '+']

    return (
      <View style={styles.container}>
        <View style={styles.display}>
          <View style={styles.displayOperations}>
            <Text style={styles.operation}>{this.state.display}</Text>
          </View>
          <View style={styles.displayResult}>
            <Text style={styles.result}>{this.state.result}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonsWithValue}>
          {
            buttons.map((row, index) => this.renderButtonsWithValue(row, index))
          }
          </View>
          <View style={styles.buttonsWithOp}>
          {
            actions.map(value => this.renderButtonsWithOp(value))
          }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  displayOperations: {
    flex: 1.5,
    backgroundColor: '#c1c1c1',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingRight: 15
  },
  displayResult: {
    flex: 1,
    backgroundColor: '#c1c1c1',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingRight: 15
  },
  operation: {
    textAlign: 'right',
    fontSize: 42,
  },
  result: {
    textAlign: 'right',
    fontSize: 30,
  },
  buttons: {
    flex: 4.5,
    backgroundColor: '#000',
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonsWithValue: {
    flex: 4,
    backgroundColor: '#e6e6e6',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  buttonsRow: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  button: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonsWithOp: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});
