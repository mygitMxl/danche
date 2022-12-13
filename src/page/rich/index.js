
import { Card, Button, Modal } from 'antd';
import React, { Component } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import draftjs from 'draftjs-to-html';
export default class index extends Component {
    state={
        showRichText:false,
    }

     onEditorStateChange = (editorState) => {//编辑器状态
      this.setState({
        editorState,
      })
    }
    onEditorChange=(contentState)=>{//contentState：内容状态
        this.setState({
            contentState//输入文本的内容
        })
    }
    //清空按钮
    handleClearContent=()=>{
        this.setState({
            editorState:''
        })
    }
    //获取html文本
    handleGetText=()=>{
        this.setState({
            showRichText:true
        })
    }
  render() {
    const {editorState}=this.state
    return (
      <div>
        <Card>
        <Button type="primary" onClick={this.handleClearContent} style={{ marginRight: 10 }}>清空内容</Button>
          <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>{/* 不要忘记加转html 文本*/}
        </Card>
        <Card title="富文本编辑器" className='card-wrap'>
        <Editor
           editorState={editorState}
           onEditorStateChange={this.onEditorStateChange}//没有这一条则无法编辑
           onContentStateChange={this.onEditorChange}//内容发生变化时处理
         />
        </Card>
        <Modal title='富文本'  visible={this.state.showRichText}
         onCancel={()=>{this.setState({showRichText:false})}}
         footer={null}
        >
          {draftjs(this.state.contentState)}
        </Modal>
      </div>
    )
  }
}
