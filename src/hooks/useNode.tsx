export interface MyObjectComment {
  id: number
  content: string
  items: MyObjectComment[]
}

const useNode = () => {
  const insertNode = (
    tree: MyObjectComment,
    commentId: number,
    item: string
  ): MyObjectComment => {
    if (tree.id === commentId) {
      tree.items.push({ id: new Date().getTime(), content: item, items: [] })
      return tree
    }
    let latestNode = []
    latestNode = tree?.items?.map((ob: MyObjectComment) => {
      return insertNode(ob, commentId, item)
    })
    return { ...tree, items: latestNode }
  }

  return {
    insertNode
  }
}
export default useNode
