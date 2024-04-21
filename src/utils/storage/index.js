/**
 * storage 封装
 * @author chenjian
 *
 */
import config from '../../config'
export default {
  getStorage() {
    return JSON.parse(localStorage.getItem(config.namespace)) || {}
  },
  setItem(key, value) {
    let storage = this.getStorage()
    storage[key] = value
    localStorage.setItem(config.namespace, JSON.stringify(storage))
  },

  getItem(key) {
    return this.getStorage()[key]
  },
  clearItem(key) {
    let s = this.getStorage()
    delete s[key]
    localStorage.setItem(config.namespace, JSON.stringify(s))
  },
  clear() {
    localStorage.clear()
  }
}
