export default class FSM_Manager {
  constructor(_router) {
    this.fsmStack = [];
    this.router = _router;
    this.locationHashStack = [];
    this.locationHashStackIX = -1;
    window.onhashchange = this.handleBrowserHashChange.bind(this);
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

  handleBrowserHashChange(event) {
    let fsm = this.currentFSM();
    if (fsm === null)
      return;

    let thisHash = location.hash;
    if (this.locationHashStackIX != -1 ) {
      let thisHashIX = this.locationHashStackIX.indexOf(thisHash);
      if (thisHashIX === -1)
        this.locationHashStack[++this.locationHashStackIX] = thisHashIX;
      else {
        let diffIX = thisHashIX - this.locationHashStackIX;
        if (diffIX === -1 && this.currentFSM().canHistoryBack()) {
          this.locationHashStackIX = thisHashIX;
          this.currentFSM().historyBack();
        }
        else if (diffIX === 1 && this.currentFSM().canHistoryForward()) {
          this.locationHashStackIX = thisHashIX;
          this.currentFSM().historyForward();
        }
        else if (diffIX !== 0) {
          alert("FSM Confusion!  Reload...");
          this.locationHashStackIX = -1;
          this.locationHashStack = [];
          location.replace('/#');
        }
      }
    }
  }

  handleStateChange(info) {}
        // override in app-specific implementation
}