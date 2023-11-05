function extractRepoName(issueUrl: string) {
    const match = issueUrl.match(
        /github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)/
    );
    return match ? `${match[2].replace(/-/g, ' ')} #${match[3]}` : null;
}

export default extractRepoName;
