import type { NextPage } from 'next';
import Head from 'next/head';
import { Chat } from '../components/Chat';

const ChatPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Chat</title>
			</Head>

			<main>
				<Chat />
			</main>
		</>
	);
};

export default ChatPage;
