import Link from 'next/link';

export function Navbar() {
	return (
		<div className='flex select-none flex-row justify-evenly bg-gray-600 py-3 text-white'>
			<Link href='/'>
				<a>Home</a>
			</Link>
			<Link href='/chat'>
				<a>Chat</a>
			</Link>
			<Link href='/submit'>
				<a>Submit</a>
			</Link>
		</div>
	);
}
