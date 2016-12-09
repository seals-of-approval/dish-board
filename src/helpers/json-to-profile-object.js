module.exports = (user, issues) => {
  user = JSON.parse(user);
  issues = JSON.parse(issues)
      .map((issue) => {
        if (issue.labels[0]) {
          issue.label = issue.labels[0].name;
        }
        issue.repo = issue.repository.name;
        if (issue.assignee) {
          issue.assignee = issue.assignee.login;
        }
        return issue;
      });
  const profileObj = {};
  profileObj.username = user.login;
  profileObj['user-url'] = user.html_url;
  profileObj.organisation = issues[0].repository.owner.login;
  profileObj['open-issues'] = issues.filter(i => i.state === 'open');
  profileObj['closed-issues'] = issues.filter(i => i.state === 'closed');
  return profileObj;
};
