import {View, FlatList} from 'react-native';
import React from 'react';
import MenuItems from './MenuItems';

export default function DrawerMenu({
  menu,
  getIconInfo,
  selectedMenuItem,
  setSelectedMenuItem,
  handleMenuItemPress,
}) {
  return (
    <View style={{flexDirection: 'column', marginTop: 30}}>
      <FlatList
        data={menu}
        renderItem={({item, index}) => {
          const {icon, color} = getIconInfo(item.title, item);
          const isSelected = selectedMenuItem === index;
          return (
            <MenuItems
              item={item}
              index={index}
              icon={icon}
              color={color}
              selectedMenuItem={selectedMenuItem}
              onItemPress={() => {
                setSelectedMenuItem(index);
                handleMenuItemPress(index, item.title);
              }}
              isSelected={isSelected}
            />
          );
        }}
      />
    </View>
  );
}
