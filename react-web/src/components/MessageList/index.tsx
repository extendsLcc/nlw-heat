import { useEffect, useState } from 'react';
import { api } from '../../servies/api';

import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';
import { io } from 'socket.io-client';

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};

const messagesQueue: Message[] = [];

const socket = io('http://localhost:3000');

socket.on('new_message', (newMessage: Message) => {
  console.log(newMessage);
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], messages[0], messages[1]].filter(Boolean),
        );
        messages.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<Message[]>('/messages/last3').then((response) => {
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
