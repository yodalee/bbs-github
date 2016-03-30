var h = React.createElement;

var IssueItem = React.createClass({
  render: function() {
    var info = this.props.issueinfo;
    var mark = " "
    if (this.props.id == this.props.curId) { mark="O" }
    var issuenum = info.number;
    var commentnum = info.comments;
    var datetime = info.created_at.split("T")[0].split("-");
    var date = datetime[1] + '/' + datetime[2];
    var author = info.user.login;
    var title = info.title;
    return (
      h('tbody', null,
        h('tr', {className:"issueitem"},
          h('th', null, mark),
          h('th', {className:"right"}, issuenum),
          h('th', {className:"right"}, commentnum),
          h('th', {className:"right"}, date),
          h('th', {className:"right"}, author),
          h('th', {className:"left title"}, title)
        )
      )
    )
  },
})


var IssueList =  React.createClass({
  render: function() {
    var curId = this.props.curId;
    var lis = this.props.issues.map(function(issue, idx) {
      return h(IssueItem, {key: idx, id: idx, curId: curId, issueinfo: issue})
    })
    return (
      h('table', null, lis)
    )
  }
})

var IssuePage =  React.createClass({
  getInitialState: function() {
    var loadingmsg = {number: "", title:"Loading...", created_at:"", user:{}};
    return {issues: [loadingmsg]}
  },

  componentDidMount: function() {
    var url = "https://api.github.com/repos/";
    var username = "servo";
    var repo = "servo";


    fetch(url + username + '/' + repo + '/issues')
      .then(function(result) {
        return result.json();
      })
      .then(function(issuejson) {
        for(var id in issuejson) {
          var org = issuejson[id];
          this.setState({issues: issuejson})
        }
      }.bind(this))
  },
  render: function(){
    var curId=0;
    return (
      h('div', null,
        h('h1', null, 'Issue List'),
        h(IssueList, {curId:curId, issues: this.state.issues})
       )
    )
  }
})

ReactDOM.render(
  React.createElement(IssuePage),
  document.getElementById('issue')
)

