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
      <form
        className={this.props.className}
        onSubmit={
          (evt) => {
            const suggest = this.props.suggests[this.state.focusedIndex];
            if (suggest) {
              select(suggest);
            }
            evt.preventDefault();
          }
        }
      >
        <Input
          styles={this.props.styles}
          className={`
            ${this.props.styles.chips.input}
            ${this.props.suggests.length ? this.props.styles.chips.hasSuggest : ''}
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
            (evt) => {
              this.setState({
                display: true
              });
              this.props.onFocus(evt);
            }
          }
          onBlur={this.props.onBlur}
        />
        <div className={this.props.styles.chips.container}>
          <ul
            ref={(elem) => { this.suggestsDOM = elem; }}
            className={this.props.styles.chips.suggests}
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
                        ${this.props.styles.chips.suggest}
                        ${index === this.state.focusedIndex ? this.props.styles.chips.focused : ''}
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
                            className={this.props.styles.chips.icon}
                            src={suggest.image}
                            alt={suggest.name}
                          />
                        : null
                      }
                      <div className={this.props.styles.chips.text} >{suggest.name}</div>
                    </a>
                  </li>
                ) : ''
            }
          </ul>
        </div>
        <ul
          className={this.props.styles.chips.chips}
        >
          {
            this.props.chips
              .map(tag =>
                <IconButton
                  styles={this.props.styles}
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
      </form>
    );
  }
}

Chips.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
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
  onFocus: () => {},
  onBlur: () => {},
  suggests: [],
  chips: [],
  placeholder: '',
  styles: {
    fa: require('../less/fa/less/font-awesome.less'),
    chips: require('../less/chips.less'),
    input: require('../less/input.less'),
    iconButton: require('../less/icon-button.less')
  }
};

export default Chips;
