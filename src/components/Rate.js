import React, {useState, useEffect} from "react";
import {
  Button,
  Card,
  Dropdown,
  Image,
  Rating,
  Placeholder
} from "semantic-ui-react";
import axios from "axios";

const styles = {
  image: {
    height: "350px",
    width: "300px",
    objectFit: "scale-down",
    alignSelf: "center"
  },
  content: {
    display: "flex",
    justifyContent: "center"
  }
};

const Rate = ({breedList, changeRatedDogs, ratedDogs}) => {
  const [currentImage, changeCurrentImage] = useState(null);
  const [loadingImage, changeLoadingImage] = useState(false);
  const [currentBreed, changeCurrentBreed] = useState("Husky");
  const [myRate, changeMyRate] = useState(0);

  const addDogRate = (e, {rating}) => {
    if (!currentImage || !currentBreed) return;
    changeMyRate(rating);
    const id = currentImage.slice(
      currentImage.lastIndexOf("/") + 1,
      currentImage.length - 4
    );
    const dogs = localStorage.getItem("ratedDogs");
    const parsed = JSON.parse(dogs);
    const dog = {url: currentImage, breed: currentBreed, rating, id};
    let newDogsObj = parsed ? parsed : {};
    newDogsObj[id] = dog;
    changeRatedDogs(newDogsObj);
    localStorage.setItem("ratedDogs", JSON.stringify(newDogsObj));
    fetchDog();
  };
  const fetchDog = async () => {
    changeLoadingImage(true);
    changeMyRate(0);
    const hasSubbreed = currentBreed.match(/^(\w+)\s(\w+)$/);
    let breedQuery;
    if (hasSubbreed) {
      breedQuery = `${hasSubbreed[2]}/${hasSubbreed[1]}`;
    } else {
      breedQuery = currentBreed;
    }
    try {
      const res = await axios.get(
        `https://dog.ceo/api/breed/${breedQuery}/images/random`
      );
      if (res.data.status !== "success") {
        throw new Error(res.data.error || "Error");
      }
      changeCurrentImage(res.data.message);
      changeLoadingImage(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchDog();
  }, [currentBreed]);

  const placeholder = (
    <Placeholder style={styles.image}>
      <Placeholder.Image />
    </Placeholder>
  );
  return (
    <>
      <div style={styles.content}>
        <Dropdown
          placeholder="Breed"
          search
          selection
          options={breedList}
          onChange={(e, {value}) => changeCurrentBreed(value)}
          closeOnChange
          value={currentBreed}
        />
      </div>
      <Card fluid>
        {currentImage ? (
          <Image src={currentImage} style={styles.image} />
        ) : (
          placeholder
        )}
        <Card.Content style={styles.content}>
          <Rating
            icon="heart"
            size="large"
            maxRating={6}
            rating={myRate}
            onRate={addDogRate}
          />
        </Card.Content>
        <Card.Content style={styles.content}>
          <Button
            content="Next"
            positive
            onClick={() => fetchDog()}
            disabled={loadingImage}
            loading={loadingImage}
          />
        </Card.Content>
      </Card>
    </>
  );
};

export default Rate;
