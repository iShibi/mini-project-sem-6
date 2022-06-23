import type { NextApiRequest, NextApiResponse } from 'next';
import Fuse from 'fuse.js';
import { PrismaClient, FaqQuery } from '@prisma/client';
const prisma = new PrismaClient();

export type ResponseType =
	| {
			answer: string;
	  }
	| {
			error: string;
	  }
	| FaqQuery;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { method } = req;
	if (method === 'GET') {
		const faqList = await prisma.faqQuery.findMany();
		const fuse = new Fuse(faqList, { includeScore: true, keys: ['question'] });
		const { question } = req.query;
		const result = fuse.search(question as string);
		const answer = result[0]?.item.answer;
		if (typeof answer === 'string') {
			return res.status(200).json({ answer });
		} else {
			return res.status(404).json({ error: 'No answer found' });
		}
	}
	if (method === 'POST') {
		const { question, answer } = JSON.parse(req.body);
		const createdFaq = await prisma.faqQuery.create({
			data: {
				question,
				answer,
			},
		});
		return res.status(201).json(createdFaq);
	}
}
