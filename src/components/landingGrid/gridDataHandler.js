import FooterGridDataHandler from "../items/itemFooter/footerDataHandler";

var GridDataHandler = {};

GridDataHandler.getImageData = function (imageData, parameter, reversed) {

    switch (parameter) {

        case 'WIDTH':

            if (reversed) {
                if (imageData.target && imageData.target.size) return imageData.target.size.w;
                if (imageData.thumbnail && imageData.thumbnail.size) return imageData.thumbnail.size.w;
                if (imageData.size) return imageData.size.w;
            }

            if (imageData.size) return imageData.size.w;
            if (imageData.thumbnail && imageData.thumbnail.size) return imageData.thumbnail.size.w;
            if (imageData.target && imageData.target.size) return imageData.target.size.w;
            return null;

        case 'HEIGHT':

            if (reversed) {
                if (imageData.target && imageData.target.size) return imageData.target.size.h;
                if (imageData.thumbnail && imageData.thumbnail.size) return imageData.thumbnail.size.h;
                if (imageData.size) return imageData.size.h;
            }

            if (imageData.size) return imageData.size.h;
            if (imageData.thumbnail && imageData.thumbnail.size) return imageData.thumbnail.size.h;
            if (imageData.target && imageData.target.size) return imageData.target.size.h;
            return null;

        case 'SOURCE':

            // Low resolution source will be returned when available. 
            // That is OK in the landing gallery where we want thumbnails but in the pictures viewer 
            // we will need full resolution 1st

            if (reversed) {
                if (imageData.target && imageData.target.src) return imageData.target.src;
                if (imageData.thumbnail && imageData.thumbnail.src) return imageData.thumbnail.src;
                if (imageData.src) return imageData.src;
            }

            if (imageData.src) return imageData.src;
            if (imageData.thumbnail && imageData.thumbnail.src) return imageData.thumbnail.src;
            if (imageData.target && imageData.target.src) return imageData.target.src;
            return null

        case 'COLOR':
            if (imageData.color) return imageData.color;
            if (imageData.thumbnail && imageData.thumbnail.color) return imageData.thumbnail.color;
            if (imageData.target && imageData.target.color) return imageData.target.color;
            return null

        case 'cropStrategy':

            // Low resolution source will be returned when available. 
            // That is OK in the landing gallery where we want thumbnails but in the pictures viewer 
            // we will need full resolution 1st

            if (reversed) {
                if (imageData.target && imageData.target.cropStrategy) return imageData.target.cropStrategy;
                if (imageData.thumbnail && imageData.thumbnail.cropStrategy) return imageData.thumbnail.cropStrategy;
                if (imageData.cropStrategy) return imageData.cropStrategy;
            }

            if (imageData.cropStrategy) return imageData.cropStrategy;
            if (imageData.thumbnail && imageData.thumbnail.cropStrategy) return imageData.thumbnail.cropStrategy;
            if (imageData.target && imageData.target.cropStrategy) return imageData.target.cropStrategy;
            return null

        case 'ALIGN':

            if (reversed) {
                if (imageData.target && imageData.target.align) return imageData.target.align;
                if (imageData.thumbnail && imageData.thumbnail.align) return imageData.thumbnail.align;
                if (imageData.align) return imageData.align;
            }

            if (imageData.align) return imageData.align;
            if (imageData.thumbnail && imageData.thumbnail.align) return imageData.thumbnail.align;
            if (imageData.target && imageData.target.align) return imageData.target.align;
            return null

        default:

            return null;
    }
};

GridDataHandler.getFrameHeightFromWidth = function (imgW, imgH, columnWidth) {
    var calculatedHeigh = columnWidth * imgH / imgW;
    if (calculatedHeigh > imgH) calculatedHeigh = imgH;
    return calculatedHeigh
};

GridDataHandler.getFooterHeight = function( footerData ) {
    //console.log("[FooterDataHandler.getFooterHeight] footerData: ", footerData );
    if ( !footerData || footerData === false || footerData.length === 0 ) return 0;
    var calculatedHeigh = null;
    var rowHeight = 24;
    var numOfRows = 2;
    calculatedHeigh = rowHeight * numOfRows;
    return calculatedHeigh
};

GridDataHandler.utils = {
    arrOfTops : null,

    allTopsToMaximum: function (){
        var temp = GridDataHandler.utils.arrOfTops;

        // Get max top
        var max = temp[0];
        for (var i = 1; i < temp.length; i++) {
            if (temp[i] > max) {
                max = temp[i];
            }
        }  
        
        // All tops equal
        this.setAllTops(max);

        console.log("GridDataHandler.utils.arrOfTops: ", GridDataHandler.utils.arrOfTops );
    },
    setAllTops: function( top ) {
        var temp = GridDataHandler.utils.arrOfTops;
        for (var i = 0; i < temp.length; i++) {
            temp[i] = top
        }  
    },
    getTargetColum : function () { // Smallest number in array and its position
        var temp = GridDataHandler.utils.arrOfTops;
        var index = 0;
        var value = temp[0];
        for (var i = 1; i < temp.length; i++) {
            if (temp[i] < value) {
                value = temp[i];
                index = i;
            }
        }
        return index;
    },
    getCurrentTopAndCalculateANewOneUpdatingColumnsRegistry : function (colNum, newItemHeight, ITEM_TOP_MARGIN) {
        var temp = GridDataHandler.utils.arrOfTops;
        var currentTop = temp[colNum];
        var newTop = currentTop + newItemHeight + ITEM_TOP_MARGIN;
        temp[colNum] = newTop;
        return currentTop;
    },
    getMaxTopFromColumnsRegistry : function () {
        var temp = GridDataHandler.utils.arrOfTops;
        var max = temp[0];
        for (var i = 1; i < temp.length; i++) {
            if (temp[i] > max) {
                max = temp[i];
            }
        }
        return max;
    },
    getMaxTopFromColumnsRegistryAndUpdate : function (colNum, newItemHeight, ITEM_TOP_MARGIN) {
        var temp = GridDataHandler.utils.arrOfTops;

        var max = temp[0];
        for (var i = 1; i < temp.length; i++) {
            if (temp[i] > max) {
                max = temp[i];
            }
        }  

        var currentTop = max;
        var newTop = currentTop + newItemHeight + ITEM_TOP_MARGIN;
        this.setAllTops(newTop);
        return currentTop;
    }
};

GridDataHandler.CALCULATE_ALL_GALLERY_POSITIONS = function (imagesData, numOfColumns, columnWidth, columnMargin, vMargin, showFooter, footerOverlap, headerOverlap) {

    var ITEM_TOP_MARGIN = vMargin; //columnMargin;
    var COLUMS_MARGIN = columnMargin;

    //console.log("[GridDataHandler.CALCULATE_ALL_GALLERY_POSITIONS] imagesData: ", imagesData );
    //console.log("[GridDataHandler.CALCULATE_ALL_GALLERY_POSITIONS] numOfColumns: ", numOfColumns );
    //console.log("[GridDataHandler.CALCULATE_ALL_GALLERY_POSITIONS] columnWidth: ", columnWidth );

    GridDataHandler.utils.arrOfTops = Array(numOfColumns).fill(0); //[0,0,0,0];

    var containerWidth = numOfColumns * (columnWidth + columnMargin) - columnMargin;

    var lon = imagesData.length;
    if (lon === 0) return [];
    var arr = [];

    // ---------------------------------------------------

    for (var i = 0; i < lon; i++) {

        var img = imagesData[i];
        arr.push(img);
        
        // TODO: Use in the future contentType and containerType as properties of the picture json object.

        // -----------------------
        // [1] WIDTH OF THE IMAGE
        // -----------------------

        var img_w = 256, 
            img_h = 256;

        if (img.type === "FOLDER") { //if (img.type === "IMAGE" || img.type === "VIDEO") { 
            img_w = 256; 
            img_h = 256; 
        }

        if (img.type != "FOLDER") { 
            img_w = GridDataHandler.getImageData(img, "WIDTH"); 
            img_h = GridDataHandler.getImageData(img, "HEIGHT"); 
        }

        if (img.type === "WIDE_ITEM") { 
            img_w = containerWidth; 
            img_h = GridDataHandler.getImageData(img, "HEIGHT"); 
        }

        // -----------------------
        // [2] FOOTER
        // -----------------------

        var footerH = 0,
            footerTopMargin = 0;

        if (showFooter === true) {
            footerH = FooterGridDataHandler.getFooterHeight(img.footer);
            footerTopMargin = footerH > 0 ? window.DEFAULTS.FOOTER_TOP_MARGIN : 0;
        }

        // ----------------------------------
        // [3] WIDTH AND HEIGHT OF THE FRAME
        // ----------------------------------

        var frmW = 0,
            frmH = 0;

        if ( img.type === "WIDE_ITEM") {
            frmW = containerWidth;
            frmH = img.height || 100;
        } else {
            frmW = columnWidth;
            frmH = this.getFrameHeightFromWidth(img_w, img_h, columnWidth);
        }

        //console.log("[GridDataHandler.CALCULATE_ALL_GALLERY_POSITIONS] columnWidth, frmH: ", columnWidth, ", ",frmH );

        arr[i].calculated = {
            imgW: img_w,
            imgH: img_h,
            frmW: frmW,
            frmH: frmH,
            imgBgColor: img.type != "FOLDER"? this.getImageData(img, "COLOR"): 'transparent',
            footerH: footerH,
            footerTopMargin: footerTopMargin,
            showFooter: showFooter,
            footerOverlap: footerOverlap,
            headerOverlap: headerOverlap,
            imageCenter: {
                x: frmW/2,
                y: frmH/2
            }
        }

        if ( img.type === "WIDE_ITEM") {
            arr[i].calculated.footerTopMargin = arr[i].calculated.footerH > 0 ? 10 : 0;
            arr[i].calculated.totalComponetH = arr[i].calculated.frmH + arr[i].calculated.footerTopMargin + arr[i].calculated.footerH;
            var targetColum = 0;
            arr[i].calculated.left = targetColum * (columnWidth + COLUMS_MARGIN);
            arr[i].calculated.top = GridDataHandler.utils.getMaxTopFromColumnsRegistryAndUpdate(null, arr[i].calculated.totalComponetH, ITEM_TOP_MARGIN);
            GridDataHandler.utils.allTopsToMaximum();
        } else {
            arr[i].calculated.footerTopMargin = arr[i].calculated.footerH > 0 ? 10 : 0;
            arr[i].calculated.totalComponetH = arr[i].calculated.frmH + arr[i].calculated.footerTopMargin + arr[i].calculated.footerH;
            var targetColum = GridDataHandler.utils.getTargetColum();
            arr[i].calculated.left = targetColum * (columnWidth + COLUMS_MARGIN);
            arr[i].calculated.top = GridDataHandler.utils.getCurrentTopAndCalculateANewOneUpdatingColumnsRegistry(targetColum, arr[i].calculated.totalComponetH, ITEM_TOP_MARGIN);
        }
    }

    console.log("[GridDataHandler.CALCULATE_ALL_GALLERY_POSITIONS] arr: ", arr );

    return {
        arr: arr,
        w: containerWidth,
        h: GridDataHandler.utils.getMaxTopFromColumnsRegistry()
    }
    

};

GridDataHandler.removeChildrenItems = function (itemsArr) {
    var lon = itemsArr.length;
    if (lon === 0) return [];
    var arr = [];
    for (var i = 0; i < lon; i++) {
        var imgDat = itemsArr[i];
        if (imgDat.parent) {
            continue;
        }
        arr.push(imgDat);
    }
    return arr
};

GridDataHandler.removeItemsByType = function (itemsArr, itemType) { // itemType: INFO, FOLDER, ...
    var lon = itemsArr.length;
    if (lon === 0) return [];
    var arr = [];
    var cont = 0;
    for (var i = 0; i < lon; i++) {
        var imgDat = itemsArr[i];
        if (imgDat.type === itemType) {
            continue;
        } else {
            imgDat.index = cont++;
            arr.push(imgDat);
        }
    }
    return arr
};

GridDataHandler.generateMediaViewerData = function (itemsArr) {
    GridDataHandler.removeItemsByType(itemsArr, "INFO");
    itemsArr = this.removeItemsByType(itemsArr, "FOLDER");
    return itemsArr
};

GridDataHandler.getPositionInArrOfGalleryItemsById = function (itemsArr, shearchId) {
    console.log("[GridDataHandler.getPositionInArrOfGalleryItemsById] itemsArr: ", itemsArr);
    console.log("[GridDataHandler.getPositionInArrOfGalleryItemsById] shearchId: ", shearchId);
    var lon = itemsArr.length;
    if (lon === 0) return [];
    for (var i = 0; i < lon; i++) {
        if (itemsArr[i].id === shearchId) return i
    }
    return null
};

GridDataHandler.getTags = function ( items, selectedTag ) {
    if ( selectedTag ==  null) return items;
    var arr = [];
    var i_1 = 0, 
        lon_1 = items.length;
    for (var i_1; i_1 < lon_1; i_1++) { // items
        var i_2 = 0; 
        if (!items[i_1].tags) continue;
        var lon_2 = items[i_1].tags.length || 0;
        for (var i_2; i_2 < lon_2; i_2++) { // tags
            var a = selectedTag;
            var b = items[i_1].tags[i_2]
            if ( a === b ){
                arr.push( items[i_1] );
                break; // breaks out of the loop
            } 
        }
    }
    return arr
}

export default GridDataHandler;