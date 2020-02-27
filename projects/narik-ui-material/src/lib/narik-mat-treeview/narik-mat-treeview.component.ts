import { NarikTreeview } from "@narik/ui-core";
import { Component, Input, Injector } from "@angular/core";
import { TreeNodeDatabase, TreeNode, NodeItem } from "./tree-node-dataBase";

import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";

@Component({
  selector: "narik-mat-treeview narik-treeview",
  templateUrl: "narik-mat-treeview.component.html",
  providers: [TreeNodeDatabase]
})
export class NarikMatTreeview extends NarikTreeview {
  @Input()
  newNodeTitle: string;

  _selectedItem: any;
  set selectedItem(value: any) {
    this._selectedItem = value;
  }
  get selectedItem(): any {
    return this._selectedItem;
  }

  nestedNodeMap = new Map<NodeItem, TreeNode>();
  parentNodeMap = new Map<NodeItem, NodeItem>();

  treeControl: FlatTreeControl<TreeNode>;
  treeFlattener: MatTreeFlattener<NodeItem, TreeNode>;
  treeDataSource: MatTreeFlatDataSource<NodeItem, TreeNode>;

  constructor(injector: Injector, private database: TreeNodeDatabase) {
    super(injector);
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );
    this.treeControl = new FlatTreeControl<TreeNode>(
      this._getLevel,
      this._isExpandable
    );
    this.treeDataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    database.dataChange.subscribe(data => (this.treeDataSource.data = data));
  }
  transformer = (node: NodeItem, level: number) => {
    let flatNode = this.nestedNodeMap.get(node);
    if (!flatNode) {
      flatNode = new TreeNode(
        !!node.children && node.children.length !== 0,
        node,
        level
      );
      this.nestedNodeMap.set(node, flatNode);
    } else {
      flatNode.level = level;
      flatNode.expandable = !!node.children && node.children.length !== 0;
    }
    return flatNode;
  };

  private _getLevel = (node: TreeNode) => node.level;

  private _isExpandable = (node: TreeNode) => {
    return node.expandable;
  };

  private _getChildren = (node: NodeItem): Observable<NodeItem[]> =>
    of(node.children);

  hasChild = (_: number, _nodeData: TreeNode) => _nodeData.expandable;

  initParentMap(menuItem: NodeItem) {
    if (menuItem.children) {
      for (const item of menuItem.children) {
        this.parentNodeMap.set(item, menuItem);
        this.initParentMap(item);
      }
    }
  }
  selectNode(node: TreeNode) {
    this.selectedNode = node;
    this.selectedItem = node ? node.item : null;
  }

  addNode(selectedNode: TreeNode) {
    const newMenu = this.database.add(
      this.newNodeTitle,
      selectedNode ? selectedNode.item : null
    );
    if (selectedNode) {
      this.parentNodeMap.set(newMenu, selectedNode.item);
      this.treeControl.expand(selectedNode);
    }
  }
  deleteNode(selectedNode: TreeNode) {
    const parentItem = this.parentNodeMap.get(this.selectedItem);
    let parentNode = null;
    if (parentItem) {
      parentNode = this.nestedNodeMap.get(parentItem);
    }
    this.database.remove(selectedNode, parentNode);
    this.selectNode(null);
  }

  dataSourceChanged() {
    this.database.initialize(this.dataSource);

    for (const item of this.dataSource) {
      this.initParentMap(item);
    }
  }
}
