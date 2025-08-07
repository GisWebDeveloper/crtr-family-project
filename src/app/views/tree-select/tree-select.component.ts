import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {UtilService} from "../../services/util.service";

interface TreeNode {
    id: string | number;
    parId?: string | number;
    nameRu: string;
    nameKz?: string;
    children?: TreeNode[];
    expanded?: boolean;
    selected?: boolean;
    hasChildren?: number;  // Indicates if node has children (for lazy loading)
    loading?: boolean;      // Indicates if children are being loaded
    loaded?: boolean;       // Indicates if children have been loaded
}

@Component({
    selector: 'app-tree-select',
    templateUrl: './tree-select.component.html',
    styleUrls: ['./tree-select.component.scss']
})
export class TreeSelectComponent implements OnInit {
    @Input() data: TreeNode[] = [];
    @Input() placeholder = 'Select items...';
    @Input() searchable = true;
    @Input() multiSelect = true;
    @Input() selectedNodes: (string | number)[] = [];
    @Output() selectedNodesChange = new EventEmitter<(string | number)[]>();

    // Function to load children from backend using Observable
    @Input() loadChildrenFn?: (param?: any) => Observable<TreeNode[]>;

    isOpen = false;
    searchText = '';
    filteredData: TreeNode[] = [];
    selectedNodesText = '';

    constructor(private utilService: UtilService) {
    }

    ngOnInit(): void {
        if (this.data.length > 0) {
            this.filteredData = [...this.data];
        } else {
            if (this.loadChildrenFn) {
                this.loadChildrenFn()
                    .subscribe({
                        next: (children) => {
                            this.filteredData = [...children];
                        },
                        error: (error) => {
                            this.utilService.notifyError(error)
                        }
                    });
            }
        }
        this.updateSelectedNodesText();
    }

    filterNodes(): void {
        if (!this.searchText.trim()) {
            this.filteredData = [...this.data];
            return;
        }

        const searchLower = this.searchText.toLowerCase();
        this.filteredData = this.filterNodeRecursive(this.data, searchLower);
    }

    filterNodeRecursive(nodes: TreeNode[], searchText: string): TreeNode[] {
        return nodes.filter(node => {
            const nameMatch = node.nameRu.toLowerCase().includes(searchText);
            let childrenMatch: TreeNode[] = [];

            if (node.children && node.children.length) {
                childrenMatch = this.filterNodeRecursive(node.children, searchText);
                if (childrenMatch.length) {
                    // Clone the node to avoid modifying the original data
                    const clonedNode = {...node, children: childrenMatch, expanded: true};
                    return true;
                }
            }

            return nameMatch;
        });
    }

    toggleExpand(node: TreeNode, event: Event): void {
        // Stop event propagation to prevent dropdown from closing
        event.stopPropagation();

        // If node has hasChildren flag but no actual children yet, load them
        if ((node.hasChildren || node.children?.length === 0) && !node.loaded && this.loadChildrenFn && !node.expanded) {
            node.loading = true;
            this.loadChildrenFn(node.id)
                .pipe(
                    finalize(() => {
                        node.loading = false;
                        node.expanded = true;
                    })
                )
                .subscribe({
                    next: (children) => {
                        node.children = children;
                        node.loaded = true;
                    },
                    error: (error) => {
                        console.error('Failed to load children:', error);
                    }
                });
        } else {
            // Toggle expansion for nodes with existing children
            node.expanded = !node.expanded;
        }
    }

    isNodeSelected(node: TreeNode): boolean {
        return this.selectedNodes.includes(node.id);
    }

    toggleNodeSelection(node: TreeNode, event: Event): void {
        const checked = (event.target as HTMLInputElement).checked;

        if (this.multiSelect) {
            if (checked) {
                if (!this.selectedNodes.includes(node.id)) {
                    this.selectedNodes = [...this.selectedNodes, node.id];
                }
            } else {
                this.selectedNodes = this.selectedNodes.filter(id => id !== node.id);
            }
        } else {
            this.selectedNodes = checked ? [node.id] : [];
        }

        this.selectedNodesChange.emit(this.selectedNodes);
        this.updateSelectedNodesText();
    }

    updateSelectedNodesText(): void {
        if (this.selectedNodes.length === 0) {
            this.selectedNodesText = '';
            return;
        }

        const selectedNodeNames = this.getSelectedNodeNames(this.filteredData, this.selectedNodes);

        if (selectedNodeNames.length <= 2) {
            this.selectedNodesText = selectedNodeNames.join(', ');
        } else {
            this.selectedNodesText = `${selectedNodeNames.length} items selected`;
        }
    }

    getSelectedNodeNames(nodes: TreeNode[], selectedIds: (string | number)[]): string[] {
        const result: string[] = [];

        const findNames = (nodeList: TreeNode[]) => {
            for (const node of nodeList) {
                if (selectedIds.includes(node.id)) {
                    result.push(node.nameRu);
                }

                if (node.children && node.children.length) {
                    findNames(node.children);
                }
            }
        };

        findNames(nodes);
        return result;
    }

}
