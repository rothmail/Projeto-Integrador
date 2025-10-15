const API_URL = 'http://localhost:3000/api';

async function fetchWithAuth(endpoint, options = {}) {
    const token = authService.getToken();

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    };

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Exemplos de uso:
async function getPosts(page = 1) {
    return await fetchWithAuth(`/posts?page=${page}`);
}

async function createPost(content, tag) {
    return await fetchWithAuth('/posts', {
        method: 'POST',
        body: JSON.stringify({ content, tag })
    });
}

async function likePost(postId) {
    return await fetchWithAuth(`/posts/${postId}/like`, {
        method: 'POST'
    });
}