import { Row, Col, Label, DatePicker, View, Separator } from 'native-base';
import { Button } from 'react-native-paper';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BASE_URL as apiUrl } from "../../../api/headers";
import { StyleSheet, Text, Dimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';

class InvoiceAnswers extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View>
        
      </View>
    )
  }

};

export default connect((props, state) => ({
  ...props, ...state
}))(InvoiceAnswers);