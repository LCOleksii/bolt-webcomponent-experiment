export class ClassWatcher {
    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
      if(!Array.isArray(this.classToWatch)){
        this.classToWatch = [classToWatch];  
      }

      this.targetNode = targetNode;
      this.classAddedCallback = classAddedCallback;
      this.classRemovedCallback = classRemovedCallback;
      this.observer = null;
      this.lastClassState = this.getState();
      this.init();
    }
  
    init() {
      this.observer = new MutationObserver(this.mutationCallback);
      this.observe();
    }
    
    getState() {
      let state = "";
      this.classToWatch.forEach((c) => {
        if (this.targetNode.classList.contains(c)){
          state += "1"
        } else {
          state += "0"
        }
      });
      return state
    }

    observe() {
      this.observer.observe(this.targetNode, { attributes: true, attributeFilter: ['class'] });
    }
  
    disconnect() {
      this.observer.disconnect();
    }
  
    mutationCallback = () => {
      const currentClassState = this.getState();
      if (this.lastClassState !== currentClassState) {
        this.lastClassState = currentClassState;
        if (currentClassState.indexOf("1") != -1) {
          this.classAddedCallback();
        } else {
          this.classRemovedCallback();
        }
      }
    }
}