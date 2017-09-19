import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import createTextMaskInputElement
  from '../../core/src/createTextMaskInputElement'

export default class MaskedInput extends React.Component {
  initTextMask() {
    const {props, props: {value}} = this
    const node = ReactDOM.findDOMNode(this)
    const inputElement = node.nodeName.toLowerCase() === 'input'
      ? node
      : node.querySelector('input')

    this.textMaskInputElement = createTextMaskInputElement({
      inputElement,
      ...props,
    })
    this.textMaskInputElement.update(value)
  }

  componentDidMount() {
    this.initTextMask()
  }

  componentDidUpdate() {
    this.initTextMask()
  }

  render() {
    const props = {...this.props}
    const Component = this.props.component

    console.log('test mask hehe')

    delete props.mask
    delete props.guide
    delete props.pipe
    delete props.placeholderChar
    delete props.keepCharPositions
    delete props.value
    delete props.onChange
    delete props.showMask
    delete props.component

    return (
      <Component
        {...props}
        onInput={event => this.onChange(event)}
        defaultValue={this.props.value}
      />
    )
  }

  onChange(event) {
    this.textMaskInputElement.update()

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }
}

MaskedInput.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.bool,
    PropTypes.shape({
      mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      pipe: PropTypes.func,
    }),
  ]).isRequired,
  guide: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pipe: PropTypes.func,
  placeholderChar: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  showMask: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}

MaskedInput.defaultProps = {
  component: 'input'
}

export {default as conformToMask} from '../../core/src/conformToMask.js'
