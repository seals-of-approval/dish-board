module.exports = (user, closedissues, openissues) => {
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
    }).filter(i => !i.pull_request);
    return issues;
  };
  user = JSON.parse(user);
  const profileObj = {};
  profileObj.username = user.login;
  profileObj['user-url'] = user.html_url;
  profileObj['open-issues'] = mapForProfile(JSON.parse(openissues)).filter(i => i.state === 'open');
  profileObj['closed-issues'] = mapForProfile(JSON.parse(closedissues)).filter(i => i.state === 'closed');
  profileObj.organisation = issues[0].repository.owner.login;
  return profileObj;
};
