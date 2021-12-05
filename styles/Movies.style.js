import css from 'styled-jsx/css';

export default css`
.page {
  margin: 0 auto;
  max-width: 1000px;
  padding: 2rem;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
.movie-list {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.flip-container {
  perspective: 1000px;
}
.fliper {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: relative;
  transform-style: preserve-3d;
  transition: 0.6s;
}
.flip-container:hover .fliper {
  transform: rotateY(180deg);
}
.front, .back {
  width: 100%;
  border-radius: inherit;
  overflow: hidden;
  backface-visibility: hidden;
}
.front {
  min-height: 195px;
  position: relative;
  z-index: 2;
}
.back {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(180deg);
  background-color: #fff;
}

.movie-item__info {
  font-size: 12px;
  line-height: 1.5;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 10px;
  padding: 10px;
}
.movie-item__rating {
  min-height: 18px;
}
.movie-item__rating::-webkit-meter-inner-element {
  display: none;
}
.movie-item__rating::before {
  content: attr(data-content);
  line-height: inherit;
}
`;
