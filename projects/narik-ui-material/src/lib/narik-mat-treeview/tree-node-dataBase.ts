import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class NodeItem {
  title: string;
  children?: NodeItem[];
  data: any;
}

export class TreeNode {
  constructor(
    public expandable: boolean,
    public item: NodeItem,
    public level: number
  ) {}
}

@Injectable()
export class TreeNodeDatabase {
  dataChange = new BehaviorSubject<NodeItem[]>([]);

  get data(): NodeItem[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize([]);
  }
  remove(node: TreeNode, parentNode: TreeNode) {
    let items: NodeItem[] = [];
    if (parentNode) {
      items = parentNode.item.children;
    } else {
      items = this.data;
    }
    const index = items.indexOf(node.item);
    if (index !== -1) {
      items.splice(index, 1);
      this.dataChange.next(this.data);
    }
  }
  add(title: string, parent?: NodeItem): NodeItem {
    const newItem = { title: title } as NodeItem;
    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(newItem);
    } else {
      this.data.push(newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }
  initialize(initData: any) {
    this.dataChange.next(initData);
  }
}
