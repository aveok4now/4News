import { ScrollView } from 'react-native'
import React, { memo } from 'react'

export const MemoizedScrollView = memo(({ children }) => (
    <ScrollView
        style={{ paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
    >
        {children}
    </ScrollView>
));