import type { NextPage } from 'next';
import Head from 'next/head';
import { SubmissionForm } from '../components/SubmissionForm';

const SubmitPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Submit</title>
			</Head>

			<main>
				<SubmissionForm />
			</main>
		</>
	);
};

export default SubmitPage;
