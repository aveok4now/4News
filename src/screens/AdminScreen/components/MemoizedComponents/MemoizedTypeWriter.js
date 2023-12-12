import React, {memo} from 'react';
import TypeWriter from 'react-native-typewriter';

export const MemoizedTypeWriter = memo(({setCanBeShowed}) => (
  <TypeWriter
    style={{
      fontFamily: 'Inter-ExtraBold',
      fontSize: 32,
      textAlign: 'center',
      textShadowColor: 'rgba(226, 232, 240, 0.25)',
      textShadowOffset: {width: 0, height: 3},
      textShadowRadius: 4,
    }}
    minDelay={0.2}
    typing={1}
    onTypingStart={() => setCanBeShowed(false)}
    onTypingEnd={() => setCanBeShowed(true)}>
    Добро пожаловать!
  </TypeWriter>
));
