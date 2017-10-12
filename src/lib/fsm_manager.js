export default class FSM_Manager {
  constructor(_router) {
    this.fsmStack = [];
    this.router = _router;
  }

  pushFSM(fsm) {
    let self = this;
    let stateChangeLogStr = 'Level ' + this.fsmStack.length + ' State Changed';
    fsm.observe('onEnterState', function(info) { 
      console.log(stateChangeLogStr); 
      console.log(info);
      if (self.router.getMatchedComponents(info.to).length > 0) {
        console.log('Pushing route: ' + info.to)
        self.router.push({name: info.to});
      }
      else
        self.handleStateChange(info);
    });
    this.fsmStack.push(fsm);
  }

  popFSM() {
    return this.fsmStack.pop();
  }

  currentFSM() { 
    return this.fsmStack.length === 0? null : this.fsmStack[this.fsmStack.length - 1];
  }

  handleStateChange(info) {}
        // override in app-specific implementation
}