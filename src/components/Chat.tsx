import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { pushChatMessage } from '../store/FaqChatSlice';
import { useTypedDispatch, useTypedSelector } from '../store/Store';
import { randomId } from '../utils';

export function Chat() {
	const dummy = useRef<HTMLDivElement>(null);
	const dispatch = useTypedDispatch();
	const messages = useTypedSelector(state => state.faqChatSlice);

	const [question, setQuestion] = useState('');

	const search = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const content = question;
		setQuestion('');
		dispatch(pushChatMessage({ type: 'question', content: question, id: randomId() }));
		const res = await fetch(`/api/faq?question=${content}`, {
			method: 'GET',
		});
		if (res.ok) {
			const data = (await res.json()) as { answer: string };
			dispatch(pushChatMessage({ type: 'answer', content: data.answer, id: randomId() }));
		} else {
			const data = (await res.json()) as { error: string };
			dispatch(pushChatMessage({ type: 'error', content: data.error, id: randomId() }));
		}
	};

	useEffect(() => {
		dummy.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<>
			<div className='custom-scrollbar flex h-[80vh] flex-col gap-y-3 overflow-y-scroll'>
				{messages.map(msg => {
					return (
						<p
							key={msg.id}
							className={`ml-3 h-fit w-fit rounded-md p-2 shadow-lg first:mt-2 ${
								msg.type === 'question'
									? 'bg-blue-600 text-white'
									: msg.type === 'answer'
									? 'bg-gray-400 text-black'
									: 'bg-red-500 text-white'
							}`}
						>
							{msg.type === 'error' ? (
								<>
									{msg.content}.{' '}
									<Link href='/submit'>
										<a className='underline underline-offset-2'>Click here to add answer</a>
									</Link>
								</>
							) : (
								msg.content
							)}
						</p>
					);
				})}
				<div ref={dummy}></div>
			</div>
			<form onSubmit={e => search(e)} className='fixed bottom-0 mb-4 flex h-12 w-full px-2'>
				<input
					type='text'
					className='w-full rounded-md border-none p-2 shadow-sm outline-none'
					onChange={e => setQuestion(e.target.value)}
					value={question}
					placeholder='Ask a question about Graphic Era University'
					autoFocus
				/>
				<button type='submit'>
					<ArrowCircleRightIcon className='h-12 w-12 fill-green-500' />
				</button>
			</form>
		</>
	);
}
