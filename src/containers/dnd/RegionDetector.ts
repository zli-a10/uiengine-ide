import _ from "lodash";
import { XYCoord } from "dnd-core";

interface ClientRectExt extends ClientRect {
  width: number;
  height: number;
}

export default class RegionDetector {
  static instance: RegionDetector;
  static getInstance() {
    if (!RegionDetector.instance) {
      RegionDetector.instance = new RegionDetector();
    }
    return RegionDetector.instance;
  }

  //implements IRegionDetector
  clientOffset?: XYCoord;
  clientRect?: ClientRect;

  // inner size ratio
  innerSizeRatio = 0.8;

  // will caculate the rects
  rects = {
    center: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: 0,
      width: 0
    },

    left: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: 0,
      width: 0
    },

    right: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: 0,
      width: 0
    },

    top: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: 0,
      width: 0
    },

    bottom: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: 0,
      width: 0
    }
  };

  // Region: top, left, bottom, right, center
  setRegionInfo(clientOffset: XYCoord, clientRect: ClientRect) {
    this.clientOffset = clientOffset;
    this.clientRect = clientRect;

    // caculate the center, at least 10 pixels
    this.rects.center.width = clientRect.width * this.innerSizeRatio;
    this.rects.center.height = clientRect.height * this.innerSizeRatio;
    const gapWidth = (clientRect.width - this.rects.center.width) / 2;
    const gapHeight = (clientRect.height - this.rects.center.height) / 2;
    // innerpos
    this.rects.center.top = clientRect.top + gapHeight;
    this.rects.center.bottom = clientRect.bottom - gapHeight;
    this.rects.center.left = clientRect.left + gapWidth;
    this.rects.center.right = clientRect.right - gapWidth;

    // left Rect
    this.rects.left.top = clientRect.top + gapHeight + 1;
    this.rects.left.bottom = clientRect.bottom - gapHeight - 1;
    this.rects.left.left = clientRect.left;
    this.rects.left.right = this.rects.center.left - 1;

    // right Rect
    this.rects.right.top = clientRect.top + gapHeight + 1;
    this.rects.right.bottom = clientRect.bottom - gapHeight - 1;
    this.rects.right.left = this.rects.center.right + 1;
    this.rects.right.right = clientRect.right;

    // top Rect
    this.rects.top.top = clientRect.top;
    this.rects.top.bottom = this.rects.center.top - 1;
    this.rects.top.left = clientRect.left;
    this.rects.top.right = clientRect.right;

    // bottom Rect
    this.rects.bottom.top = this.rects.center.bottom + 1;
    this.rects.bottom.bottom = clientRect.bottom;
    this.rects.bottom.left = clientRect.left;
    this.rects.bottom.right = clientRect.right;
  }

  /**
   * Get current hover region name
   * see this.rects
   *
   * @param clientOffset
   * @param clientRect
   */
  detectCurrentRegion(clientOffset: XYCoord, clientRect: ClientRect) {
    this.setRegionInfo(clientOffset, clientRect);
    let rectName = "";
    _.forIn(this.rects, (rect: ClientRectExt, name: string) => {
      if (
        clientOffset.x > rect.left &&
        clientOffset.x < rect.right &&
        clientOffset.y > rect.top &&
        clientOffset.y < rect.bottom
      ) {
        rectName = name;
        return;
      }
    });
    return rectName;
  }
}
