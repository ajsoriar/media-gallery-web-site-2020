// Router.navigationTree.currentLevel

var Router = {
    navigationTree: {
        line:[],
        add: ( routeObj ) => {
            console.log("New route:", routeObj );
            Router.navigationTree.line.push( routeObj );
        },
        down: () => { // this.chooseDataSource(Router.navigationTree.down());
            if ( window.WEB_ROUTER.navigationTree.line.length < 2 ) {
                console.log("no!");
                return null
            }
            
            window.WEB_ROUTER.navigationTree.line.pop();
            return window.WEB_ROUTER.navigationTree.line[ window.WEB_ROUTER.navigationTree.line.length -1 ].galleryFile
        }
    } 
}

window.WEB_ROUTER = Router;

window.WEB_ROUTER.navigationTree.line.push({
    galleryFile: window.WEB_CONFIG.rootDataFile,
    level: 0,
    selectedItemID: null
});

export default Router;