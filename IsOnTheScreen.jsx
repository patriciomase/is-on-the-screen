import React from 'react';
import debounce from 'lodash.debounce';

class IsOnScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onScreen: props.initialValue || true
    };

    this.onScroll = debounce(this.onScroll.bind(this), 100);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }

  onScroll() {
    const client = this.client();
    this.setState({
      onScreen: client.bottom < 0 || client.top > window.innerHeight ? false : true
    });
  }

  onVisibilityChange = () =>  {
    if (document.hidden === true) {
      this.setState({
        onScreen: false
      });
    }

    if (document.hidden === true) {
      this.onScroll();
    }
  } 

  client = () => {
    return this.ref.getBoundingClientRect();
  }

  render() {
    return (
      <div ref={r => this.ref = r}>{this.props.children(this.state.onScreen)}</div>
    );
  }
}

export default IsOnScreen;