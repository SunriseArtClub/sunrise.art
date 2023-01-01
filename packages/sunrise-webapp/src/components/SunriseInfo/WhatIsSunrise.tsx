import classes from './WhatIsSunrise.module.css';
import { Container } from 'react-bootstrap';
import Accordian from '../Accordian';
import { gql, useQuery } from '@apollo/client';
import SunriseNFTs from '../SunriseNFTs';

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
        galleryHeadline
        galleryDescription(markdown: true)
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
      <Container id="nfts" className={classes.container}>
        {data?.home?.galleryHeadline !== '' && (
          <h2 className={classes.headline}>{data?.home?.galleryHeadline}</h2>
        )}
        {data?.home?.galleryDescription !== '' && (
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: data?.home?.galleryDescription }}
          />
        )}
        <SunriseNFTs />
      </Container>
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
        {data && (
          <Container className={classes.projectsContainer}>
            {data?.home?.projects.map((project: { title: string; link: string }, index: number) => (
              <a href={project?.link} className={classes.projectItem} key={index}>
                {project?.title}
              </a>
            ))}
          </Container>
        )}
      </Container>

      <Container id="faq" className={classes.container}>
        <Accordian />
      </Container>
    </>
  );
};

export default WhatIsSunrise;
