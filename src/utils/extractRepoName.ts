function extractRepoName(issueUrl: string): string | null {
    const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)/;
    const match = issueUrl.match(regex);

    if (match && match.length === 4) {
        const repoName = match[2]
            .replace(/-/g, ' ')
            .split(' ')
            .map((word) => word.charAt(0) + word.slice(1))
            .join(' ');
        const issueNumber = match[3];
        return `${repoName} #${issueNumber}`;
    }

    return null;
}

export default extractRepoName;
