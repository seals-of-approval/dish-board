module.exports = (user, issues) => {
  user = JSON.parse(user);
  const raw = JSON.parse(issues)
      .map(function (i) {
        if (i.labels[0]) {
          i.label = i.labels[0].name;
        }
        i.repo = i.repository.name;
        if (i.assignee) {
          i.assignee = i.assignee.login;
        }
        return i;
      });
  const profileObj = {};
  profileObj.username = user.login;
  profileObj['user-url'] = user.url;
  profileObj.organisation = raw[0].repository.owner.login;
  profileObj['open-issues'] = raw.filter(i => i.state === 'open');
  profileObj['closed-issues'] = raw.filter(i => i.state === 'closed');
  return profileObj;
};
