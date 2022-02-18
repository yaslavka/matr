export default {
  functions: [],
  delaying: false,
  add(fn) {
    this.functions.push(fn)
    this.run()
  },
  run() {
    if (this.functions.length && !this.delaying) {
      const fn = this.functions[0]
      this.delaying = true
      setTimeout(() => {
        fn()
        this.functions.shift()
        this.delaying = false
        this.run()
      }, 200)
    }
  },
}
