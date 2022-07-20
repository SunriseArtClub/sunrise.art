import { useState } from 'react';
import classes from './Accordian.module.css';
import { useQuery } from "graphql-hooks";

const Accordian = () => {
  const [openSection, setOpenSection] = useState('');

  const handleOpenSection = (section: string) => {
    if (section === openSection) {
      setOpenSection('');
    } else {
      setOpenSection(section);
    }
  };

  const FAQ_QUERY = `{
      allFaqs(orderBy: [_createdAt_ASC], filter: { _status: { eq: published } }) {
        id
        question
        answer(markdown: true)
        _status
      }
    }`;

  // eslint-disable-next-line
  const { loading, error, data } = useQuery(FAQ_QUERY, {
    variables: {
      limit: 10
    }
  });

  return (
    <div className={classes.container}>
        {data && <h2 className={classes.headline}>FAQ</h2>}
        {data && data.allFaqs.map((faq: { id: string; question: string; answer: string; }) =>
            <div
            className={`${classes.faq} ${openSection === faq.id ? classes.openFaq : ''}`}
            onClick={() => handleOpenSection(faq.id)}
            key={faq.id}>
                <h2>{faq.question}</h2>
                <div className={classes.content} dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
        )}
    </div>
  );
};

export default Accordian;