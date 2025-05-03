// src/utils/cloudinary.js
const CLOUDINARY_CLOUD_NAME = 'ddtjfw4p5';
const CLOUDINARY_UPLOAD_PRESET = 'banners';
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

export const uploadImageToCloudinary = async (file) => {
    try {
        // Validate file
        if (!file || !(file instanceof File)) {
            throw new Error('Invalid file object');
        }

        if (!file.type.startsWith('image/')) {
            throw new Error('File must be an image');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'banners');
        formData.append('api_key', CLOUDINARY_API_KEY);
  
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        });
  
        if (!res.ok) {
            const error = await res.json();
            console.error('Cloudinary upload error:', error);
            throw new Error(error.message || 'Cloudinary upload failed');
        }

        const data = await res.json();
        return { url: data.secure_url, publicId: data.public_id };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

// Helper function to generate SHA-1 hash
const generateSHA1 = async (message) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

// Helper function to generate signature
const generateSignature = async (publicId, timestamp) => {
    const str = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    return await generateSHA1(str);
};

export const deleteImageFromCloudinary = async (publicId) => {
    try {
        if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
            throw new Error('Cloudinary credentials are not configured');
        }

        const timestamp = Math.round((new Date()).getTime() / 1000);
        const signature = await generateSignature(publicId, timestamp);

        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('signature', signature);
        formData.append('api_key', CLOUDINARY_API_KEY);
        formData.append('timestamp', timestamp);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        if (!res.ok || data.result !== 'ok') {
            throw new Error(data.error?.message || 'Failed to delete image from Cloudinary');
        }

        return data;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};
  