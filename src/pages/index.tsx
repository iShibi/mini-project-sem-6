import type { NextPage } from 'next';
import Head from 'next/head';

const HomePage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<main>
				<h1 className='mt-4 text-center text-4xl font-bold'>Welcome</h1>
			</main>
		</>
	);
};

export default HomePage;
