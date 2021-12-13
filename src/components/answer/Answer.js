import { Row, Col, Label, DatePicker, View, Separator } from 'native-base';
import { Avatar, Button } from 'react-native-paper';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BASE_URL as apiUrl } from "../../../api/headers";
import { StyleSheet, Text, Dimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';

class InvoiceAnswer extends Component {
  
  constructor(props) {
    super(props);
  }

  populateAnswer = async answer => {
    return answer;
  };

  render() {
    const { 
      answer: _answer, 
      auth: { invoice, user } 
    } = this.props;
    const answer = this.populateAnswer(_answer);
    const { instructor, price } = answer;
    return (
      <View>
        <Avatar></Avatar>
        <View>
          <Text></Text>
        </View>
      </View>
    )
  }

};

export default connect((props, state) => ({
  ...props, ...state
}))(InvoiceAnswer);