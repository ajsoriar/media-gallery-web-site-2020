import FooterGridDataHandler from "./../items/itemFooter/dataHandler";

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
            if (imageData.thumbnail && imageData.thumbnail.cropStrategy) return imageData.thumbnail.cropStrategy;
            return null

        default:

            return null;
    }
};

GridDataHandler.getFrameHeightFromWidth = function (imgW, imgH, columnWidth) {

    var calculatedHeigh = 100;

    // imageData.target.size.w ---> columnWidth
    // imageData.target.size.h ---> X
    // X = columnWidth x imgH / imgW

    calculatedHeigh = columnWidth * imgH / imgW;

    if (calculatedHeigh > imgH) calculatedHeigh = imgH;

    return calculatedHeigh
};

GridDataHandler.calculateGrid = function (imagesData, numOfColums, columnWidth, columnMargin, showFooter, footerOverlap, headerOverlap) {

    var ITEM_TOP_MARGIN = columnMargin;
    var COLUMS_MARGIN = columnMargin;

    //console.log("[GridDataHandler.calculateGrid] imagesData: ", imagesData );
    //console.log("[GridDataHandler.calculateGrid] numOfColums: ", numOfColums );
    //console.log("[GridDataHandler.calculateGrid] columnWidth: ", columnWidth );

    var arrOfTops = Array(numOfColums).fill(0); //[0,0,0,0];

    var getTargetColum = function (temp) { // Smallest number in array and its position
        temp = arrOfTops;
        var index = 0;
        var value = temp[0];
        for (var i = 1; i < temp.length; i++) {
            if (temp[i] < value) {
                value = temp[i];
                index = i;
            }
        }
        return index;
    };

    var getCurrentTopAndCalculateANewOneUpdatingColumsRegistry = function (colNum, newItemHeight) {
        var currentTop = arrOfTops[colNum];
        var newTop = currentTop + newItemHeight + ITEM_TOP_MARGIN;
        arrOfTops[colNum] = newTop;
        return currentTop;
    };

    var lon = imagesData.length;
    if (lon === 0) return [];
    var arr = [];

    for (var i = 0; i < lon; i++) {
        var imgDat = imagesData[i];
        arr.push(imgDat);

        var imgW = GridDataHandler.getImageData(imgDat, "WIDTH");
        var imgH = GridDataHandler.getImageData(imgDat, "HEIGHT");
        var footerH = 0;
        var footerTopMargin = 0;
        if (showFooter === true) {
            footerH = FooterGridDataHandler.getFooterHeight(imgDat.footer);
            footerTopMargin = footerH > 0 ? 10 : 0;
        }

        arr[i].calculated = {
            imgW: imgW,
            imgH: imgH,
            frmW: columnWidth,
            frmH: this.getFrameHeightFromWidth(imgW, imgH, columnWidth),
            imgBgColor: this.getImageData(imgDat, "COLOR"),
            footerH: footerH,
            footerTopMargin: footerTopMargin,
            showFooter: showFooter,
            footerOverlap: footerOverlap,
            headerOverlap: headerOverlap
        }

        arr[i].calculated.footerTopMargin = arr[i].calculated.footerH > 0 ? 10 : 0;
        arr[i].calculated.totalComponetH = arr[i].calculated.frmH + arr[i].calculated.footerTopMargin + arr[i].calculated.footerH;
        var targetColum = getTargetColum();
        arr[i].calculated.left = targetColum * (columnWidth + COLUMS_MARGIN);
        arr[i].calculated.top = getCurrentTopAndCalculateANewOneUpdatingColumsRegistry(targetColum, arr[i].calculated.totalComponetH);
    }

    return arr
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

GridDataHandler.removeInfoItems = function (itemsArr) {
    var lon = itemsArr.length;
    if (lon === 0) return [];
    var arr = [];
    var cont = 0;
    for (var i = 0; i < lon; i++) {
        var imgDat = itemsArr[i];
        if (imgDat.type === "INFO") {
            continue;
        } else {
            imgDat.index = cont++;
            arr.push(imgDat);
        }
    }
    return arr
};

GridDataHandler.generateMediaViewerData = function (itemsArr) {

    itemsArr = this.removeInfoItems(itemsArr);
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

export default GridDataHandler;