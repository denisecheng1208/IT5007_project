import React, { Component } from 'react'
import './ContextEditor.css'
import MDEditor, { commands, ICommand } from '@uiw/react-md-editor';

export default class ContextEditor extends Component {
  state = {
    userId: "",
    markdown: ['## This is a demo for text input\n' + 'A simple markdown editor with preview, implemented with React.js and TypeScript. This React Component aims to provide a simple Markdown editor with syntax highlighting support. This is based on `textarea` encapsulation, so it does not depend on any modern code editors such as Acs, CodeMirror, Monaco etc. \n' +
      '\n' +
      '### Features\n' +
      '\n' +
      '- 📑 Indent line or selected text by pressing tab key, with customizable indentation.\n' +
      '- ♻️ Based on `textarea` encapsulation, does not depend on any modern code editors.\n' +
      '- 🚧 Does not depend on the [`uiw`](https://github.com/uiwjs/uiw) component library.\n' +
      '- 🚘 Automatic list on new lines.\n' +
      '- 💡 Support [next.js](https://github.com/uiwjs/react-md-editor/issues/52#issuecomment-848969341), [Use examples](#support-nextjs) in [next.js](https://nextjs.org/).\n',

    "## This is a demo for code in MarkDown \n" + "```jsx \n" +
    "import React from 'react'; \n" +
    "import MDEditor from '@uiw/react-md-editor'; \n" +
    'import rehypeSanitize from "rehype-sanitize"; \n' +
    '\n' +
    'export default function App() { \n' +
    ' const [value, setValue] = React.useState("**Hello world!!!** <IFRAME SRC="javascript:javascript:alert(window.origin);"></IFRAME>"); \n' +
    ' return ( \n' +
    '   <div className="container"> \n' +
    '     <MDEditor \n' +
    '       value={value} \n' +
    '       onChange={setValue} \n' +
    '       previewOptions={{ \n' +
    '         rehypePlugins: [[rehypeSanitize]], \n' +
    '       }}/> \n' +
    '\n' +
    '     <MDEditor.Markdown \n' +
    '       source={value} \n' +
    '       rehypePlugins={[[rehypeSanitize]]}/> \n' +
    '\n' +
    '   </div> \n' +
    ' ); \n' +
    '} \n' +
    "```",

    "## This is a demo for picture input\n" + "## Contributors\n" +

    'As always, thanks to our amazing contributors!\n' +
    '\n' +
    '<a href="https://github.com/uiwjs/react-md-editor/graphs/contributors">\n' +
    '  <img src="https://uiwjs.github.io/react-md-editor/CONTRIBUTORS.svg" /> \n' +
    '</a>\n' +
    '\n' +
    'Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).\n' +
    '\n' +
    '### License\n' +
    '\n' +
    'Licensed under the MIT License."'],
  }

  onEditorContextChange = (newVal, idx) => {
    var cur = this.state.markdown
    cur[idx] = newVal
    this.setState({ markdown: cur })
  }

  addNewEditor = () => {
    var cur = this.state.markdown
    var newVal = [...cur, '']
    this.setState({ markdown: newVal })
  }

  submit = () => {

  }

  removeEditor = (target) => {
    var newVal = this.state.markdown.filter((val, idx) => idx != target)
    this.setState({markdown: newVal})
  }

  render() {
    return (
      <div className='contextContainer col-10 offset-1'>
        {
          this.state.markdown.map((cur, idx) => {
            return (
              <div className="editorWrapper row" key={idx}>
                <MDEditor className="offset-1 col-10" height={500} value={this.state.markdown[idx]} onChange={(value) => this.onEditorContextChange(value, idx)} />
                <div className="btnWrapper col-1">
                  <button className='btn removeEditor col-1' onClick={() => this.removeEditor(idx)}>
                    Delete
                  </button>
                </div>
              </div>)
          })
        }
        <div className="addNewEditor">
          <button className='btn newTab' onClick={this.addNewEditor}>
            New tab
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className='btn submit' onClick={this.submit}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}