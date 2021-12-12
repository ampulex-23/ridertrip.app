import React from "react";
import { View, Row, Text } from 'native-base';
import { SvgUri, ClipPath, Rect, Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { BASE_URL as apiUrl } from "../../api/headers";

const SIZES = { small: 13, normal: 24, big: 36 };

function RatingMeter({
  value: _v = 4.5,
  rating = null,
  readonly = true,
  size = 'normal',
  showNumeric = false,
  lists: { theme: [theme] },
  onChange
}) {
  const value = rating || _v;
  const a = SIZES[size] || 20;
  const star_y = apiUrl + theme.STAR_ACTIVE_ICON.url;
  const star_g = apiUrl + theme.STAR_ICON.url;
  const wholes = Math.floor(value);
  const tail = value - wholes;
  const containerStyle = {
    width: a * 5,
    height: a,
    flex: 1,
    flexDirection: 'row',
    justifyContent: size === 'small' ? 'flex-start' : 'space-between',
    alignItems: 'center'
  };
  const starStyle = {
    width: a,
    height: a,
    padding: size === 'small' ? 0 : 2,
    marginRight: size === 'small' ? 0 : 5
  };
  const svgStyle = {
    position: 'absolute',
    overflow: 'hidden'
  };
  const setValue = value =>
    ({ locationX }) => {
      !readonly && onChange && onChange(value + locationX / a);
    };
  const stars = [];
  for (let i = 1; i <= wholes; i++) {
    stars.push(
      <TouchableOpacity style={starStyle} onPress={setValue(i - 1)} key={'star' + i}>
        <SvgUri uri={star_y} width={a - 4} height={a - 4} style={svgStyle} />
      </TouchableOpacity>
    );
  }
  if (tail > 0) {
    const partw = (a - 4) * tail;
    stars.push(
      <TouchableOpacity style={starStyle} onPress={setValue(wholes)} key={'star' + (wholes + 1)}>
        <SvgUri uri={star_g} width={a - 4} height={a - 4} style={svgStyle} />
        <View style={{width: partw, height: a, overflow: 'hidden', position: 'absolute'}} >
          <SvgUri uri={star_y} width={a - 4} height={a - 4}
            style={svgStyle} 
          />
        </View>
      </TouchableOpacity>
    );
  }
  const greys = 5 - wholes - 1;
  for (let i = 1; i <= greys; i++) {
    stars.push(
      <TouchableOpacity style={starStyle} onPress={setValue(wholes + i)} key={'star' + (wholes + 1 + i)}>
        <SvgUri uri={star_g} width={a - 4} height={a - 4} style={svgStyle} />
      </TouchableOpacity>
    );
  }
  return (
    <View>
      <Row style={containerStyle}>
        {showNumeric && 
          <Text style={{
            fontSize: 15,
            lineHeight: 24,
            fontWeight: '600',
            color: '#5E627B',
            marginRight: 10
          }}>{ (+value).toFixed(2) }</Text>
        }
        {stars.map(star => star)}
      </Row>
    </View>
  );
};

export default connect((ownProps, state) => ({
  ...ownProps, ...state
}))(RatingMeter);