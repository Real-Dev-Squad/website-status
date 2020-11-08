import Card from '../card'
const Section = ({ heading, content }) => {

  const cards = content.map((pullRequest, i) => {
    return <Card pullRequest={pullRequest} key={i} />
  })

  return (
    <>
      <style jsx>{`
        .heading {
          font-size: 3.5rem;
          font-weight: bold;
          text-align: center;
          color: #041484;
          margin-bottom: 2rem;
        }

        .section {
          height: 100%;
        }

        .cardContainer {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          flex-grow: 1;
        }
      `}</style>
      <div className="section">
        <div className="heading">{heading}</div>
        <div className="cardContainer">
          {cards}
        </div>
      </div>
    </>
  )
}

export default Section;