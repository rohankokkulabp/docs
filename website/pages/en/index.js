/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

const siteConfig = require(`${process.cwd()}/siteConfig.js`)

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`
}

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? `${language}/` : '') + page
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    )
  }
}

Button.defaultProps = {
  target: '_self'
}

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
)

const ProjectTitle = () => (
  <h2 className="projectTitle">
    <small>{siteConfig.tagline}</small>
  </h2>
)

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
)

class HomeSplash extends React.Component {
  render() {
    return (
      <SplashContainer>
        <div className="inner">
          <img className="mainLogo" src={imgUrl('botpress.svg')} alt="Project Logo" />
          <ProjectTitle />
          <PromoSection>
            <Button href="https://botpress.com">Try It Out</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

const SingleBlock = props => (
  <Container padding={[]} id={props.id} background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
)

const SpecsCard = () => (
  <SingleBlock layout="threeColumn">
    {[
      {
        content: 'List of all features and specifications',
        title: '<a href="/docs/features">🔢 Features</a>'
      }
    ]}
  </SingleBlock>
)

const Block = props => (
  <Container padding={['bottom', 'top']} id={props.id} background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
)

const GuideCards = () => (
  <Block layout="fourColumn">
    {[
      {
        content: 'New to Botpress? This documentation will help you learn the ropes quickly.',
        title: '<a href="/docs/introduction">🚀 Getting Started</a>'
      },
      {
        content: 'Guides and examples solving typical issues you may run into.',
        title: '<a href="/docs/tutorials">💡 Tutorials</a>'
      },
      {
        content: 'Find all the code references you need in this always up-to-date Botpress SDK Reference.',
        title: '<a href="https://botpress.com/reference/">📘 SDK Reference</a>'
      },
      {
        content: 'Advanced examples for developers on how you can use Botpress.',
        title: '<a href="https://github.com/botpress/botpress/tree/master/examples">💻 Code Examples</a>'
      }
    ]}
  </Block>
)

class Index extends React.Component {
  render() {
    const language = this.props.language || ''

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer" style={{padding: 0}}>
          <SpecsCard />
          <GuideCards />
        </div>
      </div>
    )
  }
}

module.exports = Index
