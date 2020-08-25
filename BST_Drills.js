/* eslint-disable strict */

/*********************************
 * 3. Create a BST class
**********************************/

const BinarySearchTree = require('./BinarySearchTree');

function main() {

  const numBST = new BinarySearchTree();
  const numbers = [ 3,1,4,6,9,2,5,7 ];
  numbers.forEach(num => numBST.insert(num, num));
  //////////////only inserts root 3; left 1->right 2; right 4->right->6...
  //===================  DOES NOT CONSLE LOG 9, 5, 7... WHY ??????

  const strBST = new BinarySearchTree();
  const strings = [ 'E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N' ];
  strings.forEach(str => strBST.insert(str, str));
  ////////////////only inserts root E; left A; right S->left Q,right->Y...
  //===================  DOES NOT CONSOLE LOG remaining letters... WHY ??????

  //console.log(numBST);
  //return numBST;

  //console.log(strBST);
  //return strBST; 

  
  /* 4. What does this program do */
  //console.log(tree(numBST)); 
  //==> 37
  //console.log(tree(strBST)); 
  //==> 0A0E0E0I0N0O0Q0S0S0T0U0Y0 

  /* 5. Height of a BST */
  //console.log(`${height(numBST)} levels deep`);
  //==> 5 levels deep
  //console.log(`${height(strBST)} levels deep`);
  //==> 7 levels deep

  /* 6. Is it a BST */
  //console.log(isBst(numBST));
  //==> yes it's a BST
  //console.log(isBst(strBST));
  //==> yes it's a BST


  /* 7. 3rd largest node */
  //console.log(`the 3rd largest node is ${find3rdLargest(numBST)}`);
  //==> the 3rd largest node is 6
  //console.log(`the 3rd largest node is ${find3rdLargest(strBST)}`);
  //==> the 3rd largest node is T


  /* 8. Balanced BST */
  console.log(isBalanced(numBST));
  //==> no you have leaned towards the darkside
  console.log(isBalanced(strBST));
  //==> no you have leaned towards the darkside


}

main();


/*********************************
  * 4. What does this program do
**********************************/
function tree(t){
  let tick=0;
  if(!t){    
    return 0;
  }
  tick++;
  console.log(`ticks: ${tick}`);
  return tree(t.left) + t.value + tree(t.right);
}


/*********************************
  * 5. Height of a BST
**********************************/
function height(tree){
  let tick = 0;

  if(!tree.left && !tree.right){
    tick++;
    return 1;
  }

  let depth = 1;

  if(tree.left && tree.right){
    tick++;
    let left = height(tree.left);
    let right = height(tree.right);
    if(left > right){
      depth += left;
    }
    else{
      depth += right;
    }
  }
  else if(tree.left){
    tick++;
    depth += height(tree.left);
  }
  else{
    tick++;
    depth += height(tree.right);
  }
  console.log(`ticks: ${tick}`);
  return depth;
}


/*********************************
  * 6. Is it a BST
**********************************/
function isBst(tree) {
  let result = true;

  if(!tree.parent && !tree.left && !tree.right) {
    
    return 'yes it\'s a BST'; //true
  }

  if(!tree.left && !tree.right) {
    return 'yes it\'s a BST'; //true
  }

  if(tree.left) {
    console.log(`parent: ${tree.key}, left: ${tree.left.key}`);
    
    if(tree.left.key >= tree.key) {
      return 'nope'; //false
    } else {
      result = isBst(tree.left);
    }
  }
  
  if(tree.right) {
    console.log(`parent: ${tree.key}, right: ${tree.right.key}`);

    if(tree.right.key <= tree.key) {
      return 'nope'; //false
    } else {
      result = isBst(tree.right);
    }
  }

  return result;
}


/*********************************
  * 7. 3rd largest node
**********************************/
function find3rdLargest(tree){

  //IF TREE IS EMPTY
  if(!tree) {
    return 'there is NO TREE'; //false
  }

  //Right Sub-Tree is Largest as long as NOT EMPTY
  while(tree.right !== null) {
    tree = tree.right;
  }

 
  if(tree.left) {
    tree = tree.left;

    while(tree.right !== null) { 
      tree = tree.right;
    }

    
    if(tree.left) {
      tree = tree.left;
      while(tree.right !== null){
        tree = tree.right;
      }
    }

    else {
      if(tree.key < tree.parent.key){
        tree = tree.parent.parent;
      }

      else{
        tree = tree.parent;
      }
    }

  }

  else {
    tree = tree.parent;

    if(tree.left) {
      tree = tree.left;

      while(tree.right !== null){
        tree = tree.right;
      }
    }

    else {
      tree = tree.parent;
    }
  }

  return tree.key;
}


/*********************************
  * 8. Balanced BST
**********************************/
function isBalanced(tree) {
  if (!tree.parent && !tree.left && !tree.right) {
    return 'yes there is balance in the force, lol'; //true
  }

  if (!tree.left && !tree.right) {
    return 1;
  }

  let depth = 1;

  if (tree.left && tree.right) {
    let left = isBalanced(tree.left);
    let right = isBalanced(tree.right);

    if (left === false || right === false) {
      return 'no you have leaned towards the darkside'; //false
    }

    if (Math.abs(left - right) > 1) {
      return 'no you have leaned towards the darkside'; //false
    } else if (left > right) {
      depth += left;
    } else {
      depth += right;
    }
  } else if (tree.left) {
    let left = isBalanced(tree.left);

    if (left === false) {
      return 'no you have leaned towards the darkside'; //false
    } else {
      depth += left;
    }
  } else {
    let right = isBalanced(tree.right);

    if (right === false) {
      return 'no you have leaned towards the darkside'; //false
    } else {
      depth += right;
    }
  }

  if(!tree.parent) {
    return 'yes there is balance in the force, lol'; //true
  } else {
    return depth;
  }
}

/*********************************
  * 9. Are they the same BSTs
**********************************/