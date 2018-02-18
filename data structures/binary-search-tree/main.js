class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  add(data) {
    let node = this.root;
    if (node === null) {
      this.root = new Node(data);
    } else {
      const searchTree = function(node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      }
      return searchTree(node);
    }
  }

  findMin() {
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }

  isPresent(data) {
    let current = this.root;
    while(current) {
      if (data === current.data) {
        return true;
      }
      
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      }
    }
    return false;
  }

  remove(data) {
    const removeNode = function(node, data) {
      if (node === null) {
        return null;
      }

      // FOUND IT
      if (data === node.data) {
        // No Left - No Right
        if (node.left === null && node.right === null) {
          return null;
        }

        // Has only Left child
        if (node.left !== null && node.right === null) {
          return node.left;
        }

        // Has only Right child
        if (node.left === null && node.right !== null) {
          return node.left;
        }

        // Has Both Left and Right Children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);

      // Data smaller that current node
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      // Data bigger that current node
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      }
    }
    this.root = removeNode(this.root, data);
  }
}

const bst = new BST();
bst.add(10);
bst.add(5);
bst.add(12);
bst.add(8);
bst.add(13);
bst.add(387);
bst.add(11);
bst.add(6);
bst.add(1);

console.log('------- min max -------');
console.log('Min: ', bst.findMin());
console.log('Max: ', bst.findMax());

console.log('------- is present -------');
console.log('Is 5 present: ', bst.isPresent(5));
console.log('Is 4000 present: ', bst.isPresent(4000));

console.log('------- remove -------');
console.log('8 exists?: ', bst.isPresent(8));
console.log('remove 8');
bst.remove(8);
console.log('8 exists?: ', bst.isPresent(8));







