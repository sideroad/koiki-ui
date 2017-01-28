import React, { PropTypes, Component } from 'react';
import Input from './Input';
import IconButton from './IconButton';

class Chips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      display: false,
      focusedIndex: 0
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
    const select = (suggest) => {
      this.props.onSelect(suggest);
      this.setState({
        query: '',
        display: false,
        focusedIndex: 0
      });
    };
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
          onKeyDown={
            (evt) => {
              switch (evt.key) {
                case 'ArrowDown':
                  if (this.props.suggests.length - 1 > this.state.focusedIndex) {
                    this.setState({
                      focusedIndex: this.state.focusedIndex + 1
                    });
                  }
                  break;
                case 'ArrowUp':
                  if (this.state.focusedIndex > 0) {
                    this.setState({
                      focusedIndex: this.state.focusedIndex - 1
                    });
                  }
                  break;
                case 'Enter': {
                  const suggest = this.props.suggests[this.state.focusedIndex];
                  if (suggest) {
                    select(suggest);
                  }
                  break;
                }
                default:
              }
            }
          }
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
                .map((suggest, index) =>
                  <li
                    key={suggest.id}
                  >
                    <a
                      className={`
                        ${this.props.styles.suggest}
                        ${index === this.state.focusedIndex ? this.props.styles.focused : ''}
                      `}
                      href=""
                      onClick={
                        (evt) => {
                          evt.preventDefault();
                          select(suggest);
                        }
                      }
                    >
                      {
                        suggest.image ?
                          <img
                            className={this.props.styles.icon}
                            src={suggest.image}
                            alt={suggest.name}
                          />
                        : null
                      }
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
