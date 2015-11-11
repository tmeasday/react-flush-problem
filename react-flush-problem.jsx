if (Meteor.isClient) {

  window.go = () => {
    v.set(Random.id());
    Tracker.flush();
  }

  const v = new ReactiveVar();
  let hasRerun;

  A = new React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
      // set a dep on v
      v.get();

      hasRerun = true;
      Tracker.onInvalidate(() => {
        hasRerun = false;
        Tracker.afterFlush(() => {
          if (!hasRerun) {
            console.log("THIS IS A BUG!");
          }
        });
      });
      
      
      return {};
    },
    onClick() {
      go();
    },
    render() {
      return <div style={{width: '100px', height: '100px', backgroundColor: 'black'}} onClick={this.onClick}/>;
    }
  });


  Meteor.startup(function() {
    React.render(<A/>, document.getElementById('react'));
  });

}
