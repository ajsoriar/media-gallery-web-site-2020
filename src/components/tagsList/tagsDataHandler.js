/* TagsDataHandler */

var TagsDataHandler = {};

TagsDataHandler.getTags = function ( items, selectedTag ) {

}

TagsDataHandler.setSelectedTagTo = (tagId) => {
    window.WEB_CONFIG.tags.curretSelectedTag = tagId;
    return tagId;
}

TagsDataHandler.getSelectedTagID = (tagId) => {
    return window.WEB_CONFIG.tags.curretSelectedTag;
}

export default TagsDataHandler;