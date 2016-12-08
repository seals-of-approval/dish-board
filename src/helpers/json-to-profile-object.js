module.exports = (json, organis) => {
  const raw = JSON.parse(json)
      .map(function (i) {
        i.label = i.labels.name;
        if (i.assignee) {
          i.assignee = i.assignee.login;
        }
        return i;
      });
  const profileObj = {};
  profileObj.username = raw[0].user.login;
  profileObj['user-url'] = raw[0].user.url;
  profileObj.organisation = raw[0].repository.owner.login;
  profileObj['open-issues'] = raw.filter(i => i.state === 'open');
  profileObj['closed-issues'] = raw.filter(i => i.state === 'closed');
  return profileObj;
};
