var h = React.createElement;
var IssueList =  React.createClass({
  render: function(){
    var lis = this.props.data.map(function(text, idx){
      return h('li', {key:idx}, text)
    })
    return (
      h('ul', null, lis)
    )
  }
})

var IssuePage =  React.createClass({
  render: function(){
    return (
      h('div', null,
        h('h1', null, 'Issue List'),
        h(IssueList, {data:['issue 1','issue 2','issue 3']})
       )
    )
  }
})

ReactDOM.render(
  React.createElement(IssuePage),
  document.getElementById('issue')
)

//function reqListener () {
//  var issues = JSON.parse(this.responseText);
//  issues.forEach(function(issue){
//    var issue_li = document.createElement('li')
//    issue_li.textContent= issue['title'];
//    console.log(issue['title'])
//    document.getElementById('issues').appendChild(issue_li)
//  })
//};
//
//var oReq = new XMLHttpRequest();
//oReq.onload = reqListener;
//oReq.open("get", "https://api.github.com/repos/shinglyu/moztrap-new-ui/issues", true);
//oReq.send();
