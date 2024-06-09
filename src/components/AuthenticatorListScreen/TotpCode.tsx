import React, {FunctionComponent} from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';

type TotpCodeProps = {
  code: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const TotpCode: FunctionComponent<TotpCodeProps> = ({
  code,
  containerStyle,
  textStyle,
}) => {
  const codeParts =
    code.length % 2 === 0
      ? [code.slice(0, code.length / 2), code.slice(code.length / 2)]
      : [code];

  return (
    <View style={containerStyle}>
      {codeParts.map((part, index) => (
        <Text key={`${part}-${index.toString()}`} style={textStyle}>
          {part}
        </Text>
      ))}
    </View>
  );
};

export default TotpCode;
