import React, { Component } from 'react'
import CommentsDisplayer from '../CommentsDisplayer/CommentsDisplayer'
import ContextDispalyer from '../ContextDisplayer/ContextDispalyer'

export default class ContextsDisplayerWrapper extends Component {
  state = {
    displayComments: false,
    commentsOnDisplay: 0,
    comments: {
      0: [{ picture: "https://tse1-mm.cn.bing.net/th/id/R-C.65e439879aa61497589862adad1f88f6?rik=jDN9PbfgKozvdA&riu=http%3a%2f%2fscimg.jianbihuadq.com%2f202006%2f2020062019313121.jpg&ehk=KNd6VIpIB3vIh47ExDwI0l43YYaKMH5z5Ha7xgwG90E%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1", name: "Tom", timestamp: "2021-11-03", content: "Helping Parents Parents often get angry because of their trouble in their lives. Let's say that your mother is not happy about her boss. If she doesn't have other ways of expressing her emotions, she might come home and yell at you, scream at your dad, kick at the dog, or even say something mean to you." },
      { picture: "https://tse1-mm.cn.bing.net/th/id/R-C.65e439879aa61497589862adad1f88f6?rik=jDN9PbfgKozvdA&riu=http%3a%2f%2fscimg.jianbihuadq.com%2f202006%2f2020062019313121.jpg&ehk=KNd6VIpIB3vIh47ExDwI0l43YYaKMH5z5Ha7xgwG90E%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1", name: "Tom", timestamp: "2021-11-03", content: "Helping Parents Parents often get angry because of their trouble in their lives. Let's say that your mother is not happy about her boss. If she doesn't have other ways of expressing her emotions, she might come home and yell at you, scream at your dad, kick at the dog, or even say something mean to you." },
      { picture: "https://tse1-mm.cn.bing.net/th/id/R-C.65e439879aa61497589862adad1f88f6?rik=jDN9PbfgKozvdA&riu=http%3a%2f%2fscimg.jianbihuadq.com%2f202006%2f2020062019313121.jpg&ehk=KNd6VIpIB3vIh47ExDwI0l43YYaKMH5z5Ha7xgwG90E%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1", name: "Tom", timestamp: "2021-11-03", content: "Helping Parents Parents often get angry because of their trouble in their lives. Let's say that your mother is not happy about her boss. If she doesn't have other ways of expressing her emotions, she might come home and yell at you, scream at your dad, kick at the dog, or even say something mean to you." }
      ],

      1: [{ picture: "https://tse3-mm.cn.bing.net/th/id/OIP-C.DrEMqf81ldFRSsE1PBmPEQHaEo?pid=ImgDet&rs=1", name: "Bob", timestamp: "2021-05-24", content: "With people’s increasing awareness of environmental protection, renewable resources became very popular, thus experts and scientists in the field of energy also pay more attention to how to take full use of renewable resources. Solar energy is a well-known renewable resource. And now the most famous invention which adapted the solar energy technology is the solar water heater. Recently the solar water heater is widely used in most Chinese families for heating water. This kind of water heater has the advantages of being clean, safe, and cheap. It helps us improve the living standard. " },
      { picture: "https://tse3-mm.cn.bing.net/th/id/OIP-C.DrEMqf81ldFRSsE1PBmPEQHaEo?pid=ImgDet&rs=1", name: "Bob", timestamp: "2021-05-24", content: "With people’s increasing awareness of environmental protection, renewable resources became very popular, thus experts and scientists in the field of energy also pay more attention to how to take full use of renewable resources. Solar energy is a well-known renewable resource. And now the most famous invention which adapted the solar energy technology is the solar water heater. Recently the solar water heater is widely used in most Chinese families for heating water. This kind of water heater has the advantages of being clean, safe, and cheap. It helps us improve the living standard. " },
      { picture: "https://tse3-mm.cn.bing.net/th/id/OIP-C.DrEMqf81ldFRSsE1PBmPEQHaEo?pid=ImgDet&rs=1", name: "Bob", timestamp: "2021-05-24", content: "With people’s increasing awareness of environmental protection, renewable resources became very popular, thus experts and scientists in the field of energy also pay more attention to how to take full use of renewable resources. Solar energy is a well-known renewable resource. And now the most famous invention which adapted the solar energy technology is the solar water heater. Recently the solar water heater is widely used in most Chinese families for heating water. This kind of water heater has the advantages of being clean, safe, and cheap. It helps us improve the living standard. " }
      ],

      2: [{ picture: "https://tse1-mm.cn.bing.net/th/id/R-C.8f14851af44a4d9785bde1b4261230b8?rik=hiSiZlw8aI0phQ&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f0185925882c304a8012060c8b495f7.jpg%401280w_1l_2o_100sh.jpg&ehk=cFhm8jbiAjsAXGVC5TQQNVTcR2r9U%2fnYGh%2f8hCu0A1s%3d&risl=&pid=ImgRaw&r=0", name: "Jerry", timestamp: "2022-03-05", content: "Once I saw the TV show, it was about the fathers and their kids having the match, they were separated into five groups and competed for the match. At first, they were competing happily, but as the game came to the end, the last group was so worried. The father inspired his kid to stick on and finish the match, while the kid was crying because he knew he must be the last. After the match, the father told his kid that winning was not the most important thing for the match, the first thing was to enjoy the game and finish it, the result was not that important. I agree with the father, the child must be endowed with the consciousness that to enjoy the game is more important than to win. Every match can only have one win, but we can enjoy every match." },
      { picture: "https://tse1-mm.cn.bing.net/th/id/R-C.8f14851af44a4d9785bde1b4261230b8?rik=hiSiZlw8aI0phQ&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f0185925882c304a8012060c8b495f7.jpg%401280w_1l_2o_100sh.jpg&ehk=cFhm8jbiAjsAXGVC5TQQNVTcR2r9U%2fnYGh%2f8hCu0A1s%3d&risl=&pid=ImgRaw&r=0", name: "Jerry", timestamp: "2022-03-05", content: "Once I saw the TV show, it was about the fathers and their kids having the match, they were separated into five groups and competed for the match. At first, they were competing happily, but as the game came to the end, the last group was so worried. The father inspired his kid to stick on and finish the match, while the kid was crying because he knew he must be the last. After the match, the father told his kid that winning was not the most important thing for the match, the first thing was to enjoy the game and finish it, the result was not that important. I agree with the father, the child must be endowed with the consciousness that to enjoy the game is more important than to win. Every match can only have one win, but we can enjoy every match." },
      { picture: "https://tse1-mm.cn.bing.net/th/id/R-C.8f14851af44a4d9785bde1b4261230b8?rik=hiSiZlw8aI0phQ&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f0185925882c304a8012060c8b495f7.jpg%401280w_1l_2o_100sh.jpg&ehk=cFhm8jbiAjsAXGVC5TQQNVTcR2r9U%2fnYGh%2f8hCu0A1s%3d&risl=&pid=ImgRaw&r=0", name: "Jerry", timestamp: "2022-03-05", content: "Once I saw the TV show, it was about the fathers and their kids having the match, they were separated into five groups and competed for the match. At first, they were competing happily, but as the game came to the end, the last group was so worried. The father inspired his kid to stick on and finish the match, while the kid was crying because he knew he must be the last. After the match, the father told his kid that winning was not the most important thing for the match, the first thing was to enjoy the game and finish it, the result was not that important. I agree with the father, the child must be endowed with the consciousness that to enjoy the game is more important than to win. Every match can only have one win, but we can enjoy every match." },
      { picture: "https://tse1-mm.cn.bing.net/th/id/R-C.8f14851af44a4d9785bde1b4261230b8?rik=hiSiZlw8aI0phQ&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f0185925882c304a8012060c8b495f7.jpg%401280w_1l_2o_100sh.jpg&ehk=cFhm8jbiAjsAXGVC5TQQNVTcR2r9U%2fnYGh%2f8hCu0A1s%3d&risl=&pid=ImgRaw&r=0", name: "Jerry", timestamp: "2022-03-05", content: "Once I saw the TV show, it was about the fathers and their kids having the match, they were separated into five groups and competed for the match. At first, they were competing happily, but as the game came to the end, the last group was so worried. The father inspired his kid to stick on and finish the match, while the kid was crying because he knew he must be the last. After the match, the father told his kid that winning was not the most important thing for the match, the first thing was to enjoy the game and finish it, the result was not that important. I agree with the father, the child must be endowed with the consciousness that to enjoy the game is more important than to win. Every match can only have one win, but we can enjoy every match." },
      ]

    },
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

  render() {
    if (this.state.displayComments) {
      return (
        <div className='col-12 row'>
          <div className='col-9 row'>
            <ContextDispalyer commentsOnDisplay={this.state.commentsOnDisplay} displayComments={this.state.displayComments} context={this.state.markdown} changeDisplayState={(newState) => this.setState(newState)} />
          </div>
          <div className='col-3 row'>
            <CommentsDisplayer commentsOnDisplay={this.state.commentsOnDisplay} comments={this.state.comments} displayComments={this.state.displayComments} changeDisplayState={(newState) => this.setState(newState)} />
          </div>
        </div>
      )
    } else {
      return (
        <div className='col-12 row'>
          <div className='offset-1 col-10 row'>
            <ContextDispalyer displayComments={this.state.displayComments} context={this.state.markdown} changeDisplayState={(newState) => this.setState(newState)} />
          </div>
          <div className='col-1 row'>
            <CommentsDisplayer commentsOnDisplay={this.state.commentsOnDisplay} comments={this.state.comments} displayComments={this.state.displayComments} changeDisplayState={(newState) => this.setState(newState)} />
          </div>
        </div>
      )
    }
  }
}