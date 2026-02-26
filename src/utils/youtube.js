const YOUTUBE_HOSTNAMES = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'];

export const normalizeYouTubeUrlForEmbed = (value) => {
    const rawUrl = (value || '').trim();

    if (!rawUrl) {
        return '';
    }

    let url;
    try {
        url = new URL(rawUrl);
    } catch {
        return rawUrl;
    }

    const hostname = url.hostname.toLowerCase();
    if (!YOUTUBE_HOSTNAMES.includes(hostname)) {
        return rawUrl;
    }

    if (hostname === 'youtu.be') {
        const id = url.pathname.replace('/', '').trim();
        return id ? `https://www.youtube.com/embed/${id}` : rawUrl;
    }

    if (url.pathname.startsWith('/embed/')) {
        return rawUrl;
    }

    if (url.pathname.startsWith('/shorts/')) {
        const id = url.pathname.replace('/shorts/', '').split('/')[0].trim();
        return id ? `https://www.youtube.com/embed/${id}` : rawUrl;
    }

    const videoId = url.searchParams.get('v');
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }

    return rawUrl;
};
