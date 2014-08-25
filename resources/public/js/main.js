/** @jsx React.DOM */

var WordItem = React.createClass({
  render: function() {
    var classString = "list-group-item";
    if ("local" === this.props.origin && !this.props.valid && !this.props.invalid) {
      classString += ' list-group-item-warning';
    }
    if (this.props.valid) {
      classString += ' list-group-item-success';
    }
    if (this.props.invalid) {
      classString += ' list-group-item-danger invalid';
    }
    return (
      <li className={classString}>
        {this.props.children}
      </li>
    );
  }
});

var WordList = React.createClass({
  render: function() {
    var wordNodes = this.props.data.map(function (word) {
      return (
        <WordItem origin={word.origin} valid={word.valid} invalid={word.invalid}>
          {word.word}
        </WordItem>
      );
    });
    return (
      <ul className="list-group">
        {wordNodes}
      </ul>
    );
  }
});

var WordInput = React.createClass({
  handleSubmit: function() {
    var word = this.refs.word.getDOMNode().value.trim();
    if (!word) {
      return false;
    }
    this.props.onWordSubmit({word: word});
    this.refs.word.getDOMNode().value = '';
    return false;
  },
  render: function() {
    return (
      <div className="input-group">
        <input className="form-control" ref="word" type="text"> </input>
        <span className="input-group-btn">
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </span>
      </div>
    );
  }
});

var TopsComponent = React.createClass({
  loadWordsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        var ns = this.state.data.slice(0,9);
        ns.unshift({word: data, origin: "server"});
        this.setState({data: ns});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleWordSubmit: function(word) {
    var ns = this.state.data.slice(0,9);
    ns.unshift({word: word.word, origin: "local"});
    this.setState({data: ns});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(word),
      processData: false,
      success: function(data) {
        var us = this.state.data.map(function (word) {
          if (word.word == data.valid) {
            word.valid = true;
            return word;
          }
          return word;
        });
        this.setState({data: us});
      }.bind(this),
      error: function(xhr, status, err) {
        var us = this.state.data.map(function (word) {
          if (word.word == xhr.responseJSON.invalid) {
            word.invalid = true;
            return word;
          }
          return word;
        });
        this.setState({data: us});
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadWordsFromServer();
    setInterval(this.loadWordsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-5 col-sm-6">
          <h1> React Tops </h1>
          <WordInput onWordSubmit={this.handleWordSubmit}/>
          <WordList data={this.state.data}/>
        </div>
      </div>
    );
  }
});

if (document.getElementById('tops')) {
  React.renderComponent(
    <TopsComponent url="word" pollInterval={1000} />,
    document.getElementById('tops')
  );
}
