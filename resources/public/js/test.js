/** @jsx React.DOM */

$.mockjax({
  url: 'word',
});

describe('WordItem from server', function() {
  it('is rendered correctly', function() {
    var TestUtils = React.addons.TestUtils;

    // Render a worditem
    var worditem = TestUtils.renderIntoDocument(
      <WordItem origin="server" valid={false} invalid={false}>
        teste
      </WordItem>
    );

    // Verify that it has the correct content
    var li = TestUtils.findRenderedDOMComponentWithTag(
      worditem, 'li');
    expect(li.getDOMNode().textContent).toEqual('teste');
    expect(li.getDOMNode().classList.contains('list-group-item')).toEqual(true);
    expect(li.getDOMNode().classList.contains('list-group-item-warning')).toEqual(false);
  });
});

describe('TopsComponent', function() {
  it('add a new word to the list on input', function() {
    var TestUtils = React.addons.TestUtils;

    var topscomponent = TestUtils.renderIntoDocument(
      <TopsComponent url="word" pollInterval={1000} />
    );

    var input = TestUtils.findRenderedDOMComponentWithTag(
      topscomponent, 'input');
    expect(input.getDOMNode().classList.contains('form-control')).toEqual(true);
    expect(input.getDOMNode().value).toEqual('');
    input.getDOMNode().value = "blabla"

    var ul = TestUtils.findRenderedDOMComponentWithTag(
      topscomponent, 'ul');
    expect(ul.getDOMNode().textContent).toEqual('');

    var button = TestUtils.findRenderedDOMComponentWithTag(
      topscomponent, 'button');

    TestUtils.Simulate.click(button);

    expect(ul.getDOMNode().textContent).toEqual('blabla');
  });
});
