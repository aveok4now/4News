import {ScrollView, RefreshControl} from 'react-native';
import React, {memo} from 'react';

export const MemoizedScrollView = memo(
  ({children, onRefresh, isRefreshing}) => (
    <ScrollView
      style={{paddingVertical: 8}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={['#ddb4f6']}
          refreshing={isRefreshing}
          progressBackgroundColor={'#7a8fd3'}
          onRefresh={onRefresh}
        />
      }>
      {children}
    </ScrollView>
  ),
);
