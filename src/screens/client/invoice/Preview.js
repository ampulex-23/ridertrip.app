import { Row, Col, Label, DatePicker, View, Separator } from 'native-base';
import { Button } from 'react-native-paper';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { containerStyles } from "../../../helpers/styling";
import { BASE_URL as apiUrl } from "../../../api/headers";
import { StyleSheet, Text, Dimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { formStyle } from '../../../helpers/styling';

class InvoicePreview extends Component {

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
    invoice: null
  };

  componentDidMount() {
    const {
      route: {
        params: { invoice }
      }
    } = this.props;
    this.setState({ invoice });
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

  postInvoice = () => {

  };

  render() {
    const {
      lists: { theme: [theme] },
      navigation
    } = this.props;
    const invoice = this.state.invoice;
    if (!theme || !invoice) { return null; }
    const ycorr = invoice.skills.length == 0 ? 34 : 0;
    return (
      <View style={[
        containerStyles.container,
        this._styles.viewStyle
      ]}>
        <View pointerEvents="none"
          style={{ position: 'absolute', opacity: 1, zIndex: 0 }}>
          <SvgUri uri={apiUrl + theme.SMALL_FRAME.url} height='421' style={{zIndex: 0}} />
        </View>
        <View style={{ position: 'absolute', zIndex: 1 }}>
          <Text
            style={this._styles.headingStyle}>
            {invoice.stuff === 'skis'
              ? "Урок по горным лыжам"
              : "Урок по сноуборду"
            }
          </Text>
          <Text style={[this._styles.levelStyle, { top: 116 }]}>
            {invoice.minlevel === 'novice'
              ? "Начальный уровень"
              : "Продвинутый уровень"}
          </Text>
          <Text style={[this._styles.levelStyle, { top: 150 }]}>
            {this.getSkills(invoice.skills).map(i => i.name).join(', ')}
          </Text>
          <Text style={[
            this._styles.headingStyle, 
            { top: 189 - ycorr, color: '#347AF0', fontWeight: '400' }
          ]}>
            {this.getResorts(invoice.invoicing).map(i => i.name).join(', ')}
          </Text>
          <Row style={[{
            top: 245,
            paddingLeft: 32 + (Dimensions.get('screen').width - 335) / 2,
            width: Dimensions.get('screen').width, flex: 1, 
            flexDirection: 'row', justifyContent: 'space-around',
            alignItems: 'center'
          }]}>
            <Col>
              <Label style={formStyle.label}>Дата</Label>
              <View style={{ left: -10 }}>
                <DatePicker androidMode='calendar' 
                  defaultDate={invoice.date} textStyle={{fontSize: 19, fontWeight: '500'}} />
              </View>
            </Col>
            <Col style={{paddingLeft: 32}}>
              <Label style={formStyle.label}>Время</Label>
              <View style={{ left: -10 }}>
                <DatePicker androidMode='calendar' textStyle={{fontSize: 19, fontWeight: '500'}}
                  defaultDate={invoice.time} formatChosenDate={() => '09:00'} />
              </View>
            </Col>
          </Row>
          <Separator
            style={{left: 2 + (Dimensions.get('screen').width - 295) / 2,
              backgroundColor: '#CFD2D8', position: 'absolute', opacity: 0.5,
              height: 1, width: 295, top: 315 }} />
          <Row style={[{
            top: 333, position: 'absolute',
            paddingLeft: 32 + (Dimensions.get('screen').width - 335) / 2,
            width: Dimensions.get('screen').width, flex: 1, 
            flexDirection: 'row', justifyContent: 'space-around',
            alignItems: 'center'
          }]}>
            <Col>
              <Label style={formStyle.label}>Человек</Label>
              <View style={{ left: 0 }}>
                <Text style={{fontSize: 19, fontWeight: '500'}}>{invoice.persons}</Text>
              </View>
            </Col>
            <Col>
              <Label style={formStyle.label}>Часов</Label>
              <View style={{ left: 0 }}>
                <Text style={{fontSize: 19, fontWeight: '500'}}>{invoice.duration}</Text>
              </View>
            </Col>
          </Row>
        </View>
        <Button 
          mode='contained' 
          onPress={() => this.postInvoice()}
          style={{ 
            borderRadius: 40, background: '#347AF0', 
            marginLeft: '2%', bottom: 34, position: 'absolute',
            width: '90%', height: 46, 
            paddingVertical: 5 }}>
          Создать заявку
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
}, null)(InvoicePreview);