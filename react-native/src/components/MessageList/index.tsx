import React from 'react';
import { ScrollView } from 'react-native';

import { styles } from './styles';
import { Message } from '../Message';

export function MessageList() {
  const message = {
    id: '1',
    text: 'corpo da msg',
    user: {
      name: 'lcc',
      avatarUrl: 'https://github.com/extendslcc.png',
    },
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      <Message data={message} />
      <Message data={message} />
      <Message data={message} />
    </ScrollView>
  );
}
