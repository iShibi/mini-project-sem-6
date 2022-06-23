import { useState } from 'react';
import { useTypedSelector } from '../store/Store';

export function SubmissionForm() {
	const messages = useTypedSelector(state => state.faqChatSlice);

	const [question] = useState<string>(messages.at(-2)?.content ?? '');
	const [answer, setAnswer] = useState<string>('');

	const add = () => {
		fetch('/api/faq', {
			method: 'POST',
			body: JSON.stringify({
				question,
				answer,
			}),
		});
		setAnswer('');
	};

	return (
		<div className='grid grid-cols-1 gap-y-6'>
			<div className='mt-4 flex justify-center bg-red-500 py-3 text-white shadow-md'>
				<p>{question}</p>
			</div>
			<div className='flex flex-col items-center space-y-4'>
				<textarea
					className='h-52 w-3/4 rounded-md p-4 shadow-md outline-none'
					onChange={e => setAnswer(e.target.value)}
					placeholder='Write your answer here...'
					value={answer}
				/>
				<input
					type='button'
					value='Submit'
					className='rounded-md bg-blue-600 p-2 text-white shadow-md hover:cursor-pointer'
					onClick={add}
				/>
			</div>
		</div>
	);
}
