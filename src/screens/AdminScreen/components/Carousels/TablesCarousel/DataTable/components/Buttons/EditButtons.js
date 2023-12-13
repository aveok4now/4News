import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { theme } from '../../../../../../../MovieNewsScreen/theme';
import { Icons } from '../../../../../../../../constants/Icons';

export default function EditButtons({
  handleEditCancel,
  handleSave,
  inputHasChanges,
}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={handleEditCancel}
        style={[styles.button, { backgroundColor: theme.bgWhite(0.2) }]}>
        <Icons.AntDesign name="close" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!inputHasChanges}
        onPress={handleSave}
        style={[
          styles.button,
          {
            backgroundColor: inputHasChanges
              ? theme.bgWhite(0.2)
              : theme.bgWhite(0.05),
          },
        ]}>
        <Icons.Feather name="check" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
    padding: 10,
    margin: 2,
  },
});
