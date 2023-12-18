function transformGitHubApiUrl(apiUrl?: string) {
    if (!apiUrl) return '#';
    const transformedUrl = apiUrl.replace(
        /https:\/\/api\.github\.com\/repos\//,
        'https://github.com/'
    );

    return transformedUrl;
}

export default transformGitHubApiUrl;
