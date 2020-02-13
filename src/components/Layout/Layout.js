import React from 'react'

import Auxaliry from '../../hoc/Auxaliry'
import classes from './Layout.module.css'
const layout = ( props ) => (
    <Auxaliry>
        <div>ToolBar,SideDrawer,BackDrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxaliry>
);

export default layout