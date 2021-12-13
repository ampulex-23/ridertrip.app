import { Container, Text, Row, View, Col, Label } from 'native-base';
import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { formStyle } from '../../../helpers/styling';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';

class InvoiceForm extends Component {

  constructor(props, ctx) {
    super(props);
  };

  state = {
    pickingDate: false,
    pickingTime: false,
    invoice: {
      invoicing: [1],
      stuff: 'skis',
      minlevel: 'novice',
      persons: 1,
      duration: 3,
      services: [2],
      children: false,
      skills: [],
      date: new Date(),
      time: new Date()
    }
  };

  toggleService = serviceId => {
    const invoice = {
      ...this.state.invoice,
      services: this.state.invoice.services.includes(serviceId)
        ? ([...this.state.invoice.services.filter((id) => id !== serviceId)])
        : [...this.state.invoice.services, serviceId]
    };
    !invoice.services.length && invoice.services.push(1);
    this.setState({ ...this.state, invoice });
  };

  toggleSkill = skillId => {
    const invoice = {
      ...this.state.invoice,
      skills: this.state.invoice.skills.includes(skillId)
        ? ([...this.state.invoice.skills.filter((id) => id !== skillId)])
        : [...this.state.invoice.skills, skillId]
    };
    !invoice.skills.length && invoice.skills.push(2);
    this.setState({ ...this.state, invoice });
  };

  toggleChildren = s => {
    this.setState({ ...this.state, invoice: { ...this.state.invoice, children: s } });
  };

  setStuff = stuff => {
    this.setState({ ...this.state, invoice: { ...this.state.invoice, stuff } });
  };

  setMinlevel = minlevel => {
    this.setState({ ...this.state, invoice: { ...this.state.invoice, minlevel } });
  };

  setDateTime = (what = 'date') =>
    (event, date) => {
      date && this.setState({
        ...this.state,
        pickingDate: false,
        pickingTime: false,
        invoice: {
          ...this.state.invoice,
          [what]: date
        }
      });
    };
  
  sanitize = () => {
    return {
      ...this.state.invoice,
      date: +this.state.invoice.date,
      time: +this.state.invoice.time
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ 
        paddingTop: 20, paddingLeft: 20, flex: 1, 
        minHeight: Dimensions.get('screen').height - 180,
        borderRadius: 20, marginTop: -20, zIndex: 1, 
        overflow: 'hidden' }}>
        <Container>
          <Text style={formStyle.section}>Я ищу</Text>
          <Row>
            <Button
              style={[formStyle.toggle, { borderColor: this.state.invoice.services.includes(1) ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.toggleService(1)}>
              <Text style={formStyle.toggle}>Инструктора</Text>
            </Button>
            <Button
              style={[formStyle.toggle, { borderColor: this.state.invoice.services.includes(2) ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.toggleService(2)}>
              <Text style={formStyle.toggle}>Фрирайд гида</Text>
            </Button>
          </Row>
          <Row>
            <Button style={[formStyle.toggle, { borderColor: !this.state.invoice.children ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.toggleChildren(false)}>
              <Text style={formStyle.toggle}>Для взрослого</Text>
            </Button>
            <Button style={[formStyle.toggle, { borderColor: this.state.invoice.children ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.toggleChildren(true)}>
              <Text style={formStyle.toggle}>Для ребёнка</Text>
            </Button>
          </Row>
          <Text style={formStyle.section}>Вид активности</Text>
          <Row>
            <Button style={[formStyle.toggle, { borderColor: this.state.invoice.stuff === 'snowboard' ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.setStuff('snowboard')}>
              <Text style={formStyle.toggle}>Сноуборд</Text>
            </Button>
            <Button style={[formStyle.toggle, { borderColor: this.state.invoice.stuff !== 'snowboard' ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.setStuff('skis')}>
              <Text style={formStyle.toggle}>Горные лыжи</Text>
            </Button>
          </Row>
        </Container>
        <Container>
          <Text style={formStyle.section}>Уровень катания</Text>
          <Row>
            <Button style={[formStyle.toggle, { borderColor: this.state.invoice.minlevel === 'novice' ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.setMinlevel('novice')}>
              <Text style={formStyle.toggle}>Новичок</Text>
            </Button>
            <Button style={[formStyle.toggle, { borderColor: this.state.invoice.minlevel === 'advanced' ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.setMinlevel('advanced')}>
              <Text style={formStyle.toggle}>Продвинутый</Text>
            </Button>
          </Row>
          <Row style={{ marginTop: 0, display: this.state.invoice.minlevel === 'novice' ? 'none' : 'flex' }}>
            <Button style={[formStyle.toggle, { borderColor: this.state.invoice.skills.includes(2) ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.toggleSkill(2)}>
              <Text style={formStyle.toggle}>Карвинг</Text>
            </Button>
            <Button style={[formStyle.toggle, { borderColor: this.state.invoice.skills.includes(1) ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.toggleSkill(1)}>
              <Text style={formStyle.toggle}>Фрирайд</Text>
            </Button>
            <Button style={[formStyle.toggle, { borderColor: this.state.invoice.skills.includes(3) ? '#347AF0' : '#EDF1F9' }]}
              onPress={() => this.toggleSkill(3)}>
              <Text style={formStyle.toggle}>Фристайл</Text>
            </Button>
          </Row>
          <Row>
            <Col>
              <Label style={formStyle.label}>Дата</Label>
              <View style={{ left: 0 }}>
                <TouchableOpacity
                  onPress={() => this.setState({ ...this.state, 
                  pickingDate: true, pickingTime: false })}>
                  <Text style={{fontSize: 19, fontWeight: '500'}}>
                    {moment(this.state.invoice.date).format("DD MMM YYYY")}
                  </Text>
                </TouchableOpacity>
                {this.state.pickingDate && <DateTimePicker
                  value={this.state.invoice.date}
                  mode='date'
                  dateFormat="day month.abbreviated year.full"
                  display="default"
                  onChange={this.setDateTime('date')}
                />}
              </View>
            </Col>
            <Col>
              <Label style={formStyle.label}>Время</Label>
              <View style={{ left: 0 }}>
                <TouchableOpacity
                  onPress={() => this.setState({ ...this.state, 
                  pickingTime: true, pickingDate: false })}>
                  <Text style={{fontSize: 19, fontWeight: '500'}}>
                    {moment(this.state.invoice.time).format('HH:mm')}
                  </Text>
                </TouchableOpacity>
                {this.state.pickingTime && <DateTimePicker
                  value={this.state.invoice.date}
                  mode='time'
                  dateFormat="hour:minute"
                  display="default"
                  onChange={this.setDateTime('time')}
                />}
              </View>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label style={formStyle.label}>Человек</Label>
              <View style={{ left: 0 }}>
              <TextInput 
                  style={{fontSize: 19, fontWeight: '500'}}
                  onChangeText={p => 
                    this.setState({...this.state, 
                      invoice: { ...this.state.invoice, persons: +p }})}
                  keyboardType='numeric'
                  initialValue={'' + this.state.invoice.persons}
                  value={'' + this.state.invoice.persons}
                />
              </View>
            </Col>
            <Col>
              <Label style={formStyle.label}>Часов</Label>
              <View style={{ left: 0 }}>
                <TextInput disableFullscreenUI
                  style={{fontSize: 19, fontWeight: '500'}}
                  onChangeText={d => 
                    this.setState({...this.state, 
                      invoice: { ...this.state.invoice, duration: +d }})}
                  keyboardType='numeric'
                  initialValue={'' + this.state.invoice.duration}
                  value={'' + this.state.invoice.duration}
                />
              </View>
            </Col>
          </Row>
        </Container>
        <Button
          mode='contained'
          onPress={() =>
            navigation.navigate({
              name: 'InvoicePreview',
              params: {
                invoice: this.sanitize()
              }
            })}
          style={{
            borderRadius: 40, background: '#347AF0',
            marginLeft: '2%', marginBottom: 40,
            width: '90%', height: 46,
            paddingVertical: 5
          }}>
          Создать заявку
        </Button>
      </Container>
    );
  };

};

export default connect((ownProps, state) => {
  return {
    ...ownProps,
    ...state
  }
})(InvoiceForm);