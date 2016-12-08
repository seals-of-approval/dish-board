module.exports = (user, issues) => {
  user = JSON.parse(user);
  const raw = JSON.parse(issues)
      .map(function (i) {
        i.label = i.labels.name;
        if (i.assignee) {
          i.assignee = i.assignee.login;
        }
        return i;
      });
  const profileObj = {};
  profileObj.username = user.login;
  profileObj['user-url'] = user.url;
  profileObj.organisation = raw[0].repository.owner.login;
  profileObj['open-issues'] = raw.filter(i => i.state === 'closed');
  profileObj['closed-issues'] = raw.filter(i => i.state === 'closed');
  return profileObj;
};
