import {
  propTypes,
  merge,
  omit,
  idx,
  is
} from './util'

export default ({
  key,
  prop = 'variant',
  styles = []
}) => {
  const blacklist = styles.reduce((a, fn) => [
    ...a,
    ...Object.keys(fn.propTypes || {})
  ], [])
  const fn = (props) => {
    const value = idx(props.theme, key, props[prop]) || null
    if (!is(value)) return null
    const merged = {
      theme: props.theme || {},
      ...value
    }
    return styles
      .map(fn => fn(merged))
      .reduce(merge, omit(value, blacklist))
  }

  fn.propTypes = {
    [prop]: propTypes.numberOrString
  }

  return fn
}
