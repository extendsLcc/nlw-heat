import { useEffect, useState } from 'react';
import { api } from '../../servies/api';

import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    api.get<Message[]>('/messages/last3').then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  }, []);

  return (
    <section className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />
      <ul className={styles.messageList}>
        {messages.map((message) => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatarUrl} alt={message.user.name} />
              </div>
              <span>Lucas LCC</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
