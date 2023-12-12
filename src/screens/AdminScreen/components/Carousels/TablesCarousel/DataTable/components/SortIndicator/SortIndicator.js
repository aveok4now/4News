import {Text} from 'react-native';
import React from 'react';

export default function SortIndicator({isAscending}) {
  return (
    <Text style={{color: 'rgb(103 232 249)'}}>
      {isAscending ? ' ⬆️ ' : ' ⬇️ '}
    </Text>
  );
}
