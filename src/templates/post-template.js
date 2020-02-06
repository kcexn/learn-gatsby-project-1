import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  return (
    <React.Fragment>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></p>
    </React.Fragment>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        slug
        title
      }
    }
  }
`
