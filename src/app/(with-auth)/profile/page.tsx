'use client';

import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useState } from 'react';

import { browserApi } from '@/shared/API/client/browser-client';

import { useUser } from '@/entities/user/model/hooks';

export default function ProfilePage() {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<string>('');
	const [error, setError] = useState<string>('');

	const { data: userData } = useUser();

	const queryClient = useQueryClient();
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		if (selected) {
			setFile(selected);
			setResult('');
			setError('');
		}
	};

	const handleUpload = async () => {
		if (!file) {
			setError('Пожалуйста, выберите файл');
			return;
		}
		setUploading(true);
		setProgress(0);
		setError('');
		setResult('');
		try {
			console.log('1. Getting upload URL...');

			const data = await browserApi.post<{
				success: boolean;
				uploadUrl: string;
				key: string;
			}>('/upload', {
				filename: file.name,
				contentType: file.type,
				userId: userData.id,
			});

			console.log('2. Upload URL received:', data.uploadUrl);
			console.log('3. File key:', data.key);

			await axios.put(data.uploadUrl, file, {
				headers: {
					'Content-Type': file.type,
				},
				onUploadProgress: progressEvent => {
					if (progressEvent.total) {
						const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setProgress(percent);
						console.log(`Upload progress: ${percent}%`);
					}
				},
			});
			console.log('4. Upload complete!');

			await browserApi.put(`/users/avatar/${userData.id}`, { avatarKey: data.key });

			queryClient.invalidateQueries({ queryKey: ['user'] });

			console.log('✅ Cache updated with new avatarKey:', data.key);
			setResult(`✅ File uploaded successfully!\nKey: ${data.key}`);
		} catch (err) {
			console.error('Error:', err);
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.error || err.message);
			} else {
				setError(err instanceof Error ? err.message : 'Unknown error');
			}
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className='p-8 max-w-md mx-auto'>
			<h1 className='text-2xl font-bold mb-6'>Test Avatar Upload</h1>

			<div className='space-y-4'>
				<div>
					<label className='block text-sm font-medium mb-2'>Select Image</label>
					<input
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						disabled={uploading}
						className='block w-full text-sm border rounded-lg p-2'
					/>
					{file && (
						<p className='text-sm text-gray-500 mt-1'>
							{file.name} ({(file.size / 1024).toFixed(2)} KB)
						</p>
					)}
				</div>

				<button onClick={handleUpload} disabled={!file || uploading} style={{ backgroundColor: 'silver' }}>
					{uploading ? `Uploading... ${progress}%` : 'Upload'}
				</button>

				{uploading && (
					<div className='w-full bg-gray-200 rounded-full h-2'>
						<div
							className='bg-blue-500 h-2 rounded-full transition-all duration-300'
							style={{ width: `${progress}%` }}
						/>
					</div>
				)}

				{result && <div className='p-3 bg-green-100 text-green-700 rounded whitespace-pre-wrap'>{result}</div>}

				{error && <div className='p-3 bg-red-100 text-red-700 rounded'>{error}</div>}
			</div>
		</div>
	);
}
