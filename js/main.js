var h = React.createElement;

var IssueItem = React.createClass({
  handleClick: function() {
    window.location = this.props.issueinfo.html_url
  },
  render: function() {
    var info = this.props.issueinfo;
    var title = info.title;
    var issuenum = info.number;
    console.log(issuenum);
    return (
        h('div', {className:"issueitem", onClick: this.handleClick},
          h('li', null, issuenum + ' ' + title)
        )
    )
  },
})


var IssueList =  React.createClass({
  render: function() {
    var lis = this.props.issues.map(function(issue, idx) {
      return h(IssueItem, {key: idx, issueinfo: issue})
    })
    return (
      h('ul', null, lis)
    )
  }
})

var IssuePage =  React.createClass({
  getInitialState: function() {
    return {issues: [{id: 0, title:"Loading..."}]}
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
        console.log(issuejson);
        for(var id in issuejson) {
          var org = issuejson[id];
          this.setState({issues: issuejson})
        }
      }.bind(this))
  },
  render: function(){
    return (
      h('div', null,
        h('h1', null, 'Issue List'),
        h(IssueList, {issues: this.state.issues})
       )
    )
  }
})

ReactDOM.render(
  React.createElement(IssuePage),
  document.getElementById('issue')
)

