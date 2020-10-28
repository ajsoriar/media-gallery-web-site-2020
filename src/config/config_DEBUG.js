window.WEB_DEBUG = {
    _showDebugPalette: true,
    _PANELS: {
        panel_themes: false,
        panel_gallery: false,
        panel_tags: false,
        panel_algorithm: false
    },
    _GUIDES:{
        outlines: false,
        responsiveBgColor: false,
        columns: false,
        gridImagesCalculations: false,
        gridImagesTags: false,
        imageIndexes: false,
        viewerImgCalculations: false
    }
};

window.WEB_DEBUG_DATA = {
    columnsGrid: [{
        maxContainerWidth:2600,
        maxNumOfColumns:13,
        minColumWidth:150,
        sideMargin:40,
        hmargin:15,
        showChildrenItems: true,
        galleryTop: 130,
        vMargin:15,
        showFooter: false,
        footerOverlap: false,
        headerOverlap: false
    },{
        maxContainerWidth:6000,
        maxNumOfColumns:13,
        minColumWidth:240,
        sideMargin:100,
        hmargin:10,
        showChildrenItems: true,
        galleryTop: 100,
        vMargin:10,
        showFooter: false,
        footerOverlap: false,
        headerOverlap: true
    },{
        maxContainerWidth:1150,
        maxNumOfColumns:5,
        minColumWidth:140,
        sideMargin:20,
        hmargin:20,
        showChildrenItems: true,
        galleryTop: 60,
        vMargin:20,
        showFooter: true,
        footerOverlap: false,
        headerOverlap: false
    },{
        maxContainerWidth:6000,
        maxNumOfColumns:10,
        minColumWidth:100,
        sideMargin:0,
        hmargin:0,
        showChildrenItems: true,
        galleryTop: 0,
        vMargin:0,
        showFooter: false,
        footerOverlap: false,
        headerOverlap: false
    }]
};

window.WEB_DEBUG_DATA.mixMenu = [
    {id: 0, title: 'Default & Mini images', paramArr: ['default-theme', 0]},
    {id: 1, title: 'Dark & Medium size', paramArr: ['dark-theme',1]},
    {id: 2, title: 'Light & Max width', paramArr: ['light-theme',2]}
]

window.WEB_DEBUG_DATA.stylesMenu = [
    {id: 0, title: 'default', themeName: 'default-theme'},
    {id: 1, title: 'dark', themeName: 'dark-theme'},
    {id: 2, title: 'light', themeName: 'light-theme' }
]

window.WEB_DEBUG_DATA.columnsMenu = [
    {id: 0, title: 'Mini images'},
    {id: 1, title: 'Medium size'},
    {id: 2, title: 'Max width'},
    {id: 3, title: 'Full space'}
]

window.WEB_DEBUG_DATA.sourcesMenu = [
    {id: 0, title: 'Source 1', fileName: 'data.1.json'},
    {id: 1, title: 'Source 2', fileName: 'data.2.json'},
    {id: 0, title: 'Gallery Root', fileName: 'data.3.root.json'},
    {id: 1, title: 'Gallery Folder. level 1', fileName: 'data.4.folder1.json'}
]