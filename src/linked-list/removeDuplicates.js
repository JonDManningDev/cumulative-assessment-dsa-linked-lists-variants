/**
 * Remove duplicate values, if any, from a sorted linked list.
 *
 * The algorithm should be O(n) time complexity, therefore it cannot use `find()`.
 *
 * @param sortedLinkedList
 *  a possibly empty link list with all values in lexical order.
 *
 * @returns {LinkedList}
 *  the original linked list with any duplicate values removed.
 */

function removeDuplicates(sortedLinkedList) {
  // TODO: implement an algorithm to remove duplicate values from a sorted linked list.

  if (!sortedLinkedList.head || !sortedLinkedList.head.next)
    return sortedLinkedList;

  let lead = sortedLinkedList.head.next;
  let trail = sortedLinkedList.head;

  while (lead) {
    if (trail.value === lead.value) {
      lead = lead.next;
      trail.next = lead;
    } else {
      lead = lead.next;
      trail = trail.next;
    }
  }

  return sortedLinkedList;
}

module.exports = removeDuplicates;
