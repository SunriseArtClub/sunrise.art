import classes from './WhatIsSunrise.module.css';
import { Container } from 'react-bootstrap';
import Accordian from '../Accordian';
import { gql, useQuery } from '@apollo/client';

const WhatIsSunrise = () => {
  const HOME_QUERY = gql`
    {
      home {
        content {
          headline
          text(markdown: true)
          ctaText
          ctaLink
        }
        projects {
          title
          link
        }
      }
    }
  `;

  // eslint-disable-next-line
  const { loading, error, data } = useQuery(HOME_QUERY, {
    variables: {
      limit: 10,
    },
  });

  return (
    <>
      <Container id="content" className={classes.container}>
        {data &&
          data.home.content.map(
            (
              section: { headline: string; text: string; ctaText: string; ctaLink: string },
              index: number,
            ) => (
              <div className={classes.section} key={index}>
                <h2 className={classes.headline}>{section.headline}</h2>
                <div className={classes.contentWrapper}>
                  <div
                    className={classes.content}
                    dangerouslySetInnerHTML={{ __html: section.text }}
                  />
                </div>
                {section.ctaText && section.ctaLink && (
                  <a className={classes.cta} href={section.ctaLink}>
                    {section.ctaText}
                  </a>
                )}
              </div>
            ),
          )}
      </Container>

      <Container id="projects" className={classes.container}>
        {data && <h2 className={classes.headline}>Sunrise Projects</h2>}
        {data &&
          data?.home?.projects.map((project: { title: string; link: string }, index: number) => (
            <div className={classes.project} key={index}>
              <a href={project?.link}>{project?.title}</a>
            </div>
          ))}
      </Container>

      <Container id="faq" className={classes.container}>
        <Accordian />
      </Container>
    </>
  );
};

export default WhatIsSunrise;
