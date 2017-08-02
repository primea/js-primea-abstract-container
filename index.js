module.exports = class AbstractContainer {
  // The constructor is given an instance of the kernel
  // https://github.com/primea/js-primea-hypervisor/blob/master/docs/kernel.md
  constructor (kernel) {
    this.kernel = kernel
  }

  // This method runs once when the container is initially created.
  //
  // In general, a root instance receives no message, but every other instance
  // receives a message with a singel port, which is a channel to its parent (aka the root).
  //
  // Optionally it can return a single value.
  async onCreation (message) {
    throw new Error('Unimplemented initialiser')
  }

  // This method runs when the container needs to be started up. It cannot be
  // called before onCreation was successful. It can be called after a shutdown
  // was requested in onIdle.
  async onStartup () {}

  // This is called for each incoming message the container gets.
  //
  // Optionally it can return a single value.
  async onMessage (message) {
    throw new Error('Unimplemented message: ' + message.data)
  }

  // onIdle is called when there are no more immediate messages pending
  // in the incoming queue for the container to receive.
  //
  // This can be overriden by a subclass.
  onIdle () {
    // This tells the kernel that it is safe to freeze (aka turn off) this container.
    // This removes all references in memory and the next time this instance is
    // requested it has to be deserialised from storage and spinned up. This can be
    // a time consuming operation.
    this.kernel.shutdown()
  }

  // each container type used in a hypervisor instance must have a different
  // id defined as an interger. This value will be used by default but can be overridden by hypervisor.
  static get containerTypeId () {
    throw new Error('Unimplemented container type id')
  }
}
