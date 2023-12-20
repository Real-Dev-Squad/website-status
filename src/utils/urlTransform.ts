function transformGitHubApiUrl(apiUrl?: string) {
    if (!apiUrl) return '#';
    const transformedUrl = apiUrl.replace(
        /https:\/\/api\.github\.com\/repos\//,
        'https://github.com/'
    );

    return transformedUrl;
}

function extractRepoName(issueUrl: string) {
    const match = issueUrl.match(
        /(?:https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+))|(?:https:\/\/api\.github\.com\/repos\/([^/]+)\/([^/]+)\/issues\/(\d+))/
    );

    if (match) {
        const repo = match[2] || match[5];
        const issueNumber = match[3] || match[6];
        return `${repo.replace(/-/g, ' ')} #${issueNumber}`;
    }

    return null;
}

export { transformGitHubApiUrl, extractRepoName };
