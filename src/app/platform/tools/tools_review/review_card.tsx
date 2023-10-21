export interface ReviewCardProps {
    id: number,
    title: string,
    description: string,
    brand: string,
    category: string,
    thumbnail : string
}
   
export function ReviewCard({card_prop} : {card_prop: ReviewCardProps}) {

    return (
      
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                <img src={card_prop.thumbnail} alt="Placeholder image"></img>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                    <img src={card_prop.thumbnail} alt="Placeholder image"></img>
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-4">{card_prop.title}</p>
                    <p className="subtitle is-6">@{card_prop.category}</p>
                </div>
                </div>

                <div className="content">{card_prop.description}
                <br></br>
                </div>
            </div>
        </div>

    )
  }
  