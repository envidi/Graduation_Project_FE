export interface MyObjectComment {
  id: number
  content: string
  like: number
  items: MyObjectComment[]
}

const useNode = () => {
  const insertNode = (
    tree: MyObjectComment,
    commentId: number,
    like: number,
    item: string
  ): MyObjectComment => {
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        content: item,
        items: [],
        like: like
      })
      return tree
    }
    let latestNode = []
    latestNode = tree?.items?.map((ob: MyObjectComment) => {
      return insertNode(ob, commentId, like, item)
    })
    return { ...tree, items: latestNode }
  }
  const editNode = (
    tree: MyObjectComment,
    commentId: number,
    like: number,
    value: string
  ): MyObjectComment => {
    if (tree.id === commentId) {
      tree.content = value
      tree.like = like
      return tree
    }

    tree.items.map((ob) => {
      return editNode(ob, commentId, like, value)
    })

    return { ...tree }
  }

  return {
    insertNode,
    editNode
  }
}
export default useNode
