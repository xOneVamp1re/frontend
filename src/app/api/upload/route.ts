// app/api/upload/route.ts
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

// Создаём клиент для работы с R2
const r2Client = new S3Client({
	region: 'auto',
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
});

export async function POST(request: NextRequest) {
	console.log('📤 Upload endpoint called');

	try {
		const body = await request.json();
		const { filename, contentType, userId } = body;

		console.log('Received:', { filename, contentType, userId });

		if (!filename || !contentType) {
			return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 });
		}

		const ext = filename.split('.').pop();
		const timestamp = Date.now();
		const randomString = Math.random().toString(36).substring(2, 8);

		const key = userId
			? `avatars/${userId}/${timestamp}_${randomString}.${ext}`
			: `avatars/temp/${timestamp}_${randomString}.${ext}`;

		console.log('Generated key:', key);

		const command = new PutObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME!,
			Key: key,
			ContentType: contentType,
		});

		const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });

		console.log('✅ Upload URL generated');

		// Возвращаем ссылку для загрузки и ключ файла
		return NextResponse.json({
			success: true,
			uploadUrl,
			key,
		});
	} catch (error) {
		console.error('❌ Error generating upload URL:', error);
		return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 });
	}
}
