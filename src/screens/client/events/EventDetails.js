import { Row, Col, Label, DatePicker, View, Separator } from 'native-base';
import { Button } from 'react-native-paper';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { containerStyles } from "../../../helpers/styling";
import { BASE_URL as apiUrl } from "../../../api/headers";
import { invoice } from "../../../api";
import moment from 'moment';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { formStyle } from '../../../helpers/styling';

class EventDetails extends Component {

  constructor(props, ctx) {
    super(props);
    this._styles = StyleSheet.create({
      viewStyle: {
        justifyContent: 'flex-start',
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: -20,
        zIndex: 1,
        backgroundColor: '#E5E5E5'
      },
      headingStyle: {
        fontFamily: 'Montserat',
        top: 33,
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        color: '#0D1F3C',
        textAlign: 'center',
        position: 'absolute',
        left: -200,
        right: -200
      },
      levelStyle: {
        left: -200, right: -200,
        position: 'absolute',
        textAlign: 'center',
        fontFamily: 'Montserat',
        fontSize: 19,
        lineHeight: 24,
        fontWeight: '500',
        color: '#0D1F3C'
      }
    });
  };

  state = {
    lesson: null,
    event: null
  };

  componentDidMount() {
    const {
      route: {
        params: { lesson = null, event = null }
      }
    } = this.props;
    this.setState({ lesson, event });
  };

  getSkills = (ids = []) => {
    const { lists: { skills = [] } } = this.props;
    const dict = skills.reduce((d, s) => ({ ...d, [s.id]: s }), {});
    return ids.map(id => dict[id])
  };
  getResorts = (ids = []) => {
    const { lists: { resorts = [] } } = this.props;
    const dict = resorts.reduce((d, s) => ({ ...d, [s.id]: s }), {});
    return ids.map(id => dict[id])
  };

  render() {
    const {
      lists: { theme: [theme] },
      navigation
    } = this.props;
    const { lesson } = this.state;
    if (!theme) { return null; }
    
    return (
      <View style={[
        containerStyles.container,
        this._styles.viewStyle
      ]}>
        <View pointerEvents="none"
          style={{ position: 'absolute', opacity: 1, zIndex: 0 }}>
          <SvgUri uri={apiUrl + theme.BIG_FRAME.url} height='577' style={{ zIndex: 0 }} />
        </View>
        <View style={{ position: 'absolute', zIndex: 1 }}>
          
        </View>
        <Button
          mode='contained'
          onPress={() => navigation.navigate({ name: 'Events' })}
          style={{
            borderRadius: 40, background: '#347AF0',
            marginLeft: '2%', bottom: 34, position: 'absolute',
            width: '90%', height: 46,
            paddingVertical: 5
          }}>
          К списку событий
        </Button>
      </View>
    );
  };

};

export default connect((ownProps, state) => {
  return {
    ...ownProps,
    ...state
  }
}, null)(EventDetails);