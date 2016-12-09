const mapForProfile = (issues) => {
  issues = issues.map((issue) => {
    if (issue.labels[0]) {
      issue.label = issue.labels[0].name;
    }
    issue.repo = issue.repository.name;
    if (issue.assignee) {
      issue.assignee = issue.assignee.login;
    }
    return issue;
  });
  return issues;
};
module.exports = (user, closedissues, openissues) => {
  user = JSON.parse(user);
  openissues = mapForProfile(JSON.parse(openissues));
  closedissues = mapForProfile(JSON.parse(closedissues));
  const issues = openissues.concat(closedissues);
  const profileObj = {};
  profileObj.username = user.login;
  profileObj['user-url'] = user.html_url;
  profileObj.organisation = issues[0].repository.owner.login;
  profileObj['open-issues'] = issues.filter(i => i.state === 'open' && !i.pull_request);
  profileObj['closed-issues'] = issues.filter(i => i.state === 'closed' && !i.pull_request);
  return profileObj;
};
