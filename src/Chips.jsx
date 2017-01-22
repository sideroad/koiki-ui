import React, { PropTypes, Component } from 'react';
import Input from './Input';
import IconButton from './IconButton';

class Chips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      display: false
    };
  }
  componentDidMount() {
    this.wrappedHandleClickOutside = evt =>
      this.handleClickOutside(evt, this.input, this.suggestsDOM);
    document.addEventListener('click', this.wrappedHandleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.wrappedHandleClickOutside, true);
  }

  handleClickOutside(evt, input, suggestsDOM) {
    if ((!input || !input.inputDOM || !input.inputDOM.contains(evt.target)) &&
        (!suggestsDOM || !suggestsDOM.contains(evt.target))
    ) {
      this.setState({
        display: false
      });
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <Input
          className={`
            ${this.props.styles.input}
            ${this.props.suggests.length ? this.props.styles.hasSuggest : ''}
          `}
          ref={(elem) => { this.input = elem; }}
          icon={this.props.icon}
          placeholder={this.props.placeholder}
          value={this.state.query}
          onChange={
            (evt) => {
              this.setState({
                query: evt.target.value,
                display: true
              });
              this.props.onChange(evt);
            }
          }
          onFocus={
            () => this.setState({
              display: true
            })
          }
          onBlur={this.props.onBlur}
        />
        <div className={this.props.styles.container}>
          <ul
            ref={(elem) => { this.suggestsDOM = elem; }}
            className={this.props.styles.suggests}
          >
            {
              this.state.display &&
              this.state.query ?
              this.props.suggests
                .map(suggest =>
                  <li
                    key={suggest.id}
                  >
                    <a
                      className={this.props.styles.suggest}
                      href=""
                      onClick={
                        (evt) => {
                          evt.preventDefault();
                          this.props.onSelect(suggest);
                          this.setState({
                            query: '',
                            display: false
                          });
                        }
                      }
                    >
                      <img
                        className={this.props.styles.icon}
                        src={suggest.image}
                        alt={suggest.name}
                      />
                      <div className={this.props.styles.text} >{suggest.name}</div>
                    </a>
                  </li>
                ) : ''
            }
          </ul>
        </div>
        <ul
          className={this.props.styles.chips}
        >
          {
            this.props.chips
              .map(tag =>
                <IconButton
                  key={tag.id}
                  item={tag}
                  onClick={
                    tag => this.props.onDelete(tag)
                  }
                  type="delete"
                />
              )
          }
        </ul>
      </div>
    );
  }
}

Chips.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onDelete: PropTypes.func,
  chips: PropTypes.array.isRequired,
  suggests: PropTypes.array,
  placeholder: PropTypes.string,
  styles: PropTypes.object
};

Chips.defaultProps = {
  className: '',
  icon: 'fa-search',
  onSelect: () => {},
  onDelete: () => {},
  onChange: () => {},
  onBlur: () => {},
  suggests: [],
  chips: [],
  placeholder: '',
  styles: require('../less/chips.less')
};

export default Chips;
