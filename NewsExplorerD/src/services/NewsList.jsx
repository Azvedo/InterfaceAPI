import { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { CardNews } from '../components/CardNews';
import './NewsList.css';

const NewsList = () => {

  const [news, setNews] = useState([]);

  useEffect(() => {

    const client = createClient({
      space : "gft2mzhd30x8", 
      accessToken : "9RF2BRJwt6gio9R9xF7J0KqdPeJGMeHkm17VqnyXo24" 
    });

    const fetchNews = async () => {
      try {
        await client.getEntries().then((entries) => {
          setNews(entries.items);
        })

      } catch (error) {
        console.error("Erro ao buscar notícias: ", error);
      }
    };

    fetchNews();
  }, [news]);

  return (
    <div className='main'>
      <h1>Notícias</h1>
      <div className='news'>
        {news.map((item) => (
            <CardNews key={item.sys.id} itemKey={item.sys.id} title={item.fields.title} img_url={item.fields.image.fields.file.url} description={item.fields.summary} author={item.fields.author} date={item.fields.createdDate}/>
          ))}
      </div>
    </div>
  );
};

export default NewsList;