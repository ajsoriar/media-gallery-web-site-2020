/* TagsDataHandler */

var TagsDataHandler = {};

TagsDataHandler.getTags = function ( items, selectedTag ) {

}

TagsDataHandler.setSelectedTagTo = (tagId) => {
    window.WEB_TAGScurretSelectedTag = tagId;
    return tagId;
}

TagsDataHandler.getSelectedTagID = (tagId) => {
    return window.WEB_TAGScurretSelectedTag ;
}

export default TagsDataHandler;