var Router = {
    navigationTree: {
        line:[],
        add: ( routeObj ) => {
            console.log("New route:", routeObj );
            Router.navigationTree.line.push( routeObj );
        },
        down: () => {
            if ( window.WEB_ROUTER.navigationTree.line.length < 2 ) {
                console.log("no!");
                return null
            }
            window.WEB_ROUTER.navigationTree.line.pop();
            return window.WEB_ROUTER.navigationTree.line[ window.WEB_ROUTER.navigationTree.line.length -1 ].galleryFile
        },
        goToIndex: ( index ) =>{
            window.WEB_ROUTER.navigationTree.line = window.WEB_ROUTER.navigationTree.line.splice(0,index+1);
            return window.WEB_ROUTER.navigationTree.line[ window.WEB_ROUTER.navigationTree.line.length -1 ].galleryFile
        },
        reset: () => {
            window.WEB_ROUTER.navigationTree.line = [];
        }
    } 
}

window.WEB_ROUTER = Router;

export default Router;