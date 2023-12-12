import {ScrollView} from 'react-native';
import React from 'react';
import DetailItem from './DetailItem';
import {theme} from '../../../screens/MovieNewsScreen/theme';
export default function DetailsSection({title, items}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        flexDirection: 'row',
      }}
      style={{
        marginTop: 24,
        marginHorizontal: 12,
        backgroundColor: theme.bgWhite(0.1),
        borderRadius: 16,
      }}>
      {items.map((item, index) => (
        <DetailItem
          key={item.label}
          {...item}
          isLastItem={index === items.length - 1}
        />
      ))}
    </ScrollView>
  );
}
