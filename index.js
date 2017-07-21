class AbstractContainer {
  // the constructor is given an instance of the kernel
  // https://github.com/primea/js-primea-hypervisor/blob/master/docs/kernel.md
  constructor (kernel) {
    this.kernel = kernel
  }

  // this method runs once when the container is initially created. It is given
  // a message with a single port, which is a channel to its parent with the
  // exception of the root container (the container that is intailial created)
  initialize (message) {
    throw new Error('Unimplemented initialiser')
  }

  // the function is called for each message that a container gets
  run (message) {
    throw new Error('Unimplemented message: ' + message.data)
  }

  onIdle () {
    this.kernel.shutdown()
  }
}
