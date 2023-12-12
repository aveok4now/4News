import {Text} from 'react-native';
import React, {memo} from 'react';
import {formatDate} from '../../utils/formateDate';

export const MemoizedClocks = memo(({currentTime}) => (
  <Text style={{textAlign: 'center', fontFamily: 'Inter-Light'}}>
    {formatDate(currentTime)}
  </Text>
));
