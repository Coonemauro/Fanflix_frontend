import React from 'react';
import Helmet from 'react-helmet';

type SeoProps = {
  title: string
  children: React.ReactNode;
}

const Seo: React.FC<SeoProps> = ({ title, children }) => {
  return (
    <React.Fragment>
        <Helmet
            htmlAttributes={{
                lang: 'en',
            }}
            title={`${title} | BV TV`}
            meta={[
                {
                    httpEquiv: 'Content-Type',
                    content: 'text/html; charset=utf-8',
                },
                {
                    name: 'title',
                    content: 'bvtv',
                },
                {
                    name: 'description',
                    content:
                        "Personalized videos from your favorite celebrities",
                },
                {
                    name: 'keywords',
                    content:
                        'video, talent',
                },
                {
                    name: 'robots',
                    content: 'index, follow',
                },
                {
                    name: 'language',
                    content: 'English',
                },
                {
                    name: 'author',
                    content: 'bvtv',
                },
            ]}
        />
        {children}
    </React.Fragment>
  )
}

export default Seo