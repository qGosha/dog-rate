import React from "react";
import {Card, Rating, Image} from "semantic-ui-react";

const styles = {
  image: {
    height: "250px",
    width: "200px",
    objectFit: "scale-down",
    alignSelf: "center"
  },
  content: {
    display: "flex",
    justifyContent: "center"
  }
};
const Dashboard = ({ratedDogs}) => {
  const rates = Object.values(ratedDogs).map(item => {
    return (
      <Card key={item.id}>
        <Image src={item.url} style={styles.image} />
        <Card.Content style={styles.content}>
          <strong>Breed:</strong> {item.breed}
        </Card.Content>
        <Card.Content style={styles.content}>
          <Rating
            icon="heart"
            size="large"
            rating={item.rating}
            maxRating={6}
            disabled
          />
        </Card.Content>
      </Card>
    );
  });
  return <Card.Group style={styles.content}>{rates}</Card.Group>;
};

export default Dashboard;
