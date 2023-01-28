
  import { Layout} from 'antd';
  import React, { useState } from 'react';
  import Menu from './Menu';
  import Header from './Header';
  import Context from '../router/context';
  const {Content} = Layout;
export default function NewSandBox(props) {
    // Nprogress.start()
    // useEffect(() => {
    //     Nprogress.done()
    // })
    return (
        <Layout  style={{ position:'fixed',top:'0',bottom:'0',right:'0',left:'0'}}>
        <Menu/>
      <Layout className="site-layout">
       <Header/>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
           {/* {props.children} */}
          <Context/>
        </Content>
      </Layout>
    </Layout>
    )
}
