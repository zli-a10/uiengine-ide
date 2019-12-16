import _ from "lodash";
/**
 * use for storing some common data, like context data to the none React class
 */
export class ShortcutManager {
  static instance: ShortcutManager;
  static getInstance() {
    if (!ShortcutManager.instance) {
      ShortcutManager.instance = new ShortcutManager();
    }
    return ShortcutManager.instance;
  }

  // ctrlZ: () => {}
  private shortcuts: any = {};

  /**
   * @param shortcut example: ctrlZ, ctrlShiftZ, Z
   */
  register(shortcut: string | object, callback?: () => void) {
    // split shortcut as ctrl, shift, alt, character
    if (_.isObject(shortcut)) {
      _.merge(this.shortcuts, shortcut);
    } else {
      _.set(this.shortcuts, shortcut, callback);
    }

    window.onkeydown = (e: any) => {
      // if (_.get(e, "target.localName") === "input") {
      //   console.log(e);
      //   e.stopPropagation();
      //   return;
      // }

      for (let key in this.shortcuts) {
        const keys = _.words(key).map((k: string) => k.toLowerCase());
        if (
          (keys.indexOf("ctrl") !== -1 && !e.ctrlKey) ||
          (keys.indexOf("shift") !== -1 && !e.shiftKey) ||
          (keys.indexOf("alt") !== -1 && !e.altKey) ||
          keys.indexOf(e.key.toLowerCase()) === -1
        ) {
          continue;
        }

        const event = this.shortcuts[key];
        if (_.isFunction(event)) {
          event(e);
        }
      }
    };
  }
}
