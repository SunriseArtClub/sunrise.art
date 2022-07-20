import classes from './WhatIsSunrise.module.css';
import { Container } from 'react-bootstrap';
import Accordian from '../Accordian';
import { useQuery } from 'graphql-hooks';

const WhatIsSunrise = () => {
  const HOME_QUERY = `{
    home {
      content {
        headline,
        text(markdown:true),
        ctaText,
        ctaLink
      }
    }
  }`;

  // eslint-disable-next-line
  const { loading, error, data } = useQuery(HOME_QUERY, {
    variables: {
      limit: 10
    }
  });

  return (
    <>
      <Container id="content" className={classes.container}>
        {data && data.home.content.map((section: { headline: string; text: string; ctaText: string; ctaLink: string; }) =>
          <div className={classes.section}>
            <h2 className={classes.headline}>{section.headline}</h2>
            <div className={classes.contentWrapper}>
              <div className={classes.content} dangerouslySetInnerHTML={{ __html: section.text }} />
            </div>
            {section.ctaText && section.ctaLink && <a className={classes.cta} href={section.ctaLink}>{section.ctaText}</a>}
          </div>
        )}
      </Container>

      <Container id="faq" className={classes.container}>
        <Accordian />
      </Container>
    </>
  );
};

export default WhatIsSunrise;