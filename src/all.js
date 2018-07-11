import { compose } from './util'
import * as styles from './styles'

const funcs = Object.keys(styles).map(key => styles[key])
  .filter(func => typeof func === 'function')

const all = compose(...funcs)

export default all
