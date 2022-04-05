import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import Navbar from './Navbar';
import { FaAngleDoubleRight } from 'react-icons/fa';

const url = 'https://course-api.com/react-tabs-project';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState([]);
  const [value, setValue] = useState(0);

  const fetchTab = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tab = await response.json();
      setTab(tab);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTab();
  },[])

  if (loading) {
    return (
      <main>
        <section className="section">
          <Loading/>
        </section>
      </main>
    )
  }

  const { company, title, dates, duties } = tab[value];

  return (
    <>
      <Navbar />
      <main>
        <section className="section-center">
          <div className="title">
            <h2>experience</h2>
            <div className="underline"></div>
          </div>
          <article className="tab-center">
            <div className="btn-container">
              {tab.map((items, index) => {
                return (
                  <button
                    type='button'
                    key={index}
                    onClick={() => setValue(index)}
                    className={`tab-btn ${value === index && 'active-btn'}`}
                  >
                    {items.company}
                  </button>
                )
              })}
            </div>
            <div className="tab-info">
              <h3>{title}</h3>
              <h4>{company}</h4>
              <p className="tab-date">{dates}</p>
              {duties.map((duty, index) => {
                return (
                  <div key={index} className="tab-desc">
                    <FaAngleDoubleRight className="tab-icon"></FaAngleDoubleRight>
                    <p>{duty}</p>
                  </div>
                )
              })}
            </div>
          </article>
          <button className="btn">
            more info
          </button>
        </section>
      </main>
    </>
  )
}

export default App
